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
        AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS",
        ExposeHeaders:    "Set-Cookie",
    }))

    // Public routes
    app.Post("/api/register", controller.Register)
    app.Post("/api/login", controller.Login)
    app.Post("/api/logout", controller.Logout)
    app.Get("/api/pizzas", controller.GetAllPizzas)
    app.Get("/api/pizzas/:id", controller.GetPizzaByID)

    // Protected routes
    api := app.Group("/api")
    // api.Use(controller.AuthMiddleware)

    // Protected cart routes - make sure these are under the protected group
    api.Post("/cart", controller.AddToCart)
    api.Get("/cart", controller.GetCart)
    api.Delete("/cart/:id", controller.RemoveFromCart)
    api.Delete("/cart", controller.ClearCart)
    api.Put("/cart/:id", controller.UpdateCartItem)
    api.Get("/cart/total", controller.GetCartTotal)

    // Protected pizza management routes
    api.Post("/pizzas", controller.CreatePizza)
    api.Put("/pizzas/:id", controller.UpdatePizza)
    api.Delete("/pizzas/:id", controller.DeletePizza)

    // User profile route
    api.Get("/user/profile", controller.GetUserProfile)
    app.Static("/uploads", "./uploads")

    // Order routes
    api.Post("/orders", controller.CreateOrder)
    api.Get("/orders", controller.GetUserOrders)
    api.Get("/orders/:id", controller.GetOrderDetails)
}