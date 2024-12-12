package storage

import (
	"context"
	"dlivery_service/delivery_service/internal/config"
	"dlivery_service/delivery_service/internal/models"
	"fmt"
	"github.com/jmoiron/sqlx"
	"log"
)

type DB struct {
	Db *sqlx.DB
}

func New(config *config.Config) (*DB, error) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", config.DBCfg.Host, config.DBCfg.Username, config.DBCfg.Password, config.DBCfg.DBName, config.DBCfg.Port)
	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatalln(err)
	}
	if _, err := db.Conn(context.Background()); err != nil {
		return nil, fmt.Errorf("unable to connect to db: %w", err)
	}
	return &DB{Db: db}, nil
}

func (d *DB) GetProducts() ([]models.Product, error) {
	var products []models.Product
	err := d.Db.Select(&products, "SELECT * FROM products")
	if err != nil {
		return nil, fmt.Errorf("error getting products: %w", err)
	}

	return products, nil
}

func (d *DB) GetProductById(id int64) (models.Product, error) {
	var product models.Product
	err := d.Db.Get(&product, "SELECT * FROM products WHERE id=$1", id)
	if err != nil {
		return models.Product{}, fmt.Errorf("error getting product: %w", err)
	}

	return product, nil
}
