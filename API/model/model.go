package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Identifiable is an interface that defines the BeforeCreate method
type Identifiable interface {
	BeforeCreate(tx *gorm.DB) (err error)
}

// Define data struct required for User
type User struct {
    gorm.Model
    ID       uuid.UUID `gorm:"type:uuid;"`
    Username string    `json:"username" gorm:"unique"`
    Email    string    `json:"email"`
    Password string    `json:"password"`
}

// Define data struct required for Admin
type Admin struct {
    gorm.Model
    ID       uuid.UUID `gorm:"type:uuid;"`
    Username string    `json:"username"`
    Password string    `json:"password"`
}

// Define data struct required for Tiket
type Tiket struct {
    gorm.Model
    ID         uuid.UUID `gorm:"type:uuid;"`
    NamaPemesan string    `json:"nama_pemesan"`
    TanggalPemesanan string `json:"tanggal_pemesanan"`
    Tujuan     string    `json:"tujuan"`
    Wisata     string    `json:"wisata"`
    HargaTicket string   `json:"harga_ticket"`
}

// Users struct
type Users struct {
	Users []User `json:"users"`
}

// Admins struct
type Admins struct {
	Admins []Admin `json:"admins"`
}

// Tikets struct
type Tikets struct {
    Tikets []Tiket `json:"tikets"`
}

// BeforeCreate is a common method for generating UUID before record creation
func (user *User) BeforeCreate(tx *gorm.DB) (err error) {
	user.ID = uuid.New()
	return
}

// BeforeCreate is a common method for generating UUID before record creation
func (admin *Admin) BeforeCreate(tx *gorm.DB) (err error) {
    admin.ID = uuid.New()
    return
}

// BeforeCreate is a common method for generating UUID before record creation
func (tiket *Tiket) BeforeCreate(tx *gorm.DB) (err error) {
	tiket.ID = uuid.New()
	return
}