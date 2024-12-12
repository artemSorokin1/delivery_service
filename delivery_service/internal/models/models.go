package models

import "time"

type User struct {
	ID       int
	Username string
	Email    string
	Password string
}

type Product struct {
	ID          int
	Name        string
	Price       int
	Sizes       []int
	ImageURL    string
	Description string
}

type Order struct {
	ProductIds   []int
	OrderId      int
	CreationTime time.Duration
}

type Courier struct {
	CourierID int
	Sex       string
}
