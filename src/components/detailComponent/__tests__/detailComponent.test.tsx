import { getByTestId, render, waitFor } from '@testing-library/react';

import DetailComponent from '../';

import { IForecast } from '../../../interfaces';

import { mocked_forecast } from '../../../../__mocks__/mocked_forecast';

describe('Detail Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  test('renders DetailComponent without crashes', () => {
    const isLoading = false;
    const forecast: IForecast[] = [];
    const { getByTestId } = render(
      <DetailComponent forecast={forecast} isLoading={isLoading} />,
    );
    const appComponent = getByTestId('detail-component');
    expect(appComponent).toBeInTheDocument();
  });

  it('renders the message to search an address when forecast prop is an empty array', () => {
    const isLoading = false;
    const forecast: IForecast[] = [];
    const { getByText } = render(
      <DetailComponent isLoading={isLoading} forecast={forecast} />,
    );
    expect(getByText(/search the address/i)).toBeInTheDocument();
  });

  it('renders the loading text when isLoading prop is true', async () => {
    const isLoading = true;
    const forecast: IForecast[] = [];
    const { getByTestId } = render(
      <DetailComponent isLoading={isLoading} forecast={forecast} />
    );
    const loading = await getByTestId('detail-loading');
    expect(loading).toBeInTheDocument();
  });

  it('renders a ForecastItem for each forecast in the list', async () => {
    const isLoading = false;
    const forecast: any[] = mocked_forecast;
    const { getAllByTestId, getByTestId } = render(
      <DetailComponent isLoading={isLoading} forecast={forecast} />,
    );

    waitFor(() => {
      const horizontalScroll = getByTestId('horizontal-scroll');
      expect(horizontalScroll).toBeInTheDocument();
    });
  
    expect(getAllByTestId(/forecast-item-/i)).toHaveLength(6);
  });
});

