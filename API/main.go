// main.go

package main

import (
	"api/config"
	"api/database"
	"api/router"
    "api/handler"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"log"
)

func main() {
	database.Connect()
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())
	router.SetupRoutes(app)

	app.Post("/api/validate-login", handler.ValidateLogin)  // Daftarkan endpoint untuk validasi login
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})

	port := config.Config("PORT")

	err := app.Listen(":" + port)
	if err != nil {
		log.Fatalf("Error starting the server: %v", err)
	}
}
