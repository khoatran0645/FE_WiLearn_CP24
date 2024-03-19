import { useState } from 'react';
import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';

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
  'FullStack',
  'Web',
  'Mobile',
];

export default function SearchPage() {
  const [subject, setSubject] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={1.5}>
        <FormControl fullWidth>
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
        <Button variant="contained" fullWidth>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}