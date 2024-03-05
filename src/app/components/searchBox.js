import React from 'react';

const SearchBox = props => {
  return (
    <input
      type="text"
      className="form-control d-inline-block"
      name="searchText"
      placeholder={props.placeholder || 'Search text'}
      value={props.searchInput}
      onChange={props.handleSearchChange}
      style={{ width: 200 + 'px', marginRight: 10 + 'px' }}
    />
  );
};

export default SearchBox;
