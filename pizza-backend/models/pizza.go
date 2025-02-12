package models

type Pizza struct {
    ID          uint    `json:"id" gorm:"primaryKey"`
    Name        string  `json:"name"`
    Description string  `json:"description"`
    Price       float64 `json:"price"`
    Image       string  `json:"image"`
    Category    string  `json:"category"`
}