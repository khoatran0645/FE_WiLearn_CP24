// import { useState } from 'react';

const Search = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleInputChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập từ khóa"
        style={{ width: '200px', height: '20px' }}
      />
      <button style={{ width: '60px', height: '26px' }}>Search</button>
    </div>
  );
};

export default Search;