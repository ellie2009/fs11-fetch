import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("befae7d1dc85012afaff2d6c76d7f598");

  const handleChange = e => {
    // handle key presses
    const input = e.target.value;
    setLocation(input);
  };

  const handleSubmit = e => {
    // handle form submit
    e.preventDefault();
    setLoading(true);
    getWeather(location);
  };

  const getWeather = location => {
    if (location === "") {
      console.log("please enter a town");
    } else {
      // call Open Weather API
      console.log(location);
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          location +
          "&units=metric&appid=" +
          apiKey
      )
        .then(response => response.json())
        .then(data => setWeather(data)) //works
        .then(console.log(weather))
        .catch(err => console.log(err));
    }

    //   fetch('https://swapi.dev/api/people/1/')
    // .then(response => response.json())
    // .then(data => console.log(data));
  };

  const displayWeather = () => {};

  return (
    <div>
      Get Weather Info for your Town
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">
          {" "}
          Enter your location:
          <input id="city" name="city" onChange={handleChange}></input>
        </label>
        <button>Get weather information</button>
      </form>
      <div>
        {weather ? (
          <div>
            <h3>{location}</h3>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Conditions: {weather.weather[0].description}</p>
            <p>Windspeeds: {weather.wind.speed}m/sec</p>
          </div>
        ) : (
          <p>No data to show</p>
        )}
      </div>
    </div>
  );
}
