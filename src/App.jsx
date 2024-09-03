import './App.css';

/*images*/
import searchIcon from './Assets/search.png'
import rainIcon from './Assets/rain.webp'
import sunIcon from './Assets/Sunlight.webp'
import cloudIcon from './Assets/cloud.png'
import snowIcon from './Assets/snow-1024.webp'
import humidity1 from './Assets/humditity.png'
import windIcon from './Assets/wind_5-512.webp'

import { useEffect, useState } from 'react';

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{

  return(
  <>
  <div className='image'>
    <img src={icon} alt="Image"/>
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
     <div>
      <span className='log'>longtitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidity1} alt="humidity" className='icon'/>
      <div className="data">
        <div className="humitity-percentage">{humidity}</div>
        <div className="text">humidity</div>
      </div>
    </div>
  
    <div className="element">
      <img src={windIcon} alt="wind" className='icon' />
      <div className="data">
        <div className="wind-percentage">{wind} km/h</div>
        <div className="text">speed</div>
      </div>
    </div>
  </div>
 
  </>
  )
}


function App() {
let apikey= "8ae6b0e2f350d683b540dc46ee5cedbe"

const [text,setText] = useState("chennai")

const [loading,setLoading] = useState(false);
const [cityNotFound,setCityNotFound] = useState(false);

  const [icon,setIcon]=useState(snowIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]= useState("chennai")
  const [country,setCountry] = useState("IN");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0);
  const [humidity,setHumidity] = useState(0);
  const [wind,setWind] = useState(0);
  const [error,setError] = useState(false);
  

  const wetherIconMap ={
    "01d":sunIcon,
    "01n":sunIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":snowIcon,
    "03n":snowIcon,
    "04d":snowIcon,
    "04n":snowIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":cloudIcon,
    "13n":cloudIcon,
  }

  

  const search=async () => {
    setLoading(true)
    
  
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=Metric`;

    try{
      let res = await fetch(url);
      let data= await res.json();
      
      if(data.cod ==="404"){
        console.log("city not found");
        setCityNotFound(true);
        setLoading(false);
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);

      const weatherIconCode=data.weather[0].icon
      setIcon(wetherIconMap[weatherIconCode]|| snowIcon);
      setCityNotFound(false);


    }catch(error){
      console.log("An error occurred:",error.message);
      setError("An error weather Data")

    }finally{
      setLoading(false);

    }
  }
  const HandleCity=(e) =>{
    setText(e.target.value)
  }
  const HandleKeyDown=(e)=>{
    if(e.key === "Enter"){
      search();
    }
  }
  
useEffect(function(){
  search();
},[]);
  
  return (
    <div className='container'>
      <div className='input-container'>
        <input type="text" name="" id="" className='cityInput' placeholder='searchcity'
        onChange={HandleCity} value={text} onKeyDown={HandleKeyDown}/>
        <div className='search-icon' onClick={()=>search()}>
          <img src={searchIcon} alt="" />
        </div>
      </div>

      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='loading'>{error}</div>}
      {cityNotFound &&<div className="city">city not found</div>}

     {!loading &&  !cityNotFound &&<WeatherDetails icon={icon} temp={temp} 
      city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}

      <p className="copyright">
        Designed by <span>Gopinath</span>
      </p>

      

      
    </div>
  );
}
export default App
