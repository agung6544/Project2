package handler
import (
	"api/database"
	"api/model"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// Get All Users from db
func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB.Db
	var users []model.User
   // find all users in the database
	db.Find(&users)
   // If no user found, return an error
	if len(users) == 0 {
	 return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Users not found", "data": nil})
	}
   // return users
	return c.Status(200).JSON(fiber.Map{"status": "sucess", "message": "Users Found", "data": users})
}

// GetSingleUser from db
func GetSingleUser(c *fiber.Ctx) error {
	db := database.DB.Db
   // get id params
	id := c.Params("id")
   var user model.User
   // find single user in the database by id
	db.Find(&user, "id = ?", id)
   if user.ID == uuid.Nil {
	 return c.Status(404).JSON(fiber.Map{"status": "error", "message": "User not found", "data": nil})
	}
   return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User Found", "data": user})
}

// Update user in db by UUID
func UpdateUserByUUID(c *fiber.Ctx) error {
	db := database.DB.Db
	uuidParam := c.Params("uuid")
	userToUpdate := new(model.User)

	// Parse UUID string to UUID type
	id, err := uuid.Parse(uuidParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid UUID", "data": nil})
	}

	// Find user by UUID (convert UUID to binary)
	result := db.Where("id = ?", id[:]).First(&userToUpdate)
	if result.RowsAffected == 0 {
		// User not found, return error
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "User not found", "data": nil})
	}

	// Save the decoded password
	decodedPassword := userToUpdate.DecodedPassword

	// Parse body into the user model
	err = c.BodyParser(userToUpdate)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input", "data": err})
	}

	// If the password is not empty, update the password
	if userToUpdate.Password != "" {
		// Decode the password and store it in the decoded_password field
		userToUpdate.DecodedPassword = userToUpdate.Password

		// Generate hashed password
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userToUpdate.Password), bcrypt.DefaultCost)
		if err != nil {
			// Handle error
			return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to hash the password", "data": err})
		}

		// Set hashed password in the user model
		userToUpdate.Password = string(hashedPassword)
	} else {
		// If the password is empty, use the previous password
		userToUpdate.Password = decodedPassword
	}

	// Update user in the database
	if err := db.Model(&model.User{}).Where("id = ?", id[:]).Updates(&userToUpdate).Error; err != nil {
		// Handle error
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to update user", "data": err})
	}

	// Return the updated user
	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User has been updated", "data": userToUpdate})
}


func DeleteUserByUUID(c *fiber.Ctx) error {
	db := database.DB.Db
	var user model.User

	// Get UUID from params
	uuidParam := c.Params("uuid")

	// Parse UUID string to UUID type
	id, err := uuid.Parse(uuidParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid UUID", "data": nil})
	}

	// Delete user by UUID
	if err := db.Delete(&user, "id = ?", id[:]).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to delete user", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "User deleted", "data": nil})
}
