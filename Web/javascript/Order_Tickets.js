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
