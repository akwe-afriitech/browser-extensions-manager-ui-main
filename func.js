const body = document.getElementById("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
const page = document.getElementById("page");
const removeBtn = document.getElementById("remove");
const activeSwitchBtn = document.getElementById("activeSwitch");

let jsonData = {};

fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response into a JavaScript object
  })
  .then((data) => {
    jsonData = data;
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching or parsing JSON:", error);
  });

console.log(jsonData[0]);
darkBtn.onclick = function () {
  document.body.classList.toggle("light-theme");
  darkBtn.classList.add("hide");
  lightBtn.classList.remove("hide");
};
lightBtn.onclick = function () {
  document.body.classList.toggle("light-theme");
  lightBtn.classList.add("hide");
  darkBtn.classList.remove("hide");
};
let index = 0;

// Render function: shows all (index=0), isActive === "true" (index=1), isActive === "false" (index=2)
function renderCards() {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    console.warn("jsonData not loaded yet");
    return;
  }

  // Filter according to index
  let filtered;
  if (index === 0) {
    filtered = jsonData;
  } else if (index === 1) {
    filtered = jsonData.filter((item) => item.isActive == true || item.isActive == "true");
  } else if (index === 2) {
    filtered = jsonData.filter((item) => item.isActive == false || item.isActive === "false");
  } else {
    filtered = jsonData;
  }

  // Show up to 12 items
  const items = filtered.slice(0, 12);

  // Clear existing cards
  body.innerHTML = "";

  if (items.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No items to display.";
    body.appendChild(emptyMsg);
    return;
  }

  // Create cards
  items.forEach((it) => {
    const card = document.createElement("div");
    card.className = "extcard";
    card.innerHTML = `
      <div>
      <img src="${it.logo}" alt="" />
      <p>
        <strong>${it.name}</strong>
        <br>
        ${it.description}
      </p>
      </div>
      <div class="cardopt">
      <button id="remove">Remove</button>
      <input type="checkbox" class="switch" data-name="${encodeURIComponent(it.name)}" ${it.isActive == true || it.isActive == "true" ? "checked" : ""}/>
      </div>
    `;

    // Toggle handler: update in-memory jsonData and persist to localStorage (for simple persistence)
    const switchEl = card.querySelector('.switch');
    if (switchEl) {
      switchEl.addEventListener('change', () => {
      const name = decodeURIComponent(switchEl.dataset.name);
      const idx = jsonData.findIndex(item => item.name === name);
      if (idx !== -1) {
        // Use boolean for isActive
        jsonData[idx].isActive = switchEl.checked;
        // Persist updated data locally (won't modify data.json on disk; use a backend to save server-side)
        try {
        localStorage.setItem('extensionsData', JSON.stringify(jsonData));
        } catch (e) {
        console.warn('Could not save to localStorage:', e);
        }
        // Re-render to reflect any filter changes
        renderCards();
      }
      });
    }
    body.appendChild(card);
  });
}

// Initial render after data should be loaded (gives fetch a moment)
setTimeout(() => {
  renderCards();
}, 1000);

const buttonGroup = document.querySelector(".btnList");
const buttons = buttonGroup.querySelectorAll(".menu-button");

buttonGroup.addEventListener("click", function (event) {
  if (!event.target.classList.contains("menu-button")) return;

  const currentActive = document.querySelector(".menu-button.active");
  if (currentActive) currentActive.classList.remove("active");

  event.target.classList.add("active");

  const buttonsArray = Array.from(buttons);
  index = buttonsArray.indexOf(event.target);
  console.log(index);

  // Re-render based on new index/filter
  renderCards();
});


// Remove item by name and re-render
function removeItem(name) {
  jsonData = jsonData.filter(item => item.name !== name);
  renderCards();
}

// Delegate remove button clicks to the body
body.addEventListener("click", function(event) {
  if (event.target && event.target.id === "remove") {
    // Find the card's name
    const card = event.target.closest(".extcard");
    const nameElem = card.querySelector("strong");
    if (nameElem) {
      removeItem(nameElem.textContent);
    }
  }
});