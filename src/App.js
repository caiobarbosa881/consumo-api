import { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForeCast] = useState('');
  const [background, setBackground] = useState('mt-5 main-container row background')

  const handleChange = (e) =>{
    setCity(e.target.value);
  }
  const handleSearch = () =>{
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4e77fbf9672f4409ba6184750220704&q=${city}&lang=pt`
    ).then((response) => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForeCast(data);
      console.log('data ===>', data);
      if(data.current.temp_c > 20){
      setBackground('mt-5 main-container row yellow');
      } else{
        setBackground('mt-5 main-container row background blue');
      } 
    });
  };

  return (
    <div className={background}>
      {weatherForecast ? (
          <div className='mt-5 row text-center'>
            <div className='col'>
              <img src={require('./assets/images/temperaturec.png')} className='weather-icons' alt='Medidor de temperatura em graus mais conhecido como Termômetro'/>
              <small>
                {weatherForecast.current.temp_c + "°c"}
              </small>
            </div>
             
            <div className='col'>
              <img src={require('./assets/images/wind.png')} className='weather-icons' alt='imagem que representa o vento se movimentando'/>
                <small>
                  {weatherForecast.current.wind_kph + "km/h"}
                </small>
            </div>

            <div className='col'>
            <img src={require('./assets/images/water.png')} className='weather-icons' alt='imagem que representa o vento se movimentando'/>
              <small>
                {weatherForecast.current.humidity + '%'}
              </small>
            </div>
            </div>
            ) : <div className='empty-space'></div>}

      {weatherForecast ? (<img src={weatherForecast.current.condition.icon} alt='ícone que representa o clima atual da aplicação'/>
) : null}


      <div className="input-group mb-3">
              <input type="text" className="form-control" onChange={handleChange} placeholder="Insira sua cidade aqui" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
              <div className="input-group-append">
                <button onClick={handleSearch} className=" bg-success text-white" type="button">Encontrar</button>
              </div>
            </div>
    </div>
  );
}

export default App;