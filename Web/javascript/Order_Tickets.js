// Order_Tickets.js

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

// Fungsi untuk mengupdate harga tiket berdasarkan pilihan wisata
function updateHargaTicket() {
  const selectedDestination = wisataSelect.value;

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

  const inputHargaTicket = document.getElementById('inputHargaTicket');

  // Update harga tiket sesuai dengan pilihan wisata
  inputHargaTicket.value = ticketPrices[selectedDestination] || 'Pilih Tujuan terlebih dahulu';
}

// Add an event listener to the 'inputWisata' dropdown for changes
wisataSelect.addEventListener('change', updateHargaTicket);

// Fungsi untuk mengirim data tiket ke endpoint /api/tiket
function submitOrder(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch('http://localhost:8080/api/tiket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert('Pemesanan tiket berhasil!');
        // Tambahkan logika atau navigasi ke halaman lain jika diperlukan
      } else {
        alert('Pemesanan tiket gagal. Silakan coba lagi.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    });
}

// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', submitOrder);
