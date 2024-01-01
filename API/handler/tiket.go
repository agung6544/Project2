// tiket.go
package handler

import (
    "api/database"
    "api/model"
    "github.com/gofiber/fiber/v2"
    "github.com/google/uuid"
    "path/filepath"
)

// Create a Tiket
func CreateTiket(c *fiber.Ctx) error {
    db := database.DB.Db
    tiket := new(model.Tiket)

    // Handle file upload
    file, err := c.FormFile("bukti_pembayaran")
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to process file upload", "data": err})
    }

    // Generate unique filename using UUID
    fileName := uuid.New().String() + filepath.Ext(file.Filename)
    filePath := "./uploads/" + fileName

    // Save the file to the specified path
    if err := c.SaveFile(file, filePath); err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to save file", "data": err})
    }

    // Set the filepath and filename in the Tiket struct
    tiket.BuktiPembayaran = filePath

    // Parse request body for other Tiket fields
    if err := c.BodyParser(tiket); err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to parse request body", "data": err})
    }

    // Manually set some fields based on your form data
    tiket.NamaPemesan = c.FormValue("nama_pemesan")
    tiket.TanggalPemesanan = c.FormValue("tanggal_pemesanan")
    tiket.HargaTicket = c.FormValue("harga_ticket")
    tiket.MetodePembayaran = c.FormValue("metode_pembayaran")
    tiket.NomorRekening = c.FormValue("nomor_rekening")

    // Create Tiket in the database
    err = db.Create(&tiket).Error
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create Tiket", "data": err})
    }

    return c.Status(201).JSON(fiber.Map{"status": "success", "message": "Tiket has been created", "data": tiket})
}



// Get All Tiket by Username from db
func GetAllTiketByUsername(c *fiber.Ctx) error {
    db := database.DB.Db
    username := c.Params("username")
    var tikets []model.Tiket

    db.Where("username = ?", username).Find(&tikets)

    if len(tikets) == 0 {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found for the specified username", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket Found", "data": tikets})
}

// Get All Tiket from db
func GetAllTiket(c *fiber.Ctx) error {
    db := database.DB.Db
    var tikets []model.Tiket

    db.Find(&tikets)

    if len(tikets) == 0 {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket Found", "data": tikets})
}

// Get Single Tiket from db
func GetSingleTiket(c *fiber.Ctx) error {
    db := database.DB.Db
    id := c.Params("id")
    var tiket model.Tiket

    db.Find(&tiket, "id = ?", id)

    if tiket.ID == uuid.Nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket Found", "data": tiket})
}

// UpdateTiketByUUID updates Tiket in db by UUID
func UpdateTiketByUUID(c *fiber.Ctx) error {
    db := database.DB.Db
    var tiket model.Tiket

    // Get UUID from params
    uuidParam := c.Params("uuid")

    // Parse UUID string to UUID type
    id, err := uuid.Parse(uuidParam)
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid UUID", "data": nil})
    }

    // Parse request body to update Tiket fields
    if err := c.BodyParser(&tiket); err != nil {
        return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Failed to parse request body", "data": nil})
    }

    // Set the ID for the update
    tiket.ID = id

    // Update Tiket in the database
    result := db.Model(&model.Tiket{}).Where("id = ?", id[:]).Updates(&tiket)

    if result.RowsAffected == 0 {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket updated", "data": tiket})
}

// Delete Tiket in db by UUID
func DeleteTiketByUUID(c *fiber.Ctx) error {
    db := database.DB.Db
    var tiket model.Tiket

    // Get UUID from params
    uuidParam := c.Params("uuid")

    // Parse UUID string to UUID type
    id, err := uuid.Parse(uuidParam)
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid UUID", "data": nil})
    }

    // Delete Tiket by UUID
    if err := db.Delete(&tiket, "id = ?", id[:]).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Failed to delete Tiket", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket deleted"})
}