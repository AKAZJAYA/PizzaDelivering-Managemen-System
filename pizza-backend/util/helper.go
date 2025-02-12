package util

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

const Secretkey = "secret"

func GenerateJwt(issuser string) (string, error) {
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    issuser,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	return claims.SignedString([]byte(Secretkey))
}

func Parsejwt(cookie string) (string, error) {

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token)(interface{}, error){

		return []byte(Secretkey), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	claims:= token.Claims.(*jwt.StandardClaims)

	return claims.Issuer, nil
}