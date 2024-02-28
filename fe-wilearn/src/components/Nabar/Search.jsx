import { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch && onSearch(searchTerm);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <input
        type="text"
        placeholder="Nhập từ khóa"
        style={{ 
          width: '250px',
          height: '30px',
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
          border: '1px solid #ccc',
        }}
        onChange={handleInputChange}
      />
      <button 
        style={{
          width: '80px',
          height: '40px',
          borderRadius: '5px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
