import React from 'react';
import { IForecast } from '../../interfaces';
import HorizontalScroll from 'react-scroll-horizontal';
import './styles.css';

import sun from '../../assets/sun.png';
import rainyDay from '../../assets/rainy-day.png';
import cloud from '../../assets/raining.png';
import humidity from '../../assets/humidity.png'

interface DetailComponentProps {
  forecast: IForecast[];
  isLoading: boolean;
}

interface ForecastItemProps {
  item: IForecast;
  index: number;
}

const DetailComponent: React.FC<DetailComponentProps> = ({ forecast, isLoading = false }) => {
  console.log(JSON.stringify(forecast, null, 2));
  const temperatureTransform = (temperature: number) => {
    const celsius = ((temperature - 32) * 5) / 9;
    return `${Math.trunc(celsius)} ºC`;
  };

  const handleIconRender = (detailedForecast: string) => {
    if (detailedForecast.toLocaleLowerCase().includes('clear')) {
      return cloud;
    }
    if (
      detailedForecast
        .toLocaleLowerCase()
        .includes('thunderstorms')
    ) {
      return rainyDay;
    }

    return sun;
  };

  const ForecastItem: React.FC<ForecastItemProps> = ({ item, index }) => {
    return (
      <div
        className="weather-item"
        data-testid={`forecast-item-${index}`}
      >
        <p className="weather-item-name">{item.name.slice(0, 3)}</p>
        <div className="weather-item-icon-container">
          <img
            className="weather-item-img"
            src={handleIconRender(item.detailedForecast)}
            alt="weather-img"
          />
        </div>
        <div className="weather-item-info">
          <h2>
            {item.temperature} º{item.temperatureUnit}
          </h2>
          <h5>{temperatureTransform(item.temperature)}</h5>
        </div>
        <div className="info-item-details">
          <p className="wind-item-speed">wind Speed: {item.windSpeed}</p>
        </div>

        <div className="air-container">
          <img className="air-humidity" src={humidity} alt="humidity-img" />
          <span>{item.relativeHumidity.value}</span>
        </div>

        <div className="item-detailedForecast">
          <p className="item-detailedForecast-text">{item.detailedForecast}</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="detail-container" data-testid="detail-component">
      <p className="detail-loading-text" data-testid="detail-loading">{isLoading && 'Loading...'}</p>
      {forecast.length === 0 ? (
        <p>Search the address to get the weather!</p>
      ) : (
        <HorizontalScroll data-testid="horizontal-scroll">
          {forecast.slice(1).map((item, index) => {
            if (!item.isDaytime) return;
            return <ForecastItem item={item} index={index} key={index}/>;
          })}
        </HorizontalScroll>
      )}
    </div>
  );
};

export default DetailComponent;