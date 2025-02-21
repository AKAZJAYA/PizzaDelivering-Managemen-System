package controller

import (
	// "fmt"
	"strconv"

	"github.com/AKAZJAYA/pizza-backend/database"
	"github.com/AKAZJAYA/pizza-backend/models"
	"github.com/AKAZJAYA/pizza-backend/util"
	"github.com/gofiber/fiber/v2"
)

func CreateOrder(c *fiber.Ctx) error {

	// fmt.Printf("Raw request body: %s\n", string(c.Body()))

    // Parse delivery details and create order
    var data struct {
        Name          string `json:"name"`
        Email         string `json:"email"`
        Phone         string `json:"phone"`
        Street        string `json:"street"`
        City          string `json:"city"`
        PostalCode    string `json:"postal_code"`
        Instructions  string `json:"instructions"`
        PaymentMethod string `json:"payment_method"` // Add this field
    }

    if err := c.BodyParser(&data); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error parsing request body",
        })
    }
	// fmt.Printf("Parsed data: Name=%s, Email=%s, Phone=%s, Street=%s, City=%s, PostalCode=%s, Instructions=%s, PaymentMethod=%s\n", data.Name, data.Email, data.Phone, data.Street, data.City, data.PostalCode, data.Instructions, data.PaymentMethod)


    // Get user ID from JWT
    cookie := c.Cookies("jwt")
    id, _ := util.Parsejwt(cookie)
    userId, _ := strconv.Atoi(id)

    // Get user's cart items
    var cartItems []models.CartItem
    database.DB.Preload("Pizza").Where("user_id = ?", userId).Find(&cartItems)

    if len(cartItems) == 0 {
        return c.Status(400).JSON(fiber.Map{
            "message": "Cart is empty",
        })
    }

    // Calculate total amount
    var totalAmount float64
    for _, item := range cartItems {
        totalAmount += item.Total
    }

    // Create order
    order := models.Order{
        UserID:        uint(userId),
        TotalAmount:   totalAmount,
        Status:        "pending",
        Name:          data.Name,
        Email:         data.Email,
        Phone:         data.Phone,
        Street:        data.Street,
        City:          data.City,
        PostalCode:    data.PostalCode,
        Instructions:  data.Instructions,
        PaymentMethod: data.PaymentMethod, // Add this field
    }

    // Save order
    tx := database.DB.Begin()
    if err := tx.Create(&order).Error; err != nil {
        tx.Rollback()
        return c.Status(500).JSON(fiber.Map{
            "message": "Error creating order",
        })
    }

    // Create order items from cart items
    for _, cartItem := range cartItems {
        orderItem := models.OrderItem{
            OrderID:  order.ID,
            PizzaID:  cartItem.PizzaID,
            Quantity: cartItem.Quantity,
            Price:    cartItem.Price,
            Total:    cartItem.Total,
        }
        
        if err := tx.Create(&orderItem).Error; err != nil {
            tx.Rollback()
            return c.Status(500).JSON(fiber.Map{
                "message": "Error creating order items",
            })
        }
    }

    // Clear cart after successful order
    if err := tx.Where("user_id = ?", userId).Delete(&models.CartItem{}).Error; err != nil {
        tx.Rollback()
        return c.Status(500).JSON(fiber.Map{
            "message": "Error clearing cart",
        })
    }

    tx.Commit()

    return c.Status(201).JSON(fiber.Map{
        "message": "Order created successfully",
        "order":   order,
    })
}

func GetUserOrders(c *fiber.Ctx) error {
    cookie := c.Cookies("jwt")
    id, _ := util.Parsejwt(cookie)
    userId, _ := strconv.Atoi(id)

    var orders []models.Order
    database.DB.Preload("OrderItems.Pizza").Where("user_id = ?", userId).Find(&orders)

    return c.JSON(orders)
}

func GetOrderDetails(c *fiber.Ctx) error {
    orderId := c.Params("id")
    
    cookie := c.Cookies("jwt")
    id, _ := util.Parsejwt(cookie)
    userId, _ := strconv.Atoi(id)

    var order models.Order
    result := database.DB.Preload("OrderItems.Pizza").Where("id = ? AND user_id = ?", orderId, userId).First(&order)

    if result.Error != nil {
        return c.Status(404).JSON(fiber.Map{
            "message": "Order not found",
        })
    }

    return c.JSON(order)
}