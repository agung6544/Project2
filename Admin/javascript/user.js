function searchTable() {
  // Get the input value for username search
  const searchInput = document.getElementById('exampleInputUsername');
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
              // Calculate the total number of tickets for the user
              const totalTickets = ticketData && ticketData.data ? ticketData.data.length : 0;

              // Display the user data and total tickets in the table
              const ticketTable = document.getElementById('ticketTable');
              if (ticketTable) {
                const row = ticketTable.insertRow();
                row.innerHTML = `
                  <td class="username-cell" data-username="${user.username}">${user.username}</td>
                  <td>${user.decoded_password}</td>
                  <td>${totalTickets}</td>
                `;

                // Add click event listener to the username cell
                const usernameCell = row.querySelector('.username-cell');
                if (usernameCell) {
                  usernameCell.addEventListener('click', () => {
                    // Get the username and password and fill the input fields
                    const usernameInput = document.getElementById('exampleInputUsername');
                    const passwordInput = document.getElementById('exampleInputPassword1');

                    // Set the values in the input fields
                    if (usernameInput && passwordInput) {
                      usernameInput.value = user.username;
                      passwordInput.value = user.decoded_password;
                    }

                    // Add your logic to trigger the event for the hidden ID
                    const hiddenIdInput = document.getElementById('hiddenIdInput');
                    if (hiddenIdInput) {
                      hiddenIdInput.value = user.ID; // Assuming user.id is the ID you want to set
                      // Trigger any additional logic you need for the hidden ID
                    }
                  });
                }
              } else {
                console.error('Element with ID "ticketTable" not found.');
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
      const username = document.getElementById('exampleInputUsername').value;
      const password = document.getElementById('exampleInputPassword1').value;
      if (username && password) {
        await updateUser(username, password);
      }
    } else if (event.submitter.id === 'simpanButton') {
      // Handle save functionality
      const username = document.getElementById('exampleInputUsername').value;
      const password = document.getElementById('exampleInputPassword1').value;
      if (username && password) {
        await saveUser(username, password);
      }
    }
  };

  // Attach the event listener to the form
  form.addEventListener('submit', handleSubmit);

// Function to handle the delete request
const deleteUser = async (ID) => {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${ID}`, {
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
const updateUser = async (username, password) => {
  const ID = document.getElementById('hiddenIdInput').value;
  try {
    const response = await fetch(`http://localhost:8080/api/user/${ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Handle response as needed
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user', error);
  }
};

  // Function to handle the save request
  const saveUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Handle response as needed
      console.log('User saved successfully');
    } catch (error) {
      console.error('Error saving user', error);
    }
  };
});