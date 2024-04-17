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
import { Form, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchGroups } from "../../../app/reducer/studyGroupReducer";
import { searchGroupsCode } from "../../../app/reducer/studyGroupReducer/studyGroupActions";

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
  console.log("code", code)
  const [searchCode, setSearchCode] = useState(code);
  const dispatch = useDispatch();
  // const subjectOpts = [selectAllSubsOpt, ...subjectLists]
  // const allGroups = [...groupNotJoin ]
  const  {searchedCodeGroups}  = useSelector((state) => state.studyGroup);
  // const [groups, setGroups] = useState(searchGroupsCode)

  // useEffect(()=>{
  //   const filteredGroups = searchGroupsCode.filter(g=>groupContainsSelectedSubject(g.subjects))
  //   setGroups(filteredGroups);
  // }, [searchGroupsCode])


  const handleSearchClick = async() => {
    const response = await dispatch(searchGroupsCode(searchCode));

    if (response.type === searchGroups.fulfilled.type) {
    }
  };

  const searchCodeFunc = async()=>{
    const response = await dispatch(searchGroupsCode(searchCode));
  }
  useEffect(()=>{
    searchCodeFunc();
  },[searchCode])

  return (
    <Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            placeholder="Enter invitation code to search"
            variant="outlined"
            size="small"
            sx={{ width: "500px" }}
            // value={searchCode}
            defaultValue={searchCode}
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
          <ListGroup groups={searchedCodeGroups} searchTerm={searchCode}/>
        </Grid>
      </Grid>
      {/* )} */}

    </Grid>
  );
}
