// Daftar metode pembayaran beserta nomor rekening
const metodePembayaran = {
  'Bank Negara Indoensia': '9876543210',
  'Bank Republik Indonesia': '0123456789',
  'Bank Central Asia': '0987654321',
  Dana: '082423763748',
  Ovo: '082347362381',
};

// Fungsi untuk mengisi nomor rekening sesuai dengan metode pembayaran yang dipilih
document.getElementById('inputMetodePembayaran').addEventListener('change', function () {
  const selectedMetode = this.value;

  // Isi inputNomorRekening dengan nomor rekening yang sesuai
  document.getElementById('inputNomorRekening').value = metodePembayaran[selectedMetode];
});

document.addEventListener('DOMContentLoaded', function () {
  // Menggunakan event listener untuk menangani submit form
  document.querySelector('form').addEventListener('submit', function (event) {
    // Menghentikan perilaku default form submit agar tidak refresh halaman
    event.preventDefault();

    // Navigasi ke status.html saat tombol submit ditekan
    window.location.href = 'Status_User.html';
  });
});
