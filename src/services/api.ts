import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const geoClient = axios.create({
  baseURL:'https://geocoding.geo.census.gov/geocoder/locations',
  headers: headers,
});

const weatherClient = axios.create({
  baseURL: 'https://api.weather.gov',
  headers: headers,
});

export const getLocation = async (parameters: string) => {
  const address = parameters.replace(/\s+/g, '+').replace(/,/g, '%2C');
  const URL = `/onelineaddress?address=${address}&benchmark=2020&format=json`;
  const response = await geoClient.get(URL);
  return response;
};

export const getGridPointsByLatAndLong = async (lat: number, long: number) => {
  const URL = `/points/${lat},${long}`;
  const response = await weatherClient.get(URL);
  return response;
};

export const getForecast = async (gridX: number, gridY: number) => {
  const OFFICE = 'TOP';
  // const URL = `/gridpoints/${OFFICE}/${gridX},${gridY}/forecast`;
  const URL = '/gridpoints/TOP/31,80/forecast';
  const response = await weatherClient.get(URL);
  return response;
}

// https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Washington%2C+DC+20233&benchmark=2020&format=json
// https://api.weather.gov/points/38.846,-76.9274
// https://api.weather.gov/gridpoints/TOP/31,80/forecast

// https://www.weather.gov/documentation/services-web-api