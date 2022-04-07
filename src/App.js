import { useState } from 'react';

function App() {

  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForeCast] = useState('')

  const handleChange = (e) =>{
    setCity(e.target.value);
  }
  const handleSearch = (e) =>{
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4e77fbf9672f4409ba6184750220704&q=${city}&lang=pt`
    ).then((response) => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      setWeatherForeCast(data);
      console.log('data ===>', data)
    });
  };

  return (
    <div className='mt-5'>
      <main className='container justify-content-center'>
        <div className='jumbotron'>
          <h1 className='text-center'>Verifique agora a previsão de tempo da sua cidade!</h1>
          <p className="lead text-center">
              Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>
          <div className="row mb-4 justify-content-center">
            <div className="col-md-6">
              <input className="form-control" onChange={handleChange} value={city}/>
            </div>
          </div>

          <div className='text-center'>
            <button onClick={handleSearch} className="btn btn-primary btn-lg">
                Pesquisar
            </button>
          </div>

          {weatherForecast ? (
          <div>
            <div className='mt-4 d-flex'>
              <img src={weatherForecast.current.condition.icon} alt='ícone que representa o clima atual da aplicação'/>
            </div>

            <div>
              <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
              <p>
                Temperatura está {weatherForecast.current.temp_c}
              </p>
            </div>
      
          </div>
            ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
