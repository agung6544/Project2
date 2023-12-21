// Login_Account.js

function submitForm(event) {
  event.preventDefault(); // Menghentikan pengiriman form
  const form = event.target;

  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add('was-validated');
    return; // Menghentikan fungsi jika form tidak valid
  }

  // Ambil data dari formulir
  const username = document.getElementById('exampleInputUsername').value;
  const password = document.getElementById('exampleInputPassword1').value;

  // Lakukan validasi atau kirim data ke server untuk proses autentikasi
  // Misalnya, Anda dapat menggunakan fetch() untuk mengirim permintaan ke server
  // Gantilah URL dengan endpoint autentikasi yang sesuai pada server Anda

  fetch('http://localhost:8080/api/validate-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      // ...

      // Arahkan ke halaman lain jika autentikasi berhasil
      if (form.checkValidity() && result.status === 'success') {
        window.location.href = 'user.html';

        alert('Selamat, Anda telah berhasil login.');
      } else {
        // Tampilkan pesan kesalahan jika autentikasi gagal
        alert('Login failed.\nPlease check your username and password');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
