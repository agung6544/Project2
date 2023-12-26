// router/router.go
package router

import (
	"api/handler"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes mengatur semua rute
func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// User Group
	user := api.Group("/user")

	// User Routes
	user.Get("/", handler.GetAllUsers)
	user.Get("/:id", handler.GetSingleUser)
	user.Post("/", handler.CreateUser)  // Tambahkan endpoint untuk membuat pengguna baru di sini
	user.Put("/:uuid", handler.UpdateUserByUUID)
	user.Delete("/:uuid", handler.DeleteUserByUUID)


	// Admin Group
	admin := api.Group("/admin")

	// Admin Routes
	admin.Post("/login", handler.ValidateAdminLogin)
	admin.Get("/", handler.GetAllAdmin)
	admin.Get("/:id", handler.GetSingleAdmin)
	admin.Post("/", handler.CreateAdmin)
	admin.Put("/:id", handler.UpdateAdmin)
	admin.Delete("/:id", handler.DeleteAdminByID)

	// Tiket Group
	tiket := api.Group("/tiket")

	// Tiket Routes
	tiket.Get("/", handler.GetAllTiket)
	tiket.Post("/", handler.CreateTiket)
	tiket.Get("/:username", handler.GetAllTiketByUsername)
	tiket.Delete("/:uuid",handler.DeleteTiketByUUID)
	tiket.Put("/:uuid", handler.UpdateTiketByUUID)
	app.Post("/api/validate-login", handler.ValidateLogin)
}
