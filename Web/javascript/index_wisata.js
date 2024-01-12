document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/wisata") // Update the endpoint based on your actual API route
      .then((response) => response.json())
      .then((data) => {
        // Grouping data based on the desired structure (Pulau Jawa and Pulau Sumatera)
        const pulauJawaData = data.data.slice(0, 4);
        const pulauSumateraData = data.data.slice(4, 8);
  
        // Populate the Pulau Jawa container
        populateContainer("wisata-container-pulau-jawa", "Pulau Jawa", pulauJawaData);
  
        // Populate the Pulau Sumatera container
        populateContainer("wisata-container-pulau-sumatera", "Pulau Sumatera", pulauSumateraData);
      })
      .catch((error) => console.error("Error fetching wisata data:", error));
  
    function populateContainer(containerId, title, data) {
      const container = document.getElementById(containerId);
      const row = document.createElement("div");
      row.className = "row row-cols-1 row-cols-md-4 g-3";
  
      // Create the title element
      const titleElement = document.createElement("h2");
      titleElement.className = "text-center mb-5 mt-5";
      titleElement.textContent = title;
  
      // Append the title to the container
      container.appendChild(titleElement);
  
      // Iterate through the data and create HTML elements dynamically
      data.forEach((wisata) => {
        createWisataCard(row, wisata);
      });
  
      // Append the row to the container
      container.appendChild(row);
    }
  
    function createWisataCard(container, wisata) {
      const col = document.createElement("div");
      col.className = "col";
  
      const card = document.createElement("div");
      card.className = "card";
  
      const img = document.createElement("img");
      // Assuming your Wisata struct has an 'image' field
      img.src = wisata.image.replace("../img", "./Web/img"); // Replace '../img' with './Web/img'
      img.className = "card-img-top";
      img.alt = "...";
  
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
  
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = wisata.nama_wisata;
  
      const text = document.createElement("p");
      text.className = "card-text";
      text.textContent = wisata.deskripsi_wisata;
  
      // Append elements to construct the card
      cardBody.appendChild(title);
      cardBody.appendChild(text);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      container.appendChild(col);
    }
  });
  