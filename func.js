const body = document.getElementById("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");
const page = document.getElementById("page");

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

setTimeout(() => {
  if (Array.isArray(jsonData) && jsonData.length >= 12) {
    for (let i = 0; i < 12; i++) {
      let card = document.createElement("div");
      card.className = "extcard";
      card.innerHTML = `
        <div>
          <img src="${jsonData[i].logo}" alt="" />
          <p>
            <strong>${jsonData[i].name}</strong>
            <br>
            ${jsonData[i].description}
          </p>
        </div>
        <div class="cardopt">
          <button>Remove</button>
          <button>Switch</button>
        </div>
      `;
      body.appendChild(card);
    }
  } else {
    console.error("jsonData does not have at least 12 elements.");
  }
}, 1000);

const buttonGroup = document.querySelector(".btnList");
const buttons = buttonGroup.querySelectorAll(".menu-button");

buttonGroup.addEventListener("click", function (event) {
  // Check if the clicked element is a button
  if (event.target.classList.contains("menu-button")) {
    // Remove the 'active' class from any currently active button
    const currentActive = document.querySelector(".menu-button.active");
    if (currentActive) {
      currentActive.classList.remove("active");
    }

    // Add the 'active' class to the newly clicked button
    event.target.classList.add("active");

    // Log a different number for each button
    const buttonsArray = Array.from(buttons);
    const index = buttonsArray.indexOf(event.target);
    console.log(index);
  }
});
