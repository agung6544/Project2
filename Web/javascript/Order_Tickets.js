// Ambil elemen select
const tujuanSelect = document.getElementById('inputTujuan');
const wisataSelect = document.getElementById('inputWisata');

// Objek destinasi wisata berdasarkan tujuan
const destinasiWisata = {
  'Pulau Jawa': ['Candi Borobudur', 'Gunung Bromo', 'Pantai Kuta', 'Taman Safari'],
  'Pulau Sumatera': ['Danau Toba', 'Bukit Lawang', 'Kerinci Valley', 'Taman Nasional Gunung Leuser'],
  'Pulau Bali': ['Pura Besakih', 'Waterbom Bali', 'Taman Nusa', 'Pantai Kuta'],
  'Pulau Kalimantan': ['Taman Nasional Tanjung Puting', 'Pulau Kakaban', 'Gunung Kinabalu', 'Pasar Terapung Lok Baintan'],
};

// Fungsi untuk mengubah pilihan destinasi wisata
function updateDestinasi() {
  const selectedTujuan = tujuanSelect.value;
  const wisataOptions = destinasiWisata[selectedTujuan] || [];

  // Reset pilihan sebelumnya
  wisataSelect.innerHTML = '<option selected>Pilih Wisata</option>';

  // Tambahkan pilihan wisata sesuai dengan tujuan yang dipilih
  wisataOptions.forEach((wisata) => {
    const option = document.createElement('option');
    option.value = wisata;
    option.textContent = wisata;
    wisataSelect.appendChild(option);
  });

  // Memanggil fungsi updateHargaTicket setiap kali ada perubahan pada pilihan wisata
  updateHargaTicket();
}

// Tambahkan event listener pada perubahan nilai pada tujuan
tujuanSelect.addEventListener('change', updateDestinasi);

// kode booking
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Menghentikan default behavior pengiriman form
    window.location.href = 'Pay_Tickets.html'; // Mengarahkan ke form2.html setelah tombol submit ditekan
  });
});

function updateHargaTicket() {
  const selectedDestination = wisataSelect.value; // Get the selected destination

  const ticketPrices = {
    'Danau Toba': 20000,
    'Bukit Lawang': 25000,
    'Kerinci Valley': 20000,
    'Taman Nasional Gunung Leuser': 15000,
    'Candi Borobudur': 15000,
    'Gunung Bromo': 45000,
    'Kawa Ijen': 20000,
    'Taman Safari': 50000,
    'Pura Besakih': 50000,
    'Waterbom Bali': 50000,
    'Taman Nusa': 40000,
    'Pantai Kuta': 50000,
    'Taman Nasional Tanjung Puting': 20000,
    'Pulau Kakaban': 25000,
    'Gunung Kinabalu': 45000,
    'Pasar Terapung Lok Baintan': 20000,
  };

  const inputHargaTicket = document.getElementById('inputHargaTicket'); // Find the ticket price input field

  // Update the ticket price field with the selected destination's price
  inputHargaTicket.value = ticketPrices[selectedDestination] || 'Pilih Tujuan terlebih dahulu';
}

// Add an event listener to the 'inputWisata' dropdown for changes
wisataSelect.addEventListener('change', updateHargaTicket);

// Call updateDestinasi initially to set up initial options
updateDestinasi();

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Menghentikan form dari pengiriman

  window.location.href = 'Pay_Tickets.html';
});

document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Menghentikan form dari pengiriman

  // Simpan nilai inputBooking, inputNamaPemesan, inputTanggalPemesanan, inputTujuan ke dalam localStorage
  const inputBookingValue = document.getElementById('inputBooking').value;
  const inputNamaPemesanValue = document.getElementById('inputNamaPemesan').value;
  const inputTanggalPemesananValue = document.getElementById('inputTanggalPemesanan').value;
  const inputTujuanValue = document.getElementById('inputTujuan').value;

  localStorage.setItem('bookingCode', inputBookingValue);
  localStorage.setItem('namaPemesan', inputNamaPemesanValue);
  localStorage.setItem('tanggalPemesanan', inputTanggalPemesananValue);
  localStorage.setItem('tujuanWisata', inputTujuanValue);

  // Pindahkan ke halaman status.html
  window.location.href = 'Status_User.html';
});
