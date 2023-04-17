import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// jest.mock('../services/api', () => ({
// 	getLocation: jest.fn(),
// 	getGridPointsByLatAndLong: jest.fn(),
// 	getForecast: jest.fn(),
// }));

describe('App Component', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('renders App component without crashes', () => {
		const { getByTestId } = render(<App />);
		const appComponent = getByTestId('app-component');
		expect(appComponent).toBeInTheDocument();
	});
});
