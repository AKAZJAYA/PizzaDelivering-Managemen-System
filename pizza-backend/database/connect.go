package database

import (
	"log"
	"os"

	"github.com/AKAZJAYA/pizza-backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
func Connect() {

	err:=godotenv.Load()
	if err!=nil {
		log.Fatal("Error loading .env file")
	}

	dsn:=os.Getenv("DSN")
	database,err:=gorm.Open(mysql.Open(dsn),&gorm.Config{})

	if err != nil {
		println("Failed to connect to database")
	}else{
		log.Println("Connected to database")
	}

	DB=database
	database.AutoMigrate(
		&models.User{},
		&models.Pizza{},
		&models.CartItem{},
		&models.Order{},      // Add this
		&models.OrderItem{},  // Add this
	)
}