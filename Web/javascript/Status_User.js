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
        cell1.innerHTML = "<b>Nama Pemesan</b>";
        cell2.innerHTML = "<b>Wisata</b>";
        cell3.innerHTML = "<b>Tanggal Pemesanan</b>";
        cell4.innerHTML = "<b>Status</b>";

        // Iterasi melalui setiap tiket dalam array data
        data.data.forEach(tiket => {
          const row = ticketTable.insertRow();
          row.innerHTML = `
            <td>${tiket.nama_pemesan}</td>
            <td>${tiket.wisata}</td>
            <td>${tiket.tanggal_pemesanan}</td>
            <td>Valid</td>
          `;
        });
      } else {
        console.error('Data tiket tidak ditemukan untuk username:', username);
      }
    })
    .catch(error => console.error('Error:', error));
});
