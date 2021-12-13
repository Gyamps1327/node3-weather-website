const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for Express config
const publicDirectorPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcotry to serve
app.use(express.static(publicDirectorPath));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Nana Jojo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nana Jojo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "We are here to offer that much help",
    name: "Nana Jojo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Adress is required",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(
        latitude,
        longitude,
        (error, { description, temperature, humidity } = {}) => {
          if (error) {
            return res.send({ error });
          } else {
            res.send({
              forecast: `${description}. At a temperature of ${temperature} and Humidity of ${humidity}`,
              location,
              address,
            });
          }
        }
      );
    }
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      errors: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errMsg: "Help article not found",
    name: "Nana Jojo",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errMsg: "Page not found",
    name: "Nana Jojo",
  });
});

app.listen("3000", () => {
  console.log("Server is up on port 3000");
});