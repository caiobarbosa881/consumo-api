import { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForeCast] = useState('');
  const [initialSpace, setInitialSpace] = useState('initial-space');
  const [temperatureBox, setTemperature] = useState('temperature-box mt-3');
  const [iconContainer, setIconContainer] = useState('icons-container mt-3');
  
  const handleChange = (e) => {
    setCity(e.target.value);
  }
  const handleSearch = () => {
    setInitialSpace('initial-space active-out');
    setIconContainer('icons-container mt-3 boxOut');
    setTemperature('temperature-box mt-3 boxOut');
    setTimeout(() => {
      setTemperature('temperature-box mt-3');
      setIconContainer('icons-container mt-3');
    }, 1000);

    setIconContainer('icons-container mt-3 boxOut');

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4e77fbf9672f4409ba6184750220704&q=${city}&lang=pt`
    ).then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      if (response.status === 400) {
        return console.log('O valor inserido no campo não foi encontrado');
      }
    })
      .then((data) => {
        setWeatherForeCast(data);
      }).catch(error =>(console.log(error)))
      
  };

  return (
    <div className='mt-5 main-container row'>
      <div className={initialSpace}></div>
      {weatherForecast ? (
        <div className='main-container-active'>

          <div className={temperatureBox}>
            <p>{weatherForecast.location.region}</p>
            <small className='temp-text '>
              {weatherForecast.current.temp_c + "°c"}
            </small>
            <img src={weatherForecast.current.condition.icon} className='weather-condition mb-4' alt='ícone que representa o clima atual da aplicação' />
            <p>{weatherForecast.current.condition.text}</p>
          </div>

          <div className={iconContainer}>

            <div className='current-icons'>
              <img src={require('./assets/images/uv.png')} className='weather-icons' alt='Medidor de temperatura em graus mais conhecido como Termômetro' />
              {weatherForecast.current.uv}
            </div>

            <div className='current-icons'>
              <img src={require('./assets/images/wind.png')} className='weather-icons' alt='imagem que representa o vento se movimentando' />
              {weatherForecast.current.wind_kph + "km/h"}
            </div>

            <div className='current-icons'>
              <img src={require('./assets/images/water.png')} className='weather-icons' alt='imagem que representa o vento se movimentando' />
              {weatherForecast.current.humidity + '%'}
            </div>

          </div>

        </div>
      ) : <div className='error-container mt-3'><h1>ERROR</h1><p>nenhum dado encontrado relacionado a sua busca, tente outro local.</p><div className='error404'></div></div> }

      <div className='search-container'>
        <input type="text" className="weather-input d-block mt-3" onChange={handleChange} placeholder="Insira sua cidade aqui" />
        <button onClick={handleSearch} className="d-block mt-3" id="button" type='button'>BUSCAR</button>

      </div>
      
    </div>

  );
}

export default App;