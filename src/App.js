import { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForeCast] = useState('');
  const [background, setBackground] = useState('mt-5 main-container');
  const [initialSpace, setInitialSpace] = useState('initial-space');
  const [temperatureBox, setTemperature] = useState('temperature-box mt-3');
  const [iconContainer, setIconContainer] = useState('icons-container mt-3')


  const handleChange = (e) =>{
    setCity(e.target.value);
  }
  const handleSearch = () =>{
    setInitialSpace('initial-space active-out');
    setIconContainer('icons-container mt-3 boxOut');
    setTemperature('temperature-box mt-3 boxOut');
    setTimeout(() => {
      setTemperature('temperature-box mt-3');
      setIconContainer('icons-container mt-3')
    }, 1000);

    setIconContainer('icons-container mt-3 boxOut');
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4e77fbf9672f4409ba6184750220704&q=${city}&lang=pt`
    ).then((response) => {
      if(response.status === 200){
        return response.json()
      }
      if(response.status === 400){
        return console.log('esse valor não foi encontrado');
      }
    })
    .then((data) => {
      setWeatherForeCast(data);
     
      console.log('data ===>', data);
      if(data.current.temp_c > 20){
      setBackground('mt-5 main-container row yellow');
      } else {
        setBackground('mt-5 main-container row blue');
      }
    });
  };

  return (
    <div className={background}>        
    <div className={initialSpace}></div>
      {weatherForecast ? (
          <div className='main-container-active'>

            <div className={temperatureBox}>
              <p>{weatherForecast.location.region}</p>
                <small className='temp-text '>
                  {weatherForecast.current.temp_c + "°c"}
                </small>
                <img src={weatherForecast.current.condition.icon} className='weather-condition mb-4' alt='ícone que representa o clima atual da aplicação'/>
              <p>{weatherForecast.current.condition.text}</p>        
            </div>
          
            <div className={iconContainer}>

              <div className='current-icons'>
                <img src={require('./assets/images/temperaturec.png')} className='weather-icons' alt='Medidor de temperatura em graus mais conhecido como Termômetro'/>
                {weatherForecast.current.temp_c + "°c"}
              </div>
              
              <div className='current-icons'>
                <img src={require('./assets/images/wind.png')} className='weather-icons' alt='imagem que representa o vento se movimentando'/>
                {weatherForecast.current.wind_kph + "km/h"}
              </div>

              <div className='current-icons'>
              <img src={require('./assets/images/water.png')} className='weather-icons' alt='imagem que representa o vento se movimentando'/>
                {weatherForecast.current.humidity + '%'}
              </div>

            </div>

          </div>
            ) :  null}
            
      <div className='search-container'>
              <input type="text" className="weather-input d-block mt-4" onChange={handleChange} placeholder="Insira sua cidade aqui"/>
              <button onClick={handleSearch} className="text-white search-button d-block mt-3" type="button">Buscar</button>
      </div>
    
    </div>
  );
}

export default App;