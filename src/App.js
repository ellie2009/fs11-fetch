import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("befae7d1dc85012afaff2d6c76d7f598");

  const handleChange = e => {
    const input = e.target.value;
    setLocation(input);
    setWeather(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    setLoading(true);
    getWeather(location);
  };

  const getWeather = location => {
    // call Open Weather API
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&units=metric&appid=" +
        apiKey
    )
      .then(response => {
        if (response.status !== 200) {
          setError("Something went wrong. Please doublecheck your input");
        } else {
          return response.json();
        }
      })
      .then(data => {
        setWeather(data); // this is asynchronous, so if you console.log the weather right afterwards it will be null until the data has been updated
        setLoading(false);
      })
      .catch(err => console.log(err)); // this will only trigger if there is a problem with the internet connection, NOT if there is a problem with your request
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter your location:</label>
        <input
          id="city"
          name="city"
          value={location}
          onChange={handleChange}
        ></input>
        <button>Get weather</button>
        <button>Get forecast</button>
      </form>

      <div className="display">
        {error && <p>{error}</p>}
        {/* {error? <p>{error}</p> : ""} */}
        {loading && <img src="time-92897_1920abc.jpg" />}
        {/* {loading? <img src="time-92897_1920abc.jpg"/> :""} */}

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
