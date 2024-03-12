import React, { useState, useEffect } from 'react';
import './index.css'; // Make sure this path is correct

function Guess() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null); 

  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=895284fb2d2c50a520ea537456963d9c`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        setWeather(data)
      } catch (error) {
        console.error('Error fetching data:', error);
     
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery (e.target.value)} />
         
        </div>
        {weather && (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°f
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Guess;
