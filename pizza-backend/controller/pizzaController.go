package controller

import (
    "fmt"
    "path/filepath"
    "github.com/AKAZJAYA/pizza-backend/database"
    "github.com/AKAZJAYA/pizza-backend/models"
    "github.com/gofiber/fiber/v2"
    "github.com/google/uuid"
    "strconv"
)

// Create a new pizza
func CreatePizza(c *fiber.Ctx) error {
    // Parse multipart form
    form, err := c.MultipartForm()
    if err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error parsing form",
            "error":   err.Error(),
        })
    }

    // Get pizza details from form
    name := form.Value["name"][0]
    description := form.Value["description"][0]
    category := form.Value["category"][0]
    price := form.Value["price"][0]

    // Handle file upload
    file, err := c.FormFile("image")
    if (err != nil) {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error getting image file",
            "error":   err.Error(),
        })
    }

    // Generate unique filename
    ext := filepath.Ext(file.Filename)
    filename := uuid.New().String() + ext

    // Save file to uploads directory
    err = c.SaveFile(file, fmt.Sprintf("./uploads/%s", filename))
    if err != nil {
        return c.Status(500).JSON(fiber.Map{
            "message": "Error saving image",
            "error":   err.Error(),
        })
    }

    // Convert price string to float64
    priceFloat, err := strconv.ParseFloat(price, 64)
    if err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Invalid price format",
            "error":   err.Error(),
        })
    }

    // Create pizza record
    pizza := models.Pizza{
        Name:        name,
        Description: description,
        Price:       priceFloat,
        Image:       filename, // Store just the filename
        Category:    category,
    }

    result := database.DB.Create(&pizza)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{
            "message": "Error creating pizza",
            "error":   result.Error.Error(),
        })
    }

    return c.Status(201).JSON(fiber.Map{
        "message": "Pizza created successfully",
        "pizza":   pizza,
    })
}

// Get all pizzas
func GetAllPizzas(c *fiber.Ctx) error {
    var pizzas []models.Pizza
    database.DB.Find(&pizzas)

    // Create response with image URLs
    var response []fiber.Map
    for _, pizza := range pizzas {
        response = append(response, fiber.Map{
            "id":          pizza.ID,
            "name":        pizza.Name,
            "description": pizza.Description,
            "price":      pizza.Price,
            "category":   pizza.Category,
            "image_url":  "http://localhost:3000/uploads/" + pizza.Image,
        })
    }

    return c.JSON(response)
}

// Get pizza by ID
func GetPizzaByID(c *fiber.Ctx) error {
    id := c.Params("id")
    var pizza models.Pizza

    // Use First instead of Find to get a single record
    if err := database.DB.First(&pizza, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{
            "message": "Pizza not found",
            "error":   err.Error(),
        })
    }

    // Return the pizza data directly for easier frontend handling
    return c.Status(200).JSON(pizza)
}

// Update pizza
func UpdatePizza(c *fiber.Ctx) error {
    id := c.Params("id")
    var pizza models.Pizza

    // Find existing pizza
    if err := database.DB.First(&pizza, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{
            "message": "Pizza not found",
        })
    }

    // Parse updated data
    if err := c.BodyParser(&pizza); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error parsing request body",
        })
    }

    // Save changes
    database.DB.Save(&pizza)

    return c.JSON(pizza)
}

// Delete pizza
func DeletePizza(c *fiber.Ctx) error {
    id := c.Params("id")
    var pizza models.Pizza

    result := database.DB.Delete(&pizza, id)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{
            "message": "Error deleting pizza",
        })
    }

    return c.JSON(fiber.Map{
        "message": "Pizza deleted successfully",
    })
}