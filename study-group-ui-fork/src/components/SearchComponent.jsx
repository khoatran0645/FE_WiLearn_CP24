import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, InputAdornment, styled, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TextFieldStyled = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px'
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '1px'
  }
});

const SearchComponent = (props) => {
  const { placeholder, onSearch, fullWidth } = props;
  const [searchInput, setSearchInput] = useState('');

  return (
    <Box sx={{ mb: '22px' }}>
      <TextFieldStyled
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        fullWidth={fullWidth}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Tooltip arrow title="Tìm kiếm" placement="top">
                <SearchIcon onClick={() => onSearch(searchInput)} sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </InputAdornment>
          )
        }}
      />
    </Box>
  );
};

SearchComponent.propTypes = {
  placeholder: PropTypes.string,
  fullWidth: PropTypes.bool,
  onSearch: PropTypes.func.isRequired
};

export default SearchComponent;
