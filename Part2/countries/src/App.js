import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryName = ({country}) => {
  const [show, setShow] = useState(false)

  const handleButtonClick = () => {
    setShow(!show);
  }

  if(show){
    return(
      <>
      <h3>
        {country.name}&nbsp;
        <button onClick={handleButtonClick}>{show ? "hide" : "show"}</button>
      </h3>
      <SingleCountryDisplay key={country.name} country={country}/>
      </>
    )
  }
  else{
    return(
      <h3>
        {country.name}&nbsp;
        <button onClick={handleButtonClick}>{show ? "hide" : "show"}</button>
      </h3>
    )
  }
  
}

const Languages = ({languages}) => {
  return(
    languages.map(language => 
      <li key={language.name}>Name: {language.name}, Native-Name: {language.nativeName}</li>
    )
  )
}

const SingleCountryDisplay = ({country}) => {
  const [weather, setWeather] = useState([])
  const [weatherLoad, setWeatherLoad] = useState(true)
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`).then(response => {
    setWeather(response.data.current)
    setWeatherLoad(false)
    })
  }, [apiKey, country.capital])

  if(weatherLoad){
    return(
      <p>loading...</p>
    )
  }
  else{
    return(
      <div>
        <h1>
          {country.name}
        </h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Languages</h2>
        <ul>
          <Languages languages={country.languages}/>
        </ul>
        <img height='100px' width='150px' alt={country.name} src={country.flag} /> 
        <h2>Weather in {country.capital}</h2>
        <p><strong>Temperature: </strong>{weather.temperature} celcius</p>
        <img alt={country.capital} src={weather.weather_icons[0]}/>
        <p><strong>Weather Description: </strong>{weather.weather_descriptions[0]}</p>
        <p><strong>Wind: </strong>{weather.wind_speed} mph direction {weather.wind_dir}</p>
      </div>
    )
  }
}

const CountryList = ({countries, newCountry, loading}) => {
  const filteredCountry = () => {
    return countries.filter(country => 
      country.name.slice(0, newCountry.length).toLowerCase() === newCountry.toLowerCase())
  }

  if(loading){
    return(
      <p>loading...</p>
    )
  }
  else if (filteredCountry().length === 1){
    return(
      <SingleCountryDisplay key={filteredCountry()[0].name} country={filteredCountry()[0]}/>
    )
  }
  else if (filteredCountry().length > 10){
    return(
      <h2>Too many matches, specify another filter </h2>
    )
  }
  else if (filteredCountry().length <= 10){
    return(
      filteredCountry().map(country =>
        <CountryName key={country.name} country={country}/>
      )
    )
  }
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('Nepal')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
    setCountries(response.data)
    setLoading(false)
    })
  }, []);

  const handleCoutnryChange = (event) => {
    event.preventDefault()
    setNewCountry(event.target.value)
  }

  return(
    <div>
      find countries: <input value={newCountry} onChange={handleCoutnryChange}/>
      <CountryList countries={countries} newCountry={newCountry} loading={loading}/>
    </div>
  )
}

export default App;
