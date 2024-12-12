package main

import (
	"context"
	"dlivery_service/delivery_service/internal/config"
	"dlivery_service/delivery_service/pkg/logger"
	"dlivery_service/delivery_service/pkg/server"
)

const (
	ServiceName = "delivery_service"
)

func main() {
	ctx := context.Background()
	mainLogger := logger.New(ServiceName)
	ctx = context.WithValue(ctx, logger.LoggerKey, mainLogger)

	cfg := config.New()

	serv := server.New(ctx)

	serv.MustRun(cfg)

}
