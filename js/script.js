const cardContain = document.querySelector(".card_options");
const card = document.querySelector(".card");
const regionFilterSelect = document.getElementById("region");
const searchInput = document.getElementById("searchInput");
const filePath = "./data.json";

fetch(filePath)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error loading JSON file:", response.status);
    }
    return response.json();
  })
  .then((jsonData) => {
    function processJsonData(jsonData) {
      for (let i = 0; i < jsonData.length; i++) {
        const obj = jsonData[i];

        const numberString = String(obj.population);
        let result = "";
        for (let i = numberString.length - 1; i >= 0; i--) {
          result = numberString[i] + result;

          if ((numberString.length - i) % 3 === 0 && i !== 0) {
            result = "," + result;
          }
        }

        function renderCountries(obj) {
          let html = `
                <div class="card">
        <img src="${obj.flag}" alt="" class="image" />
        <div class="texts">
          <h2 class="name">${obj.name}</h2>
          <p class="population">
            <span class="population_tag">Population: </span>
          ${result}
            </p>
          <p class="region">
            <span class="region_tag">Region: </span>
          ${obj.region}
            </p>
          <p class="capital">
            <span class="capital_tag">Capital: </span>
          ${obj.capital}
            </p>
        </div>
      </div>
          `;
          cardContain.innerHTML += html;
        }

        renderCountries(obj);
      }

      const cards = cardContain.querySelectorAll(".card");
      cards.forEach((card, index) => {
        const obj = jsonData[index];
        card.setAttribute("data-region", obj.region);
      });

      searchInput.addEventListener("input", function () {
        const searchQuery = searchInput.value.toLowerCase();

        cards.forEach((card) => {
          const countryName = card
            .querySelector(".name")
            .textContent.toLowerCase();

          if (!countryName.includes(searchQuery)) {
            card.classList.add("show"); 
          } else {
            card.classList.remove("show"); 
          }
        });
      });
    }
    processJsonData(jsonData);
  })
  .catch((error) => {
    console.error(error);
  });

const modeButton = document.getElementById('modeButton');
const header = document.querySelector('header');

modeButton.addEventListener('click', function() {
    if (header.classList.contains('dark')) {
        header.classList.remove('dark');
        modeButton.textContent = 'Dark Mode';
    } else {
        header.classList.add('dark');
        modeButton.textContent = 'Light Mode';
    }
});