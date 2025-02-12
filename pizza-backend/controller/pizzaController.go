package controller

import (
    "github.com/AKAZJAYA/pizza-backend/database"
    "github.com/AKAZJAYA/pizza-backend/models"
    "github.com/gofiber/fiber/v2"
)

// Create a new pizza
func CreatePizza(c *fiber.Ctx) error {
    var pizza models.Pizza

    if err := c.BodyParser(&pizza); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error parsing request body",
        })
    }

    result := database.DB.Create(&pizza)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{
            "message": "Error creating pizza",
        })
    }

    return c.Status(200).JSON(fiber.Map{
        "message": "Pizza created successfully",
        "pizza":   pizza,
    })
}

// Get all pizzas
func GetAllPizzas(c *fiber.Ctx) error {
    var pizzas []models.Pizza

    database.DB.Find(&pizzas)

    return c.JSON(pizzas)
}

// Get pizza by ID
func GetPizzaByID(c *fiber.Ctx) error {
    id := c.Params("id")
    var pizza models.Pizza

    result := database.DB.First(&pizza, id)
    if result.Error != nil {
        return c.Status(404).JSON(fiber.Map{
            "message": "Pizza not found",
        })
    }

    return c.JSON(pizza)
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