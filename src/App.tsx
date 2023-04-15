import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {
  getLocation,
  getGridPointsByLatAndLong,
  getForecast,
} from './services/api';

import { IGridPoints, IResults, IForecast } from './interfaces';

import SearchComponent from './components/searchComponent';
import DailyViewComponent from './components/dailyViewComponent';
import DetailComponent from './components/detailComponent';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<IResults | null>(null);
  const [forecast, setForecast] = useState<IForecast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    performSearch();
  }, [searchTerm]);

  const performSearch = async () => {
    if(!searchTerm) return;
    try {
      setIsLoading(true);
      if (searchTerm.length > 3) {
        const result = await getLocation(searchTerm);
        setResults(result.data.result);
        await retrieveGridPoints();
        setIsLoading(false);
      }
    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const clearFunction = () => {
    setSearchTerm('');
    setResults(null);
    setForecast([]);
    setIsLoading(false);
    setError(null);
  }

  const retrieveGridPoints = async () => {
    try {
      setIsLoading(true);
      if (results && results.addressMatches.length > 0) {
        const { x, y } = results.addressMatches[0].coordinates;
        const gridPoints = await getGridPointsByLatAndLong(y, x);
        const { gridX, gridY } = gridPoints.data.properties;
        await watchForGridPointsChange(gridX, gridY);
        setIsLoading(false);
      };
    } catch (e: any) {
       setError(e.message);
      setIsLoading(false);
    }
  };

  const watchForGridPointsChange = async (gridX: number, gridY: number) => {
    try {
      setIsLoading(true);
      const forecastRes = await getForecast(gridX, gridY);
      setForecast(forecastRes.data.properties.periods);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSearchTerm(event.target.value);
  };

  return (
    <div className='App'>
      {error && (
        <div className='error-message'>
          <h2>{error}</h2>
        </div>
      )}
      <div className='main-container'>
        <div className='info-container'>
          <SearchComponent
            searchTerm={searchTerm}
            onChange={handleChange}
            onClear={clearFunction}
            results={results}
          />
          <p className='loading-text'>{isLoading && 'Loading...'}</p>

          {forecast && results?.addressMatches.length > 0 && (
            <DailyViewComponent weather={forecast[0]} />
          )}
        </div>
        <div className='details-container'>
          <DetailComponent forecast={forecast} isLoading={isLoading} />
        </div>
      </div>
      <div className='footer'>
        <p>This product was created by leonamquintao@gmail.com</p>
      </div>
    </div>
  );
}

export default App;
