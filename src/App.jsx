import { useState } from 'react';
import clear from "./assets/clear.png";
import snow from "./assets/snow.png";
import humidityicon from "./assets/humidityicon.png";
import windicon from "./assets/windicon.png";
import rain from "./assets/rain.png";
import dizzle from "./assets/dizzle.png"; // Fixed the spelling for drizzle
import cloud from "./assets/cloud.png";
import none from "./assets/none.png";


import './App.css';

const WeatherDetails = ({ icon, temp, city, country, latitude, longitude, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt={`${city} weather`} style={{ width: '150px', height: '150px' }} />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>

      <div className="coordinates">
        <div>
          <span className="lat">Latitude: </span>
          <span>{latitude}</span>
        </div>
        <div>
          <span className="log">Longitude: </span>
          <span>{longitude}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humidityicon} style={{ width: '50px', height: '50px' }} alt="humidity-icon" />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windicon} style={{ width: '50px', height: '50px' }} alt="wind-icon" />
          <div className="data">
            <div className="wind-percentage">{wind} km/hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const api_key = "1f5e24e50f9d63c35e774ca649cd2008";
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);

  const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setTemp(data.main.temp);
        setCity(data.name);
        setCountry(data.sys.country);
        setLatitude(data.coord.lat);
        setLongitude(data.coord.lon);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);

        // Update icon based on weather conditions
        const weather = data.weather[0].main.toLowerCase();
        if (weather === "clear") {
          setIcon(clear);
        } else if (weather === "snow") {
          setIcon(snow);
        } else if (weather === "rain") {
          setIcon(rain);
        } else if (weather === "dizzle") {
          setIcon(dizzle);
        } else if (weather === "clouds") {
          setIcon(cloud);
        } else {
          setIcon(clear); // Default icon if the weather type is unrecognized
        }

        // Clear the input field
        setText("");
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching the weather data: ", error);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input
            type="text"
            className='city-input'
            placeholder='Search city'
            value={text} // Bind the value to the text state
            onChange={handleCity}
          />
          <div className='search-icon' onClick={search}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          latitude={latitude}
          longitude={longitude}
          humidity={humidity}
          wind={wind}
        />
      </div>
    </>
  );
}

export default App;
