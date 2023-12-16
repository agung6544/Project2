package handler

import (
    "api/database"
    "api/model"
    "github.com/gofiber/fiber/v2"
    "github.com/google/uuid"
)

// Create a Tiket
func CreateTiket(c *fiber.Ctx) error {
    db := database.DB.Db
    tiket := new(model.Tiket)

    err := c.BodyParser(tiket)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input", "data": err})
    }

    err = db.Create(&tiket).Error
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create Tiket", "data": err})
    }

    return c.Status(201).JSON(fiber.Map{"status": "success", "message": "Tiket has been created", "data": tiket})
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

// Update a Tiket in db
func UpdateTiket(c *fiber.Ctx) error {
    db := database.DB.Db
    var tiket model.Tiket
    id := c.Params("id")

    db.Find(&tiket, "id = ?", id)

    if tiket.ID == uuid.Nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
    }

    var updateTiketData model.Tiket
    err := c.BodyParser(&updateTiketData)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input", "data": err})
    }

    // Update fields as needed
    tiket.Username = updateTiketData.Username
    tiket.Password = updateTiketData.Password

    db.Save(&tiket)

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket Found", "data": tiket})
}

// Delete Tiket in db by ID
func DeleteTiketByID(c *fiber.Ctx) error {
    db := database.DB.Db
    var tiket model.Tiket
    id := c.Params("id")

    db.Find(&tiket, "id = ?", id)

    if tiket.ID == uuid.Nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tiket not found", "data": nil})
    }

    err := db.Delete(&tiket, "id = ?", id).Error
    if err != nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Failed to delete Tiket", "data": nil})
    }

    return c.Status(200).JSON(fiber.Map{"status": "success", "message": "Tiket deleted"})
}
