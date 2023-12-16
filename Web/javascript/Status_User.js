document.addEventListener('DOMContentLoaded', function () {
  // Ambil nilai-nilai dari localStorage
  const namaPemesan = localStorage.getItem('namaPemesan');
  const tanggalPemesanan = localStorage.getItem('tanggalPemesanan');
  const tujuanWisata = localStorage.getItem('tujuanWisata');

  // Tampilkan nilai-nilai tersebut di tabel
  document.getElementById('displayNamaPemesan').innerText = namaPemesan;
  document.getElementById('displayTujuanWisata').innerText = tujuanWisata;
  document.getElementById('displayTanggalPemesanan').innerText = tanggalPemesanan;
});
