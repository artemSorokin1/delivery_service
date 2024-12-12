package server

import (
	"context"
	"dlivery_service/delivery_service/internal/config"
	"dlivery_service/delivery_service/internal/service/handlers"
	"dlivery_service/delivery_service/pkg/logger"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

type EchoServer struct {
	log     *logger.Logger
	server  *echo.Echo
	handler *handlers.Handler
}

func New(ctx context.Context) *EchoServer {
	logg := logger.GetLoggerFromContext(ctx)
	return &EchoServer{
		log:     logg,
		server:  echo.New(),
		handler: handlers.New(),
	}
}

func (e *EchoServer) MustRun(cfg *config.Config) {
	e.server.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"}, // Ваш адрес фронтенда
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))
	e.setHandlers()
	err := e.server.Start(fmt.Sprintf("0.0.0.0:%s", cfg.ServerCfg.Port))
	if err != nil {
		panic(err)
	}
}

func (e *EchoServer) setHandlers() {
	e.server.POST("/register", e.handler.RegisterUserHandler)
	e.server.POST("/login", e.handler.LoginUserHandler)
	e.server.GET("/products", e.handler.GetProductsHandler)
	e.server.GET("/products/:id", e.handler.GetProductByIdHandler)
}
