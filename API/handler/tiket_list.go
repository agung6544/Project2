// handler/tiket_list.go
package handler

import (
	"api/database"
	"api/model"
	"net/url"

	"github.com/gofiber/fiber/v2"
)

// GetAllTiketList retrieves all Tiket List from the database
func GetAllTiketList(c *fiber.Ctx) error {
	db := database.DB.Db
	var tiket_list []model.Tiket_List

	db.Find(&tiket_list)

	if len(tiket_list) == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket Found", "data": tiket_list})
}

// GetHargaTicketByWisata retrieves ticket price by destination from the database
func GetHargaTicketByWisata(c *fiber.Ctx) error {
	// Mendapatkan parameter wisata dari URL
	wisata, err := url.QueryUnescape(c.Params("wisata"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid parameter", "data": nil})
	}

	// Mengakses database
	db := database.DB.Db

	// Mencari harga_ticket berdasarkan atribut wisata
	var hargaTicket model.Tiket_List
	result := db.Where("wisata = ?", wisata).First(&hargaTicket)

	// Memeriksa apakah data ditemukan
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Data not found", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Data Found", "data": hargaTicket.HargaTicket})
}

// GetWisataByTujuan retrieves destinations by target from the database
func GetWisataByTujuan(c *fiber.Ctx) error {
	// Mendapatkan parameter tujuan dari URL
	tujuan, err := url.QueryUnescape(c.Params("tujuan"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid parameter", "data": nil})
	}

	// Mengakses database
	db := database.DB.Db

	// Mencari wisata berdasarkan atribut tujuan
	var wisataList []model.Tiket_List
	result := db.Where("tujuan = ?", tujuan).Find(&wisataList)

	// Memeriksa apakah data ditemukan
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Data not found", "data": nil})
	}

	// Mengumpulkan wisata dari hasil query
	var destinations []string
	for _, wisata := range wisataList {
		destinations = append(destinations, wisata.Wisata)
	}

	return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Data Found", "data": destinations})
}
