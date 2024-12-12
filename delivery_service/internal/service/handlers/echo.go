package handlers

import (
	"context"
	"dlivery_service/delivery_service/internal/repository/storage"
	"dlivery_service/delivery_service/pkg/auth"
	"fmt"
	grpcauth "github.com/artemSorokin1/Auth-proto/protos/gen/protos/proto"
	"github.com/labstack/echo/v4"
	"log/slog"
	"net/http"
	"strconv"
	"time"
)

type Handler struct {
	GRPCClient *auth.GRPCAuthClient
	DB         *storage.DB
}

func New() *Handler {
	return &Handler{
		GRPCClient: auth.New(context.Background(), time.Second*1, 3),
	}
}

func (h *Handler) LoginUserHandler(c echo.Context) error {
	response, err := h.GRPCClient.Api.Login(context.Background(), &grpcauth.LoginRequest{
		Username: c.FormValue("username"),
		Password: c.FormValue("password"),
	})
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}

	cookie := http.Cookie{
		Name:     "auth_token",
		Value:    response.Token,
		HttpOnly: true,
	}

	c.SetCookie(&cookie)

	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}

func (h *Handler) RegisterUserHandler(c echo.Context) error {
	response, err := h.GRPCClient.Api.Register(context.Background(), &grpcauth.RegisterRequest{
		Email:    c.FormValue("email"),
		Username: c.FormValue("username"),
		Password: c.FormValue("password"),
	})
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}
	slog.Info(fmt.Sprintf("user registered with id: %d", response.UserId))

	return c.JSON(http.StatusOK, map[string]string{"message": "success"})
}

func (h *Handler) GetProductsHandler(c echo.Context) error {
	products, err := h.DB.GetProducts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, products)
}

func (h *Handler) GetProductByIdHandler(c echo.Context) error {
	i := c.Param("id")
	id, _ := strconv.ParseInt(i, 10, 64)
	product, err := h.DB.GetProductById(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, product)
}
