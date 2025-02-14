package models

type CartItem struct {
    ID       uint    `json:"id" gorm:"primaryKey"`
    UserID   uint    `json:"user_id"`
    PizzaID  uint    `json:"pizza_id"`
    Quantity int     `json:"quantity" gorm:"default:1"`
    Pizza    Pizza   `json:"pizza" gorm:"foreignKey:PizzaID;references:ID"`
}