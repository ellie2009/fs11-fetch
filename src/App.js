import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("befae7d1dc85012afaff2d6c76d7f598");
  const [choice, setChoice] = useState("");

  const handleChange = e => {
    const input = e.target.value;
    setLocation(input);
    setWeather(null);
  };

  const handleClick = event => {
    setWeather(null);
    setChoice(event.target.id);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    setError("");
    getWeather(location);
  };

  const getWeather = location => {
    // call Open Weather API
    fetch(
      `http://api.openweathermap.org/data/2.5/${choice}?q=${location}&units=metric&appid=${apiKey}`
    )
      .then(response => {
        if (response.status !== 200) {
          setError("Something went wrong. Please doublecheck your input.");
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
        <button id="weather" onClick={event => handleClick(event)}>
          Current weather
        </button>
        <button id="forecast" onClick={event => handleClick(event)}>
          5-day forecast
        </button>
      </form>

      <div className="display">
        {error && <p>{error}</p>} {/* {error? <p>{error}</p> : ""} */}
        {loading && <img src="time-92897_1920abc.jpg" />}{" "}
        {/* {loading? <img src="time-92897_1920abc.jpg"/> :""} */}
        {weather ? (
          choice === "weather" ? (
            <div>
              <h3>{location}</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Conditions: {weather.weather[0].description}</p>
              <p>Windspeeds: {weather.wind.speed}m/sec</p>
            </div>
          ) : (
            <div>
              Forecast for {location}
              <p>Day: {weather.list[0].dt_txt}</p>
              <p>Temperature: {weather.list[0].main.temp}°C</p>
            </div>
          )
        ) : (
          <p>No data to show.</p>
        )}
      </div>
    </div>
  );
}
