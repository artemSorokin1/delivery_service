package jwt

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

var jwtSecret = []byte("efjodliwjr0o2ijfnoewlkf0p21ASD3")

func GetUserIdFromJWTToken(c echo.Context) (int64, error) {
	cookie, err := c.Cookie("auth_token")
	if err != nil {
		return 0, err
	}

	token, err := jwt.Parse(cookie.Value, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, err
	}

	userId, ok := claims["user_id"].(float64)
	if !ok {
		return 0, err
	}

	return int64(userId), nil

}
