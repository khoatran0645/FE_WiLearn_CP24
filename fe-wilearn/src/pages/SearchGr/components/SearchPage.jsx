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
  Typography,
} from "@mui/material";
import ListGroupToJoin from "./ListGroup";
import { Form } from "react-router-dom";
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
  const {subjectLists} = useSelector(state=>state.studyGroup)
  // const subjectOpts = [selectAllSubsOpt, ...subjectLists]
  const subjectOpts = [ ...subjectLists]
  // const allGroups = [...groupNotJoin ]
  const { searchedGroups } = useSelector((state) => state.studyGroup);
  // const [searchedGroups, setAllGroups] = useState([])
  const [groups, setGroups] = useState(searchedGroups)

  // useEffect(()=>{
  //   setGroups(filteredGroups);
  // }, [searchedGroups])

  useEffect(()=>{
    const filteredGroups = searchedGroups.filter(g=>groupContainsSelectedSubject(g.subjects))
    setGroups(filteredGroups);
  }, [selectedSubjects, searchedGroups])

  function groupContainsSelectedSubject(groupSubjects) {
    // Iterate through each item in list2
    if (selectedSubjects.length==0) return true;
    for (let subject of selectedSubjects) {
        // Check if the item exists in list1
        if (groupSubjects.includes(subject.name)) {
            return true; // Found a matching item
        }
    }
    return false; // No matching item found
}

  const handleSubjectsChange = (event) => {
    const { value } = event.target;
    console.log("handleSubjectsChange value", value)
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

  // const filteredSubjects = subjectOpts.filter((name) =>
  //   name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleSearchClick = async(searchTerm) => {
    // const searchTerm = searchRef.current.value;
    // console.log("searchTerm",searchTerm)
    // setSearchTerm(searchTerm);
    const response = await dispatch(searchGroups(searchTerm));

    if (response.type === searchGroups.fulfilled.type) {
      // setNewSearch(searchGroups);
    }
  };

  return (
    <Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            placeholder="Type to search"
            variant="outlined"
            size="small"
            sx={{ width: "500px" }}
            value={searchTerm}
            onChange={async(e) => {
              await setSearchTerm(e.target.value)
              await handleSearchClick(e.target.value);
            }}
            // onChange={onSearch}
          />
        </Grid>
        {/* <Form onSubmit={handleSearchClick}> */}
          <Grid item xs={12} sm={1.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-multiple-checkbox-label">Subject</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedSubjects}
                onChange={handleSubjectsChange}
                input={<OutlinedInput label="Subject" />}
                renderValue={(selected) => selected.map(sub=>sub.name).join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem key="Select All" value="Select All">
                  <Checkbox checked={selectedSubjects.length === subjectOpts.length} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {subjectOpts.map((sub) => (
                  <MenuItem key={sub.name} value={sub}>
                    <Checkbox checked={selectedSubjects.some(s=>s.id==sub.id)} />
                    <ListItemText primary={sub.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={1} paddingLeft={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={()=>handleSearchClick(searchTerm)}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #7474BF 0%, #348AC7 51%, #7474BF 100%)",
              }}
            >
              Search
            </Button>
          </Grid>
        {/* </Form> */}
      </Grid>
      {/* {showListGroup && ( */}
      
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <ListGroupToJoin groups={groups} searchTerm={searchTerm}/>
        </Grid>
      </Grid>
      {/* )} */}

    </Grid>
  );
}
