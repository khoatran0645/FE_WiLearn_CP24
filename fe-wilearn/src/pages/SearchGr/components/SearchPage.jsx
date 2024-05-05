import { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import ListGroupToJoin from "./ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchGroups } from "../../../app/reducer/studyGroupReducer";

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

export default function SearchPage() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { subjectLists } = useSelector((state) => state.studyGroup);
  const subjectOpts = [...subjectLists];
  const { searchedGroups } = useSelector((state) => state.studyGroup);
  const [groups, setGroups] = useState(searchedGroups);

  useEffect(() => {
    const filteredGroups = searchedGroups.filter((g) => groupContainsSelectedSubject(g.subjects));
    setGroups(filteredGroups);
  }, [selectedSubjects, searchedGroups]);

  function groupContainsSelectedSubject(groupSubjects) {
    if (selectedSubjects.length === 0) return true;
    return selectedSubjects.some((subject) => groupSubjects.includes(subject.name));
  }

  const handleSubjectsChange = (event) => {
    const { value } = event.target;
    if (value.includes("Select All")) {
      if (selectedSubjects.length === subjectOpts.length) {
        setSelectedSubjects([]);
      } else {
        setSelectedSubjects([...subjectOpts]);
      }
    } else {
      setSelectedSubjects(value);
    }
  };

  const handleSearchClick = async (searchTerm) => {
    const response = await dispatch(searchGroups(searchTerm));
    if (response.type === searchGroups.fulfilled.type) {
      // Search fulfilled
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={8} md={6}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={7} md={6}>
            <TextField
              placeholder="Type to search"
              variant="outlined"
              size="small"
              fullWidth
              value={searchTerm}
              onChange={async (e) => {
                setSearchTerm(e.target.value);
                handleSearchClick(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="subject-label">Subject</InputLabel>
              <Select
                labelId="subject-label"
                id="subject-select"
                multiple
                value={selectedSubjects}
                onChange={handleSubjectsChange}
                input={<OutlinedInput label="Subject" />}
                renderValue={(selected) => selected.map((sub) => sub.name).join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem key="Select All" value="Select All">
                  <Checkbox checked={selectedSubjects.length === subjectOpts.length} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {subjectOpts.map((sub) => (
                  <MenuItem key={sub.name} value={sub}>
                    <Checkbox checked={selectedSubjects.some((s) => s.id === sub.id)} />
                    <ListItemText primary={sub.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} md={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleSearchClick(searchTerm)}
              sx={{
                backgroundImage: "linear-gradient(to right, #7474BF 0%, #348AC7 51%, #7474BF 100%)",
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <ListGroupToJoin groups={groups} searchTerm={searchTerm} />
      </Grid>
    </Grid>
  );
}
