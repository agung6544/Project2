function konfirmasiLogout() {
  var konfirmasi = confirm('Anda yakin ingin keluar?');
  if (konfirmasi) {
    alert('Anda berhasil keluar!');
    window.location.href = '../../Index.html';
  }
}
