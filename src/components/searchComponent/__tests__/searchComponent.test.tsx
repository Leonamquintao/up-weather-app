import { fireEvent, render, waitFor } from '@testing-library/react';
import SearchComponent from '../';

describe('Search Component', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const onChangeMock = jest.fn();
  const clearFunctionMock = jest.fn();

  const searchTermMock = 'New York, NY';

  const results = {
    addressMatches: [
      {
        address: '123 Main St, New York, NY',
        latitude: 40.712776,
        longitude: -74.005974,
      },
      {
        address: '456 Broadway, New York, NY',
        latitude: 40.724694,
        longitude: -74.001781,
      },
    ],
  };

  const RenderedComponent = 
    <SearchComponent
      searchTerm={searchTermMock}
      onChange={onChangeMock}
      onClear={clearFunctionMock}
      results={results}
    />;

  test('renders SearchComponent without crashes', async () => {
    const { getByTestId } = render(RenderedComponent);
    const searchComponent = (await getByTestId(
      'search-input',
    )) as HTMLInputElement;
    expect(searchComponent).toBeInTheDocument();
  });

  test('calls onClear when X button is clicked', () => {
    const { getByTestId } = render(RenderedComponent);
    const clearButton = getByTestId('clear-button');
    waitFor(() => {
      fireEvent.click(clearButton);
    });
    expect(clearFunctionMock).toHaveBeenCalledTimes(1);
  });

  test('displays result count when results are available', () => {
    const results = {
      addressMatches: [
        {
          address: '123 Main St, New York, NY',
          latitude: 40.712776,
          longitude: -74.005974,
        },
        {
          address: '456 Broadway, New York, NY',
          latitude: 40.724694,
          longitude: -74.001781,
        },
      ],
    };
    const { getByText } = render(RenderedComponent);
    const resultCount = getByText(/address Matches:/i);
    expect(resultCount).toHaveTextContent(`address Matches: ${results.addressMatches.length}`);
  });
});

