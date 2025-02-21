package models

type CartItem struct {
    ID       uint    `json:"id" gorm:"primaryKey"`
    UserID   uint    `json:"user_id"`
    PizzaID  uint    `json:"pizza_id"`
    Quantity int     `json:"quantity" gorm:"default:1"`
    Price    float64 `json:"price"`
    Total    float64 `json:"total"`
    Image    string  `json:"image"`                                // Changed: now stored in DB
    Pizza    Pizza   `json:"pizza" gorm:"foreignKey:PizzaID;references:ID"`
}