fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log("data", data);
  });
});

const fetchWeather = (address, callback) => {
  fetch(`http://localhost:3000/weather?address=${address}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        callback(data.error, undefined);
      } else {
        callback(undefined, data);
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetchWeather(location, (err, { forecast, location } = {}) => {
    if (err) {
      messageOne.textContent = err;
      messageTwo.textContent = "";
    } else {
      messageOne.textContent = forecast;
      messageTwo.textContent = location;
    }
  });
});
