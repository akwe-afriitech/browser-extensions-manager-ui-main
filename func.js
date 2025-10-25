const body = document.getElementById("body");
const darkBtn = document.getElementById("dark-btn");
const lightBtn = document.getElementById("light-btn");

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
  console.log(jsonData[2].name);

//   body.classList.add("dark-theme");
//   body.classList.remove("light-theme");
};
lightBtn.onclick = function () {
//   body.classList.add("light-theme");
//   body.classList.remove("dark-theme");
};
