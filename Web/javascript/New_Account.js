function submitForm(event) {
  event.preventDefault();
  const form = event.target;

  // Lakukan validasi input kosong pada username
  const usernameInput = document.getElementById('exampleInputUsername');
  const usernameErrorMessage = document.getElementById('usernameErrorMessage');

  if (usernameInput.value.trim() === '') {
    usernameInput.setCustomValidity('Silahkan Masukkan Username Akun Anda.');
    form.classList.add('was-validated');
    // Sembunyikan pesan kesalahan jika input username kosong
    usernameErrorMessage.style.display = 'none';
    event.stopPropagation();
    return;
  } else {
    usernameInput.setCustomValidity('');
  }

  // Lakukan validasi lain di sini (misalnya, cocokkan kedua password)
  const password1 = document.getElementById('exampleInputPassword1').value;
  const password2 = document.getElementById('exampleInputPassword2').value;

  if (password1 !== password2) {
    const confirmPasswordInput = document.getElementById('exampleInputPassword2');
    confirmPasswordInput.setCustomValidity('Passwords do not match.');
    form.classList.add('was-validated');
    event.stopPropagation();
    return;
  } else {
    const confirmPasswordInput = document.getElementById('exampleInputPassword2');
    confirmPasswordInput.setCustomValidity('');
  }

  // Ambil data dari formulir
  const username = usernameInput.value;
  const email = document.getElementById('exampleInputEmail').value;
  const password = password1;

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

      if (result.status === 'error' && result.message.includes('Username already exists')) {
        // Jika status error dan pesan kesalahan mengandung informasi bahwa username sudah ada
        usernameErrorMessage.textContent = 'Username sudah ada.';
        usernameErrorMessage.style.display = 'block';
        form.classList.add('was-validated');
        event.stopPropagation();
      } else {
        // Sembunyikan pesan kesalahan jika semuanya valid
        usernameErrorMessage.style.display = 'none';

        // Arahkan ke halaman lain jika semuanya valid
        if (form.checkValidity() && result.status === 'success') {
          window.location.href = 'Login_Account.html';
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}