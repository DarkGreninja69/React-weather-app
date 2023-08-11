import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.weatherapi.com/v1/current.json?q=${location}&key=7ab97c2626254fa7bee202943232806`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
          {data.location ? <p className='bold'>{data.location.name}</p> : null}
          </div>
          <div className="temp">
            {data.current ? <h1>{data.current.temp_c.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.current ? <p>{data.current.condition.text}</p> : null}
            {data.current ? <img src={data.current.condition.icon} alt="Weather Icon" /> : null}
          </div>
        </div>

        {data.location !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.current ? <p className='bold'>{data.current.feelslike_c.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.current ? <p className='bold'>{data.current.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.current ? <p className='bold'>{data.current.wind_kph.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
