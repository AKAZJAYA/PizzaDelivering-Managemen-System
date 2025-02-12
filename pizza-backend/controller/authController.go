package controller

import (
	"fmt"
	// "log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/AKAZJAYA/pizza-backend/database"
	"github.com/AKAZJAYA/pizza-backend/models"
	"github.com/AKAZJAYA/pizza-backend/util"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)


func validateEmail(email string) bool {
	Re := regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}`)
	return Re.MatchString(email)
}


func Register(c *fiber.Ctx) error {
    var data map[string]string // Change to string instead of interface{}
    
    if err := c.BodyParser(&data); err != nil {
        return c.Status(400).JSON(fiber.Map{
            "message": "Error parsing request body",
        })
    }

    // Password validation
    if len(data["password"]) < 6 {
        return c.Status(400).JSON(fiber.Map{
            "message": "Password must be at least 6 characters",
        })
    }

    if !validateEmail(strings.TrimSpace(data["email"])) {
        return c.Status(400).JSON(fiber.Map{
            "message": "Invalid email",
        })
    }

    // Check if email exists
    var userData models.User
    database.DB.Where("email = ?", strings.TrimSpace(data["email"])).First(&userData)
    if userData.ID != 0 {
        return c.Status(400).JSON(fiber.Map{
            "message": "Email already exists",
        })
    }

    user := models.User{
        Username: data["username"],
        Email:    strings.TrimSpace(data["email"]),
        Phone:    strings.TrimSpace(data["phone"]),
        Address:  data["address"],
    }

    user.SetPassword(data["password"])
    
    result := database.DB.Create(&user)
    if result.Error != nil {
        return c.Status(500).JSON(fiber.Map{
            "message": "Error creating user",
        })
    }

    return c.Status(200).JSON(fiber.Map{
        "user": user,
        "message": "User created successfully",
    })
}


func Login (c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {

		fmt.Println("Error parsing data")
	}

	var user models.User
	database.DB.Where("email=?", data["email"]).First(&user)

	if user.ID == 0 {

		c.Status(404)
		return c.JSON(fiber.Map{
			"message":"User not found",
		})
	}

	if err:= user.ComparePassword(data["password"]);err != nil {

		c.Status(400)
		return c.JSON(fiber.Map{

			"message": "Incorrect password",
		})
	}

	token,err := util.GenerateJwt(strconv.Itoa(int(user.ID)),)

	if err != nil{

		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{

		Name: "jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{

		"message":"Success",
		"user": user,
	})
}

func Logout(c *fiber.Ctx) error {
    // Create an expired cookie to remove the existing one
    cookie := fiber.Cookie{
        Name:     "jwt",
        Value:    "",
        Expires:  time.Now().Add(-time.Hour), // Set expiry in the past
        HTTPOnly: true,
    }

    c.Cookie(&cookie)

    return c.JSON(fiber.Map{
        "message": "Successfully logged out",
    })
}

type Claims struct {

	jwt.StandardClaims
}

func AuthMiddleware(c *fiber.Ctx) error {
    cookie := c.Cookies("jwt")

    if cookie == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "Unauthorized",
        })
    }

    _, err := util.Parsejwt(cookie)
    if err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "message": "Unauthorized",
        })
    }

    return c.Next()
}