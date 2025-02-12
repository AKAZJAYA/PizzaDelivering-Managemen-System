package routes

import (
    "github.com/AKAZJAYA/pizza-backend/controller"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func Setup(app *fiber.App) {
    app.Use(cors.New(cors.Config{
        AllowOrigins:     "http://localhost:5173",
        AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
        AllowCredentials: true,
        AllowMethods:     "GET, POST, HEAD, PUT, DELETE, PATCH",
    }))

    // Public routes
    app.Post("/api/register", controller.Register)
    app.Post("/api/login", controller.Login)
    app.Post("/api/logout", controller.Logout)

    // Protected routes - add the middleware
    // api := app.Group("/api")
    // api.Use(controller.AuthMiddleware)
    // Add your protected routes here

    // Pizza routes (protected by AuthMiddleware)
    app.Post("/api/pizzas", controller.CreatePizza)
    app.Get("/api/pizzas", controller.GetAllPizzas)
    app.Get("/api/pizzas/:id", controller.GetPizzaByID)
    app.Put("/api/pizzas/:id", controller.UpdatePizza)
    // api.Delete("/pizzas/:id", controller.DeletePizza)
}