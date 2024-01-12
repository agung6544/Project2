package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
    "time"
)

// Identifiable is an interface that defines the BeforeCreate method
type Identifiable interface {
	BeforeCreate(tx *gorm.DB) (err error)
}

// Define data struct required for User
type User struct {
    ID       uuid.UUID `gorm:"type:uuid;"`
    Username string    `json:"username" gorm:"unique"`
    Email    string    `json:"email"`
    Password string    `json:"password"`
    DecodedPassword string `json:"decoded_password"`
    CreatedAt      time.Time `json:"created_at"`
    UpdatedAt      time.Time `json:"updated_at"`
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
    ID         uuid.UUID `gorm:"type:uuid;"`
    Username     string    `json:"username"`
    NamaPemesan string    `json:"nama_pemesan"`
    TanggalPemesanan string `json:"tanggal_pemesanan"`
    Tujuan     string    `json:"tujuan"`
    Wisata     string    `json:"wisata"`
    HargaTicket string   `json:"harga_ticket"`
    MetodePembayaran string    `json:"metode_pembayaran"`
    NomorRekening string    `json:"nomor_rekening"`
    CreatedAt      time.Time `json:"created_at"`
    UpdatedAt      time.Time `json:"updated_at"`
    BuktiPembayaran  string  `json:"bukti_pembayaran"`
    Status  string  `json:"status"`
}

// Define data struct required for Tiket_List
type Tiket_List struct {
    ID          uint   `gorm:"primaryKey" json:"id"`
    Tujuan      string `json:"tujuan"`
    Wisata      string `json:"wisata"`
    HargaTicket int    `json:"harga_ticket"`
}

// Define data struct required for Wisata
type Wisata struct {
    ID                uint      `gorm:"primaryKey" json:"id"`
    NamaWisata        string    `json:"nama_wisata"`
    DeskripsiWisata   string    `json:"deskripsi_wisata"`
    Image             string    `json:"image"`
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

// Tikets List struct
type Tikets_List struct {
    Tikets_List []Tiket_List `json:"tiket_list"`
}

// Wisata struct
type WisataS struct {
	WisataS []Wisata `json:"wisata"`
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