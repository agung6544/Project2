// handler/auth.go
package handler

import (
	"api/database"
	"api/model"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

// ValidateAdminLogin method untuk validasi login admin
func ValidateAdminLogin(c *fiber.Ctx) error {
	db := database.DB.Db
	input := new(struct {
		Username string `json:"username"`
		Password string `json:"password"`
	})

	// Parsing body request
	if err := c.BodyParser(input); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Gagal memproses permintaan", "data": err})
	}

	// Mencari admin berdasarkan username
	var admin model.Admin
	result := db.Where("username = ?", input.Username).First(&admin)

	if result.Error != nil {
		// Handle admin not found
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Login failed. Admin not found.", "data": nil})
	}

	// Log informasi password dari database
	fmt.Printf("Password from database: %s\n", admin.Password)

	// Memeriksa kecocokan password
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(input.Password))

	if err != nil {
		// Log kesalahan verifikasi password
		fmt.Printf("Password verification failed: %v\n", err)
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Login failed. Invalid password.", "data": nil})
	}

	// Jika berhasil, kirim respons berhasil
	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Login berhasil", "data": admin})
}

// ValidateLogin method untuk validasi login
func ValidateLogin(c *fiber.Ctx) error {
	db := database.DB.Db
	input := new(struct {
		Username string `json:"username"`
		Password string `json:"password"`
	})

	// Parsing body request
	if err := c.BodyParser(input); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Gagal memproses permintaan", "data": err})
	}

	// Mencari user berdasarkan username
	var user model.User
	result := db.Where("username = ?", input.Username).First(&user)

	if result.Error != nil {
		// Handle user not found
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Login failed. User not found.", "data": nil})
	}

	// Log informasi password dari database
	fmt.Printf("Password from database: %s\n", user.Password)

	// Memeriksa kecocokan password
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))

	if err != nil {
		// Log kesalahan verifikasi password
		fmt.Printf("Password verification failed: %v\n", err)
		return c.Status(401).JSON(fiber.Map{"status": "error", "message": "Login failed. Invalid password.", "data": nil})
	}

	// Jika berhasil, kirim respons berhasil
	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Login berhasil", "data": user})
}

// CreateUser method untuk membuat pengguna baru
func CreateUser(c *fiber.Ctx) error {
	db := database.DB.Db
	user := new(model.User)

	// Store the body in the user and return error if encountered
	err := c.BodyParser(user)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input", "data": err})
	}

	// Check if the username already exists
	var existingUser model.User
	result := db.Where("username = ?", user.Username).First(&existingUser)
	if result.RowsAffected > 0 {
		// Username already exists, return an error
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Username already exists", "data": nil})
	}

	// Generate hashed password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		// Handle error
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to hash the password", "data": err})
	}

	// Set hashed password ke dalam model pengguna
	user.Password = string(hashedPassword)

	// Simpan pengguna ke dalam database
	if err := db.Create(&user).Error; err != nil {
		// Handle error
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to create user", "data": err})
	}

	// Return the created user
	return c.Status(201).JSON(fiber.Map{"status": "success", "message": "User has been created", "data": user})
}