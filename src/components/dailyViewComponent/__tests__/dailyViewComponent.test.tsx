import { render } from '@testing-library/react';
import DailyViewComponent from '../';

describe('Daily View Component', () => {

  // beforeEach(() => {
  //   jest.resetAllMocks();
  // });

  const forecast = {
    number: 1,
    name: 'This Afternoon',
    startTime: '2023-04-17T12:00:00-05:00',
    endTime: '2023-04-17T18:00:00-05:00',
    isDaytime: true,
    temperature: 71,
    temperatureUnit: 'F',
    temperatureTrend: 'null',
    probabilityOfPrecipitation: {
      unitCode: 'wmoUnit:percent',
      value: 0,
    },
    dewpoint: {
      unitCode: 'wmoUnit:degC',
      value: 1.1111111111111112,
    },
    relativeHumidity: {
      unitCode: 'wmoUnit:percent',
      value: 33,
    },
    windSpeed: '10 mph',
    windDirection: 'S',
    icon: 'https://api.weather.gov/icons/land/day/skc?size=medium',
    shortForecast: 'Sunny',
    detailedForecast: 'Sunny, with a high near 71. South wind around 10 mph.',
  };

  const RenderComponent = (
    <DailyViewComponent weather={forecast} />
  );

  test('renders DailyViewComponent without crashes', () => {
    const { getByTestId } = render(RenderComponent);
    const appComponent = getByTestId('daily-view');
    expect(appComponent).toBeInTheDocument();
  });

});


