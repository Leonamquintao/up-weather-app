import React from 'react';
import './styles.css';

interface SearchComponentProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  results: any;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  onChange,
  onClear,
  results,
}) => {
  return (
    <div className="container" data-testid="search-component">
      <div className="search">
        <span className="form-element">
          <i className="fa fa-search" />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for places..."
            onChange={onChange}
            data-testid="search-input"
          />
          <i
            className="fa fa-times-circle"
            data-testid="clear-button"
            onClick={() => onClear()}
          />
        </span>

        {results && searchTerm.length > 3 && (
          <div className="search-count">
            <p>address Matches: {results.addressMatches.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;