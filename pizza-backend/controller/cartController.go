package controller

import (
	// "fmt"
	"strconv"

	"github.com/AKAZJAYA/pizza-backend/database"
	"github.com/AKAZJAYA/pizza-backend/models"
	"github.com/AKAZJAYA/pizza-backend/util"
	"github.com/gofiber/fiber/v2"
)

// Add item to cart
func AddToCart(c *fiber.Ctx) error {
	var data struct {
		PizzaID  uint `json:"pizza_id"` // Different field name
		Quantity int  `json:"quantity"`
	}

	// Log the raw request body
	// fmt.Printf("Raw request body: %s\n", string(c.Body()))

	// Parse request body
	if err := c.BodyParser(&data); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message":       "Error parsing request body",
			"error":         err.Error(),
			"received_data": string(c.Body()),
		})
	}

	// Log parsed data
	// fmt.Printf("Parsed data: PizzaID=%d, Quantity=%d\n", data.PizzaID, data.Quantity)

	// Validate pizza_id
	if data.PizzaID == 0 {
		return c.Status(400).JSON(fiber.Map{
			"message":       "Invalid pizza_id",
			"received_data": data,
		})
	}

	// Get user ID from JWT token
	cookie := c.Cookies("jwt")
	if cookie == "" {
		return c.Status(401).JSON(fiber.Map{
			"message": "Please login first",
		})
	}

	id, err := util.Parsejwt(cookie)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"message": "Invalid token",
		})
	}

	userId, _ := strconv.Atoi(id)

	// Verify pizza exists and get its price
	var pizza models.Pizza
	if err := database.DB.First(&pizza, data.PizzaID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "Pizza not found",
			"error":   err.Error(),
		})
	}

	// Create cart item with price
	cartItem := models.CartItem{
		UserID:   uint(userId),
		PizzaID:  data.PizzaID,
		Quantity: data.Quantity,
		Price:    pizza.Price,
		Total:    pizza.Price * float64(data.Quantity),
		Image:    pizza.Image, // Store the image
	}

	if err := database.DB.Create(&cartItem).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error adding item to cart",
			"error":   err.Error(),
		})
	}

	// Load pizza details
	database.DB.Preload("Pizza").First(&cartItem, cartItem.ID)

	return c.Status(201).JSON(fiber.Map{
		"message": "Item added to cart successfully",
		"item":    cartItem,
	})
}

// Get user's cart
func GetCart(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	userId, _ := strconv.Atoi(id)

	var cartItems []models.CartItem
	database.DB.Preload("Pizza").Where("user_id = ?", userId).Find(&cartItems)

	return c.JSON(cartItems)
}

// Remove item from cart
func RemoveFromCart(c *fiber.Ctx) error {
	itemId := c.Params("id")

	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	userId, _ := strconv.Atoi(id)

	var cartItem models.CartItem
	result := database.DB.Where("id = ? AND user_id = ?", itemId, userId).Delete(&cartItem)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error removing item from cart",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Item removed from cart",
	})
}

// Clear cart (after checkout)
func ClearCart(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	userId, _ := strconv.Atoi(id)

	result := database.DB.Where("user_id = ?", userId).Delete(&models.CartItem{})

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Error clearing cart",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Cart cleared successfully",
	})
}

// Update cart item quantity
func UpdateCartItem(c *fiber.Ctx) error {
	itemId := c.Params("id")
	var updateData struct {
		Quantity int `json:"quantity"`
	}

	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Error parsing request body",
		})
	}

	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	userId, _ := strconv.Atoi(id)

	var cartItem models.CartItem
	result := database.DB.Where("id = ? AND user_id = ?", itemId, userId).First(&cartItem)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "Cart item not found",
		})
	}

	cartItem.Quantity = updateData.Quantity
	cartItem.Total = cartItem.Price * float64(updateData.Quantity)

	database.DB.Save(&cartItem)

	return c.JSON(cartItem)
}

// Add a new function to get cart total
func GetCartTotal(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	id, _ := util.Parsejwt(cookie)
	userId, _ := strconv.Atoi(id)

	var cartItems []models.CartItem
	database.DB.Where("user_id = ?", userId).Find(&cartItems)

	var total float64
	for _, item := range cartItems {
		total += item.Total
	}

	return c.JSON(fiber.Map{
		"total": total,
	})
}
