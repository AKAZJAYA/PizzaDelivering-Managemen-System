package models

import "time"

type Order struct {
    ID          uint      `json:"id" gorm:"primaryKey"`
    UserID      uint      `json:"user_id"`
    User        User      `json:"user" gorm:"foreignKey:UserID"`
    OrderItems  []OrderItem `json:"order_items"`
    TotalAmount float64   `json:"total_amount"`
    Status      string    `json:"status"`  // "pending", "delivered", "cancelled"
    CreatedAt   time.Time `json:"created_at"`

    // Delivery Details
    Name        string    `json:"name"`
    Email       string    `json:"email"`
    Phone       string    `json:"phone"`
    Street      string    `json:"street"`
    City        string    `json:"city"`
    PostalCode  string    `json:"postal_code"`
    Instructions string   `json:"instructions"`
    
    // Payment Details
    PaymentMethod string   `json:"payment_method"` // Add this field
}

type OrderItem struct {
    ID          uint    `json:"id" gorm:"primaryKey"`
    OrderID     uint    `json:"order_id"`
    PizzaID     uint    `json:"pizza_id"`
    Pizza       Pizza   `json:"pizza" gorm:"foreignKey:PizzaID"`
    Quantity    int     `json:"quantity"`
    Price       float64 `json:"price"`
    Total       float64 `json:"total"`
}