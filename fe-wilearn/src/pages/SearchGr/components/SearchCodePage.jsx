import { useEffect, useState } from "react";
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
import ListGroup from "./ListGroup";
import { Form, useParams } from "react-router-dom";
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

export default function SearchCodePage() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const {code} = useParams()
  const [searchCode, setSearchCode] = useState(code);
  const dispatch = useDispatch();
  const {subjectLists} = useSelector(state=>state.studyGroup)
  // const subjectOpts = [selectAllSubsOpt, ...subjectLists]
  const subjectOpts = [ ...subjectLists]
  console.log("subjectOpts", subjectOpts)
  // const allGroups = [...groupNotJoin ]
  const { searchGroupss } = useSelector((state) => state.studyGroup);
  const [groups, setGroups] = useState(searchGroupss)

  useEffect(()=>{
    const filteredGroups = searchGroupss.filter(g=>groupContainsSelectedSubject(g.subjects))
    setGroups(filteredGroups);
  }, [selectedSubjects, searchGroupss])

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

  const handleSearchClick = async() => {
    const response = await dispatch(searchGroups(searchCode));

    if (response.type === searchGroups.fulfilled.type) {
      // setNewSearch(searchGroups);
    }
  };

  return (
    <Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            placeholder="Enter invitation code to search"
            variant="outlined"
            size="small"
            sx={{ width: "500px" }}
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            // onChange={onSearch}
          />
        </Grid>
        {/* <Form onSubmit={handleSearchClick}> */}
          <Grid item xs={12} sm={1.5}>
          </Grid>
          <Grid item xs={12} sm={1} paddingLeft={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearchClick}
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
          <ListGroup groups={groups} searchTerm={searchCode}/>
        </Grid>
      </Grid>
      {/* )} */}

    </Grid>
  );
}
