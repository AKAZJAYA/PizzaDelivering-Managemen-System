package models

import "golang.org/x/crypto/bcrypt"

type User struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password []byte `json:"-"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
}

func (user *User) SetPassword(password string) {
	
	hashedpassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil{
		return
	}

	user.Password = hashedpassword
}

func (user *User) ComparePassword(password string) error {

	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
