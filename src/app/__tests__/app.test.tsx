import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const results = {
    addressMatches: [
      {
        coordinates: {
          x: -73.985506,
          y: 40.748817,
        },
        geographies: [
          {
            adminFullName: 'New York, NY',
            latLng: {
              latitude: 40.748817,
              longitude: -73.985506,
            },
          },
        ],
      },
    ],
  };

	test('renders App component without crashes', () => {
		const { getByTestId } = render(<App />);
		const appComponent = getByTestId('app-component');
		expect(appComponent).toBeInTheDocument();
	});

	test('the "search input" should be present in the screen', async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId('search-input');
		expect(input).toBeInTheDocument();
  });

	test('renders SearchComponent when results state is not null', async () => {
    const { getByTestId, findByTestId } = render(<App />);
    const input = getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'New York' } });
    const searchComponent = await findByTestId('search-component');
    expect(searchComponent).toBeInTheDocument();
  });

	test('shows loading text while isLoading state is true', () => {
		const { getByTestId } = render(<App />);
		const loading = getByTestId('loading');
		expect(loading).toBeInTheDocument();
	});
  
});
