const metodePembayaran = {
  'Bank Negara Indonesia': '9876543210',
  'Bank Republik Indonesia': '0123456789',
  'Bank Central Asia': '0987654321',
  Dana: '082423763748',
  Ovo: '082347362381',
};

document.getElementById('inputMetodePembayaran').addEventListener('change', function () {
  const selectedMetode = this.value;
  const inputNomorRekening = document.getElementById('inputNomorRekening');

  inputNomorRekening.value = metodePembayaran[selectedMetode] || '';
});

document.addEventListener('DOMContentLoaded', function () {});

function submitPayment(event) {
  event.preventDefault();

  const orderData = JSON.parse(localStorage.getItem('orderData'));
  const username = localStorage.getItem('username');
  
  if (!orderData || !username) {
    alert('Data pesanan tidak ditemukan. Silakan pesan tiket terlebih dahulu.');
    return;
  }
// Add username to orderData
  orderData.username = username;

  const form = event.target;
  const paymentFormData = new FormData(form);
  const combinedFormData = new FormData();

  // Tambahkan data pesanan
  for (const [key, value] of Object.entries(orderData)) {
    combinedFormData.append(key, value);
  }

  // Tambahkan data pembayaran
  for (const [key, value] of paymentFormData.entries()) {
    combinedFormData.append(key, value);
  }

  // Ubah objek FormData menjadi objek JavaScript biasa
  const combinedDataObject = Object.fromEntries(combinedFormData);

  fetch('http://localhost:8080/api/tiket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(combinedDataObject),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        alert('Pemesanan tiket berhasil!');
        window.location.href = 'Status_User.html';
      } else {
        alert('Pemesanan tiket gagal. Silakan coba lagi.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    });
}

document.querySelector('form').addEventListener('submit', submitPayment);
