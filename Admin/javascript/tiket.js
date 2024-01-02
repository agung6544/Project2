function searchTable() {
  // Get the input value for search
  const searchInput = document.getElementById('exampleInputSearch');
  const searchTerm = searchInput.value.toLowerCase();

  // Get the table rows
  const table = document.getElementById('ticketTable');
  const rows = table.getElementsByTagName('tr');

  // Loop through each row and hide/show based on the search term
  for (let i = 1; i < rows.length; i++) {
    const idCell = rows[i].getElementsByTagName('td')[0];
    const usernameCell = rows[i].getElementsByTagName('td')[6];
    const namaPemesanCell = rows[i].getElementsByTagName('td')[1];

    if (idCell && usernameCell && namaPemesanCell) {
      const id = idCell.textContent || idCell.innerText;
      const username = usernameCell.textContent || usernameCell.innerText;
      const namaPemesan = namaPemesanCell.textContent || namaPemesanCell.innerText;

      const rowVisible =
        id.toLowerCase().includes(searchTerm) ||
        username.toLowerCase().includes(searchTerm) ||
        namaPemesan.toLowerCase().includes(searchTerm);

      rows[i].style.display = rowVisible ? '' : 'none';
    }
  }
}

function fetchDataAndDisplay() {
  // Make a fetch request to get ticket data from the server
  fetch('http://localhost:8080/api/tiket')
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
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);
        cell1.innerHTML = "<b>Kode Tiket</b>";
        cell2.innerHTML = "<b>Nama</b>";
        cell3.innerHTML = "<b>Tujuan Wisata</b>";
        cell4.innerHTML = "<b>Tanggal Check In</b>";
        cell5.innerHTML = "<b>Metode Pembayaran</b>";
        cell6.innerHTML = "<b>Bukti Pembayaran</b>";
        cell7.innerHTML = "<b>Status</b>";
        cell8.style.display = 'none';

        // Iterasi melalui setiap tiket dalam array data
        data.data.forEach(tiket => {
          const row = ticketTable.insertRow();
          row.innerHTML = `
            <td class="kode-tiket">${tiket.ID}</td>
            <td>${tiket.nama_pemesan}</td>
            <td>${tiket.wisata}</td>
            <td>${tiket.tanggal_pemesanan}</td>
            <td>${tiket.metode_pembayaran}</td>
            <td><img src="../../API/${tiket.bukti_pembayaran}" style="max-width: 100px; max-height: 100px;"></td>
            <td><button class="btn btn-success btn-konfirmasi">Konfirmasi</button></td>
            <td style="display: none;">${tiket.username}</td>
          `;

          // Add click event listener to the "Kode Tiket" cell
          const kodeTiketCell = row.querySelector('.kode-tiket');
          if (kodeTiketCell) {
            kodeTiketCell.addEventListener('click', () => {
              // Get the Tanggal Check In and Nama and fill the input fields
              const tanggalInput = document.getElementById('exampleInputTanggalPemesanan');
              const namaInput = document.getElementById('exampleInputNama');
              const IDInput = document.getElementById('hiddenIdInput');
              // Set the values in the input fields
              if (tanggalInput && namaInput && IDInput) {
                tanggalInput.value = tiket.tanggal_pemesanan;
                namaInput.value = tiket.nama_pemesan;
                IDInput.value = tiket.ID;
              }
            });
          }

          // Add click event listener to the "Konfirmasi" button
          const konfirmasiButton = row.querySelector('.btn-konfirmasi');
          if (konfirmasiButton) {
            konfirmasiButton.addEventListener('click', () => {
              // Implement your logic for confirming the ticket
              console.log('Konfirmasi button clicked for ticket ID:', tiket.ID);

              // Make a fetch request to update the status to "Konfirmasi"
              fetch(`http://localhost:8080/api/tiket/${tiket.ID}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  status: 'Konfirmasi',
                }),
              })
                .then(response => response.json())
                .then(updatedData => {
                  // Handle the response as needed
                  console.log('Ticket confirmed successfully:', updatedData);
                  alert('Berhasi Dikonfirmasi!');
                })
                .catch(error => console.error('Error confirming ticket:', error));
            });
          }
        });
      } else {
        console.error('Data tiket tidak ditemukan untuk username:', username);
      }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  // Get references to the form elements
  const form = document.querySelector('.custom-form');
  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check which button was clicked
    if (event.submitter.id === 'hapusButton') {
      // Handle delete functionality
      const id = document.getElementById('hiddenIdInput').value;
      if (id) {
        await deleteUser(id);
      }
    } else if (event.submitter.id === 'ubahButton') {
      // Handle update functionality
      const TanggalPemesanan = document.getElementById('exampleInputTanggalPemesanan').value;
      const NamaPemesan = document.getElementById('exampleInputNama').value;
      if (TanggalPemesanan && NamaPemesan) {
        await updateUser(TanggalPemesanan, NamaPemesan);
      }
  };
};

  // Attach the event listener to the form
  form.addEventListener('submit', handleSubmit);

// Function to handle the delete request
const deleteUser = async (ID) => {
  try {
    const response = await fetch(`http://localhost:8080/api/tiket/${ID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user. Status: ${response.status}`);
    }

    // Handle response as needed
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user', error);
  }
};

// Function to handle the update request
const updateUser = async (TanggalPemesanan, NamaPemesan) => {
  const ID = document.getElementById('hiddenIdInput').value;
  try {
    const response = await fetch(`http://localhost:8080/api/tiket/${ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tanggal_pemesanan: TanggalPemesanan,
        nama_pemesan: NamaPemesan,
      }),
    });

    // Handle response as needed
    console.log('Tiket updated successfully');
  } catch (error) {
    console.error('Error updating tiket', error);
  }
};
});