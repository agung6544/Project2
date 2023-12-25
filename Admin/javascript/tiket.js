function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.querySelector(".table");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      tdNama = tr[i].getElementsByTagName("td")[1]; // Change the index to the column you want to search (2 for Nama)
      tdKodeTiket = tr[i].getElementsByTagName("td")[0]; // Change the index to the column you want to search (1 for Kode Tiket)
  
      if (tdNama || tdKodeTiket) {
        const txtValueNama = tdNama.textContent || tdNama.innerText;
        const txtValueKodeTiket = tdKodeTiket.textContent || tdKodeTiket.innerText;
  
        if (txtValueNama.toUpperCase().indexOf(filter) > -1 || txtValueKodeTiket.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  
    // Fetch data based on the username, name, or Kode Tiket
    const searchTerm = input.value.trim(); // Get the trimmed search term from the input
    if (searchTerm !== "") {
      fetch(`http://localhost:8080/api/tiket/${searchTerm}`)
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
            const cell6 = row.insertCell(5);
            cell1.innerHTML = "<b>Kode Tiket</b>";
            cell2.innerHTML = "<b>Nama</b>";
            cell3.innerHTML = "<b>Tujuan Wisata</b>";
            cell4.innerHTML = "<b>Tanggal Pemesanan</b>";
            cell5.innerHTML = "<b>Metode Pembayaran</b>";
            cell6.innerHTML = "<b>Status</b>";
  
            // Iterasi melalui setiap tiket dalam array data
            data.data.forEach(tiket => {
              const row = ticketTable.insertRow();
              row.innerHTML = `
                <td>${tiket.ID}</td>
                <td>${tiket.nama_pemesan}</td>
                <td>${tiket.wisata}</td>
                <td>${tiket.tanggal_pemesanan}</td>
                <td>${tiket.metode_pembayaran}</td>
                <td>Valid</td>
              `;
            });
          } else {
            console.error('Data tiket tidak ditemukan untuk username, nama, atau Kode Tiket:', searchTerm);
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }

  
function fetchDataAndDisplay() {
    // Make a fetch request to get ticket data from the server
    fetch('http://localhost:8080/api/tiket/')
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
        const cell6 = row.insertCell(5);
        cell1.innerHTML = "<b>Kode Tiket</b>";
        cell2.innerHTML = "<b>Nama</b>";
        cell3.innerHTML = "<b>Tujuan Wisata</b>";
        cell4.innerHTML = "<b>Tanggal Pemesanan</b>";
        cell5.innerHTML = "<b>Metode Pembayaran</b>";
        cell6.innerHTML = "<b>Status</b>";

        // Iterasi melalui setiap tiket dalam array data
        data.data.forEach(tiket => {
          const row = ticketTable.insertRow();
          row.innerHTML = `
            <td>${tiket.ID}</td>
            <td>${tiket.nama_pemesan}</td>
            <td>${tiket.wisata}</td>
            <td>${tiket.tanggal_pemesanan}</td>
            <td>${tiket.metode_pembayaran}</td>
            <td>Valid</td>
          `;
        });
      } else {
        console.error('Data tiket tidak ditemukan untuk username:', username);
      }
    })
    .catch(error => console.error('Error:', error));
}