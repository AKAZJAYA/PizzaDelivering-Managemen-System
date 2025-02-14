package models

type Pizza struct {
    ID          uint    `json:"id" gorm:"primaryKey"`
    Name        string  `json:"name"`
    Description string  `json:"description"`
    Price       float64 `json:"price"`
    Image       string  `json:"image"` // This will store the image path
    Category    string  `json:"category"`
}

// Add method to get full image URL
func (p *Pizza) GetImageURL() string {
    return "http://localhost:3000/uploads/" + p.Image
}