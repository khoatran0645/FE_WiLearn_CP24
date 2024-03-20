import { useState } from 'react';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import ListGroup from './ListGroup';
import Paginate from './../../../components/Paginate';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Java',
  'React',
  'Python',
  '.Net',
  'Golang',
  'Kotlin',
  'Flutter',
  'FullStack',
  'Web',
  'Mobile',
];

export default function SearchPage() {
  const [subject, setSubject] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showListGroup, setShowListGroup] = useState(false); 
  const [page, setPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    // Tải dữ liệu mới từ API hoặc thực hiện các thao tác khác tùy thuộc vào trang hiện tại.
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.includes('Select All')) {
      if (subject.length === names.length) {
        setSubject([]);
      } else {
        setSubject([...names]);
      }
    } else {
      setSubject(value);
    }
  };

  const filteredSubjects = names.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchClick = () => {
    setShowListGroup(true);
  };

  return (
    <Grid>
      <Grid container justifyContent="center" alignItems="center">      
        <Grid item xs={12} sm={4}>
        <TextField
        placeholder="Type for search"
        variant="outlined"
        size="small"
        sx={{ width: '510px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        </Grid>
        <Grid item xs={12} sm={1.5}>
          <FormControl fullWidth size='small'>
            <InputLabel id="demo-multiple-checkbox-label">Subject</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={subject}
              onChange={handleChange}
              input={<OutlinedInput label="Subject" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              <MenuItem key="Select All" value="Select All">
                <Checkbox checked={subject.length === names.length} />
                <ListItemText primary="Select All" />
              </MenuItem>
              {filteredSubjects.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={subject.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1} paddingLeft={1}>
          <Button variant="contained" fullWidth onClick={handleSearchClick} sx={{backgroundImage: 'linear-gradient(to right, #7474BF 0%, #348AC7 51%, #7474BF 100%)'}}>
            Search
          </Button>
        </Grid>       
      </Grid>
      {showListGroup && (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8}>
            <ListGroup/>
          </Grid>
        </Grid>
      )}
      {showListGroup && (
        <Grid container justifyContent="center" alignItems="center">
            <Paginate count={10} page={page} onPageChange={handlePageChange} />
        </Grid>
      )}
    </Grid>
  );
}