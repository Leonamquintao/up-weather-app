import React from 'react';
import './styles.css';

import sun from '../../assets/sun.png';
import rainyDay from '../../assets/rainy-day.png';
import cloud from '../../assets/raining.png';
import { IForecast } from '../../interfaces';

interface DailyViewComponentProps {
  weather: IForecast;
}

const DailyViewComponent: React.FC<DailyViewComponentProps> = ({ weather }) => {
  const temperatureTransform = (temperature: number) => {
    const celsius = ((temperature - 32) * 5) / 9;
    return `${Math.trunc(celsius)} ºC`;
  };

  const handleIconRender = () => {
    if (
      weather?.detailedForecast.toLocaleLowerCase().includes('clear')
    ) {
      return cloud;
    }
    if (
      weather?.detailedForecast
        .toLocaleLowerCase()
        .includes('thunderstorms')
    ) {
      return rainyDay;
    }

    return sun;
  }

  return (
    <div className='daily-info' data-testid="daily-view">
      <div className='weather-row'>
        <div className='weather-icon-container'>
          <img
            className='weather-img'
            src={handleIconRender()}
            alt='weather-img'
          />
        </div>
        <div className='weather-info'>
          <h2>
            {weather?.temperature} º{weather?.temperatureUnit}
          </h2>

          <h5>{temperatureTransform(weather?.temperature)}</h5>
        </div>
      </div>

      <div className='info-details'>
        <p className='weather-name'>{weather?.name}</p>
        <p className='wind-speed'>wind Speed: {weather?.windSpeed}</p>
        <p className='default-info'>{weather?.shortForecast}</p>
        <p className='default-info'>{weather?.detailedForecast}</p>

        <div className='web-icon-container'>
          <img className='web-icon' src={weather?.icon} alt='web-icon' />
        </div>
      </div>
    </div>
  );
};

export default DailyViewComponent;
