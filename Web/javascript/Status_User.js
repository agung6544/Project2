
// Function to fetch data and update the table
document.addEventListener('DOMContentLoaded', function () {
  // Mendapatkan username dari local storage
  const username = localStorage.getItem('username');

  // Membuat HTTP request menggunakan fetch
  fetch('http://localhost:8080/api/tiket/' + username)
    .then(response => response.json())
    .then(data => {
      // Memastikan data tidak kosong
      if (data && data.data && data.data.length > 0) {
        // Menampilkan nilai-nilai tersebut di tabel
        const ticketTable = document.getElementById('ticketTable');

        // Kosongkan tabel sebelum menambahkan data baru
        ticketTable.innerHTML = '';

        // Tambahkan judul atribut tabel
        const header = ticketTable.createTHead();
        const row = header.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        cell1.innerHTML = "<b>Nama Pemesan</b>";
        cell2.innerHTML = "<b>Wisata</b>";
        cell3.innerHTML = "<b>Tanggal Pemesanan</b>";
        cell4.innerHTML = "<b>Status</b>";
        cell5.innerHTML = "<b>Aksi</b>";

// Iterasi melalui setiap tiket dalam array data
data.data.forEach(tiket => {
  const row = ticketTable.insertRow();

  // Mengonversi string tanggal menjadi objek Date
  const createdDate = new Date(tiket.created_at);

  // Membangun format tanggal yang diinginkan (YYYY-MM-DD)
  const formattedDate = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;

  // Check if the status is "Konfirmasi"
  const isKonfirmasi = tiket.status === 'Konfirmasi';

  row.innerHTML = `
    <td>${tiket.nama_pemesan}</td>
    <td>${tiket.wisata}</td>
    <td>${formattedDate}</td>
    <td>${isKonfirmasi ? 'Valid' : 'Tidak Valid'}</td>
    <td>
      ${isKonfirmasi ? `<button onclick="cetakBuktiPembayaran('${tiket.metode_pembayaran}', '${formattedDate}', '${tiket.nomor_rekening}', '${tiket.harga_ticket}')">Cetak Bukti Pembayaran</button>
      <button onclick="cetakTiket('${tiket.ID}','${tiket.tanggal_pemesanan}', '${tiket.nama_pemesan}', '${tiket.wisata}')">Cetak Tiket</button>` : ''}
    </td>
  `;
});
      } else {
        console.error('Data tiket tidak ditemukan untuk username:', username);
      }
    })
    .catch(error => console.error('Error:', error));

  // Function to print payment receipt
  window.cetakBuktiPembayaran = function (metodePembayaran, formattedDate, nomorRekening, harga) {
    // Store data in local storage
    localStorage.setItem('buktiPembayaranData', JSON.stringify({
      metodePembayaran,
      formattedDate,
      nomorRekening,
      harga
    }));

    // Cetak bukti pembayaran
    window.location.href = 'cetak_buktipembayaran.html'; // Gantilah dengan logika cetak sesuai kebutuhan
  }

  // Function to print ticket
  window.cetakTiket = function (id, tanggalPemesanan, namaPemesan, wisata) {
      // Store data in local storage
    localStorage.setItem('tiketData', JSON.stringify({
      id,
      tanggalPemesanan,
      namaPemesan,
      wisata
    }));
    // Cetak tiket
    window.location.href = 'cetak_tiket.html';
  }
});