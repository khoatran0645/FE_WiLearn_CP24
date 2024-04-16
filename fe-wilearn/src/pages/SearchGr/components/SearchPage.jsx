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
} from "@mui/material";
import ListGroup from "./ListGroup";
import { Form } from "react-router-dom";

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
  "Java",
  "React",
  "Python",
  ".Net",
  "Golang",
  "Kotlin",
  "Flutter",
  "FullStack",
  "Web",
  "Mobile",
  "C++",
  "C#",
];

export default function SearchPage() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const selectAllSubjectsOpt = {
    id: -1,
    name: "Select All"
  }
  const allGroups = [
    {
      name: "KTeam",
      introduction: "Join and start studying right away with the community!",
      subject: "Java",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjBxXC93bA22ghW67CX040WwL8PzLC0DcNOcvtXUL0LhrfywjCoRFsTdQqWRatvKwuzqZl63K-ax8LMP7nX0_S5ko9v-9_cu9OfaWciDWIQGN1fUa8iIEwXfPy9mNGrplOGdQjKb3NdYq9quxO6Rm1JRAf2bbZ4Il3BhvwZJf2MgMapZ5rl2mEq5FuluA/s1600/hinh%20nen%2012%20con%20giap%20phong%20cach%20it%20tuoi%20ti.jpg",
    },
    {
      name: "JsLand",
      introduction:
        "Discover new frontiers in web development with our JavaScript coding community",
      subject: "Javascript",
      img: "https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg",
    },
    {
      name: "HackMasters",
      introduction: "Innovative programming team specializing in Java and more.",
      subject: "Java, Python",
      img: "https://hoangphucphoto.com/wp-content/uploads/2024/02/IMG_9923.jpg",
    },
    {
      name: "CodeCrafters",
      introduction:
        "Explore the power of Go programming language with our dedicated Golang group",
      subject: "Golang",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLytpLCORdw7AZ4N1S8cEeeb4NdIpjuSwG9Q",
    },
    {
      name: "BitMinds",
      introduction:
        "Join our ReactJS community for cutting-edge web development discussions and projects!",
      subject: "Reactjs",
      img: "https://cdn.mienphitemplate.com/powerpoint_images/images/simple-blackboard-infographics/simple-blackboard-infographics/slide-21-extra.jpg",
    },
    {
      name: "ScriptSavants",
      introduction: "Join our Python coding group for fun and learning!",
      subject: "Python, Kotlin",
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "TechWizards",
      introduction:
        "Connect with fellow C++ and C enthusiasts in our dedicated coding community",
      subject: "C++, C#",
      img: "https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "CodeNinjas",
      introduction:
        "Embrace the future of mobile and web development with our Flutter and React community",
      subject: "Flutter, React",
      img: "https://hanoispiritofplace.com/wp-content/uploads/2018/01/bo-suu-tap-hinh-nen-cuc-chat-danh-cho-dan-4.jpg",
    },
    {
      name: "JsLand",
      introduction:
        "Discover new frontiers in web development with our JavaScript coding community",
      subject: "Javascript",
      img: "https://www.shutterstock.com/shutterstock/photos/1932042689/display_1500/stock-photo-businessman-using-mobile-smart-phone-business-global-internet-connection-application-technology-1932042689.jpg",
    },
    {
      name: "HackMasters",
      introduction: "Innovative programming team specializing in Java and more.",
      subject: "Java, Python",
      img: "https://hoangphucphoto.com/wp-content/uploads/2024/02/IMG_9923.jpg",
    },
    {
      name: "CodeCrafters",
      introduction:
        "Explore the power of Go programming language with our dedicated Golang group",
      subject: "Golang",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLytpLCORdw7AZ4N1S8cEeeb4NdIpjuSwG9Q",
    },
    {
      name: "BitMinds",
      introduction:
        "Join our ReactJS community for cutting-edge web development discussions and projects!",
      subject: "Reactjs",
      img: "https://cdn.mienphitemplate.com/powerpoint_images/images/simple-blackboard-infographics/simple-blackboard-infographics/slide-21-extra.jpg",
    },
    {
      name: "ScriptSavants",
      introduction: "Join our Python coding group for fun and learning!",
      subject: "Python, Kotlin",
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "TechWizards",
      introduction:
        "Connect with fellow C++ and C enthusiasts in our dedicated coding community",
      subject: "C++, C#",
      img: "https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "CodeNinjas",
      introduction:
        "Embrace the future of mobile and web development with our Flutter and React community",
      subject: "Flutter, React",
      img: "https://hanoispiritofplace.com/wp-content/uploads/2018/01/bo-suu-tap-hinh-nen-cuc-chat-danh-cho-dan-4.jpg",
    },
    {
      name: "BitMinds",
      introduction:
        "Join our ReactJS community for cutting-edge web development discussions and projects!",
      subject: "Reactjs",
      img: "https://cdn.mienphitemplate.com/powerpoint_images/images/simple-blackboard-infographics/simple-blackboard-infographics/slide-21-extra.jpg",
    },
    {
      name: "ScriptSavants",
      introduction: "Join our Python coding group for fun and learning!",
      subject: "Python, Kotlin",
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "TechWizards",
      introduction:
        "Connect with fellow C++ and C enthusiasts in our dedicated coding community",
      subject: "C++, C#",
      img: "https://product.bachkhoa-aptech.edu.vn:33/resources/upload/image/chia-se/noi-kho-cua-dan-it-nhung-dieu-chua-noi-01.jpg",
    },
    {
      name: "CodeNinjas",
      introduction:
        "Embrace the future of mobile and web development with our Flutter and React community",
      subject: "Flutter, React",
      img: "https://hanoispiritofplace.com/wp-content/uploads/2018/01/bo-suu-tap-hinh-nen-cuc-chat-danh-cho-dan-4.jpg",
    },
    ]
  const [groups, setGroups] = useState(allGroups)

  useEffect(()=>{
    const filteredGroups = allGroups.filter(g=>groupContainsSelectedSubject(g.subject))
    setGroups(filteredGroups);
  }, [selectedSubjects])

  function groupContainsSelectedSubject(groupSubjects) {
    // Iterate through each item in list2
    if (selectedSubjects.length==0) return true;
    for (let subject of selectedSubjects) {
        // Check if the item exists in list1
        if (groupSubjects.includes(subject)) {
            return true; // Found a matching item
        }
    }
    return false; // No matching item found
}

  const handleSubjectsChange = (event) => {
    const { value } = event.target;
    if (value.includes("Select All")) {
      if (selectedSubjects.length === names.length) {
        setSelectedSubjects([]);
      } else {
        setSelectedSubjects([...names]);
      }
    } else {
      setSelectedSubjects(value);
    }
  };

  const filteredSubjects = names.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchClick = () => {
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem key="Select All" value="Select All">
                  <Checkbox checked={selectedSubjects.length === names.length} />
                  <ListItemText primary="Select All" />
                </MenuItem>
                {filteredSubjects.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedSubjects.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <ListGroup groups={groups} />
        </Grid>
      </Grid>
      {/* )} */}

    </Grid>
  );
}
