// New_Account.js

function submitForm(event) {
  event.preventDefault();
  const form = event.target;

  if (form.checkValidity() === false) {
    event.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  // Lakukan validasi lain di sini (misalnya, cocokkan kedua password)
  const password1 = document.getElementById('exampleInputPassword1').value;
  const password2 = document.getElementById('exampleInputPassword2').value;

  if (password1 !== password2) {
    const confirmPasswordInput = document.getElementById('exampleInputPassword2');
    confirmPasswordInput.setCustomValidity('Passwords do not match.'); // Menambahkan pesan kesalahan kustom
    form.classList.add('was-validated'); // Menampilkan pesan kesalahan
    event.stopPropagation();
    return; // Menghentikan pengiriman form jika password tidak cocok
  } else {
    const confirmPasswordInput = document.getElementById('exampleInputPassword2');
    confirmPasswordInput.setCustomValidity(''); // Menghapus pesan kesalahan jika password cocok
  }

  // Ambil data dari formulir
  const username = document.getElementById('exampleInputUsername').value;
  const email = document.getElementById('exampleInputEmail').value;
  const password = password1; // Gunakan password pertama, karena kita sudah memvalidasi bahwa keduanya cocok

  // Buat objek data untuk dikirim ke server
  const data = {
    username: username,
    email: email,
    password: password
  };

  // Lakukan permintaan HTTP POST ke endpoint user (ganti URL dengan endpoint yang sesuai)
  fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      // Tanggapi hasil dari server di sini
      console.log(result);

      // Arahkan ke halaman lain jika semuanya valid
      if (form.checkValidity() && result.status === 'success') {
        window.location.href = 'Login_Account.html';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
