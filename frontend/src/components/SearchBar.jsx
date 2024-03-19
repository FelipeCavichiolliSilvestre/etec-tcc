import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { useState, useEffect } from 'react';

function SearchBar({ onChange, delay, ...props }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, delay ?? 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  function clear() {
    setInputValue('');
    onChange('');
  }

  return (
    <TextField
      fullWidth
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {inputValue !== '' && (
              <IconButton onClick={clear}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default SearchBar;
