package handler

import (
	"api/database"
	"api/model"
	
	"github.com/gofiber/fiber/v2"
)




// GetAllWisataList retrieves all Wisata List from the database
func GetAllWisataList(c *fiber.Ctx) error {
	db := database.DB.Db
	var wisataList []model.Wisata

	db.Find(&wisataList)

	if len(wisataList) == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Wisata not found", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Wisata Found", "data": wisataList})
}