const tujuanSelect = document.getElementById('inputTujuan');
const wisataSelect = document.getElementById('inputWisata');
const hargaTicketInput = document.getElementById('inputHargaTicket');

document.addEventListener('DOMContentLoaded', () => {
  // Get username from local storage
  const username = localStorage.getItem('username');

  // Set the value of inputNamaPemesan with the username
  const inputNamaPemesan = document.getElementById('inputNamaPemesan');
  if (inputNamaPemesan && username) {
    inputNamaPemesan.value = username;
  }
});

// Function to fetch the list of wisata based on selected tujuan
async function updateWisataOptions() {
    const selectedTujuan = tujuanSelect.value;
  
    try {
      // Fetch the list of wisata from the API
      const response = await fetch(`http://localhost:8080/api/tiket-list/list/${selectedTujuan}`);
      const responseData = await response.json();
  
      // Check if the data has the expected structure
      if (Array.isArray(responseData.data)) {
        // Clear existing options
        wisataSelect.innerHTML = '';
  
        // Add new options based on the fetched data
        responseData.data.forEach((wisata) => {
          const option = document.createElement('option');
          option.value = wisata;
          option.text = wisata;
          wisataSelect.appendChild(option);
        });
      } else {
        console.error('Invalid data structure for wisataList:', responseData);
      }
    } catch (error) {
      console.error('Error fetching wisata:', error);
    }
  }
  

  async function updateHargaTicket() {
    const selectedWisata = wisataSelect.value;
  
    try {
      // Fetch the harga ticket from the API
      const response = await fetch(`http://localhost:8080/api/tiket-list/${selectedWisata}`);
      const responseData = await response.json();
  
      // Check if the data has the expected structure
      if (responseData.status === 'success' && typeof responseData.data !== 'undefined') {
        // Update the inputHargaTicket value
        hargaTicketInput.value = responseData.data;
      } else {
        console.error('Invalid data structure for harga ticket:', responseData);
        // You might want to handle this case, e.g., set a default value or display an error message.
      }
    } catch (error) {
      console.error('Error fetching harga ticket:', error);
    }
  }
  

// Event listener for changes in inputTujuan
tujuanSelect.addEventListener('change', () => {
  updateWisataOptions();
});

// Event listener for changes in inputWisata
wisataSelect.addEventListener('change', () => {
  updateHargaTicket();
});

function saveOrderData(formData) {
  localStorage.setItem('orderData', JSON.stringify(Object.fromEntries(formData)));
}

function submitOrder(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  saveOrderData(formData);

  window.location.href = 'Pay_Tickets.html';
}

document.querySelector('form').addEventListener('submit', submitOrder);
