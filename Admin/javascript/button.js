function KonfirmasiUbahUser() {
    var konfirmasi = confirm('Anda yakin ingin mengubah?');
    if (konfirmasi) {
      window.location.href = 'user.html';
    }
}

function KonfirmasiHapusUser() {
    var konfirmasi = confirm('Anda yakin ingin menghapus?');
    if (konfirmasi) {
      window.location.href = 'user.html';
    }
}

function KonfirmasiSimpanUser() {
    alert('Berhasi Disimpan!');
    window.location.href = 'user.html';
}

function KonfirmasiUbahTiket() {
    var konfirmasi = confirm('Anda yakin ingin mengubah?');
    if (konfirmasi) {
      window.location.href = 'tiket.html';
    }
}

function KonfirmasiHapusTiket() {
    var konfirmasi = confirm('Anda yakin ingin menghapus?');
    if (konfirmasi) {
      window.location.href = 'tiket.html';
    }
}