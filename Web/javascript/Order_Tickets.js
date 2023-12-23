const tujuanSelect = document.getElementById('inputTujuan');
const wisataSelect = document.getElementById('inputWisata');
const inputHargaTicket = document.getElementById('inputHargaTicket');

const destinasiWisata = {
  'Pulau Jawa': ['Candi Borobudur', 'Gunung Bromo', 'Pantai Kuta', 'Taman Safari'],
  'Pulau Sumatera': ['Danau Toba', 'Bukit Lawang', 'Kerinci Valley', 'Taman Nasional Gunung Leuser'],
  'Pulau Bali': ['Pura Besakih', 'Waterbom Bali', 'Taman Nusa', 'Pantai Kuta'],
  'Pulau Kalimantan': ['Taman Nasional Tanjung Puting', 'Pulau Kakaban', 'Gunung Kinabalu', 'Pasar Terapung Lok Baintan'],
};

function updateDestinasi() {
  const selectedTujuan = tujuanSelect.value;
  const wisataOptions = destinasiWisata[selectedTujuan] || [];

  wisataSelect.innerHTML = '<option selected>Pilih Wisata</option>';

  wisataOptions.forEach((wisata) => {
    const option = document.createElement('option');
    option.value = wisata;
    option.textContent = wisata;
    wisataSelect.appendChild(option);
  });

  updateHargaTicket();
}

tujuanSelect.addEventListener('change', updateDestinasi);

function updateHargaTicket() {
  const selectedDestination = wisataSelect.value;

  const ticketPrices = {
    'Danau Toba': 20000,
    'Bukit Lawang': 25000,
    // ... (Tambahkan harga untuk destinasi lainnya)
  };

  inputHargaTicket.value = ticketPrices[selectedDestination] || 'Pilih Tujuan terlebih dahulu';
}

wisataSelect.addEventListener('change', updateHargaTicket);

function saveOrderData(formData) {
  localStorage.setItem('orderData', JSON.stringify(Object.fromEntries(formData)));
}

function submitOrder(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  saveOrderData(formData);

  window.location.href = 'Pay_Tickets.html';
}

document.querySelector('form').addEventListener('submit', submitOrder);
