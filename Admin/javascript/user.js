function searchTable() {
    // Get the input value for username search
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    // Get the table rows
    const table = document.getElementById('ticketTable');
    const rows = table.getElementsByTagName('tr');
  
    // Loop through each row and hide/show based on the username
    for (let i = 1; i < rows.length; i++) {
      const usernameCell = rows[i].getElementsByTagName('td')[0];
      if (usernameCell) {
        const username = usernameCell.textContent || usernameCell.innerText;
        const rowVisible = username.toLowerCase().includes(searchTerm);
        rows[i].style.display = rowVisible ? '' : 'none';
      }
    }
  }
  
function fetchDataAndDisplay() {
    // Fetch user data first
    fetch('http://localhost:8080/api/user/')
      .then(response => response.json())
      .then(userData => {
        // Ensure user data is not empty
        if (userData && userData.data && userData.data.length > 0) {
          // Iterate through each user in the array
          userData.data.forEach(user => {
            // Make a separate request to get ticket data for each user
            fetch(`http://localhost:8080/api/tiket/${user.username}`)
              .then(response => response.json())
              .then(ticketData => {
                // Ensure ticket data is not empty
                if (ticketData && ticketData.data && ticketData.data.length > 0) {
                  // Calculate the total number of tickets for the user
                  const totalTickets = ticketData.data.length;
  
                  // Display the user data and total tickets in the table
                  const ticketTable = document.getElementById('ticketTable');
                  if (ticketTable) {
                    const row = ticketTable.insertRow();
                    row.innerHTML = `
                      <td>${user.username}</td>
                      <td>${user.decoded_password}</td>
                      <td>${totalTickets}</td>
                    `;
                  } else {
                    console.error('Element with ID "ticketTable" not found.');
                  }
                } else {
                  console.error('No ticket data found for username:', user.username);
                }
              })
              .catch(error => console.error('Error fetching ticket data:', error));
          });
        } else {
          console.error('No user data found.');
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }  