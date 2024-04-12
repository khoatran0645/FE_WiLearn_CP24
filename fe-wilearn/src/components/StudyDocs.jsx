import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  styled,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
  IconButton,
  Paper,
  Box,
  Tab,
  Button,
  Stack,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

import { useDispatch, useSelector } from "react-redux";
import { getDocumentListByGroup } from "../app/reducer/studyGroupReducer/studyGroupActions";

import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function StudyDocs() {
  const [uploadedFile, setUploadedFile] = useState([]);
  const dispatch = useDispatch();

  const { groupInfo, listFile } = useSelector((state) => state.studyGroup);
  // console.log("groupInfo", groupInfo);
  // console.log("listFile", listFile);

  const approvedList = listFile?.filter((doc) => doc.approved == true);
  const pendingList = listFile?.filter((doc) => doc.approved == false);
  // console.log("pendingList", pendingList);

  // console.log("documentList docs", documentList);

  useEffect(() => {
    // const response = dispatch(getDocumentListByGroup(groupInfo.id));
    // console.log("response", response);
  }, []);

  const handleFileChange = (event) => {
    console.log("handleFileChange", event.target.files.length);
    if (event.target.files == undefined || event.target.files.length == 0) {
      console.log("handleFileChange", uploadedFile);
      return;
    }
    const fileType = event.target.files[0].type.toLowerCase();
    const validFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    // event.target.files?.length && setUploadedFile(event.target.files[0]);
    if (!validFileTypes.includes(fileType)) {
      toast.success("Wrong format");
    } else {
      setUploadedFile(event.target.files[0]);
      console.log("handleFileChange", uploadedFile);
      
    }
  };

  const handleUploadNewFile = () => {
    // Gọi hàm để reset trạng thái đã upload (nếu cần)
    // setUploadedFile(null);
  };

  const [value, setValue] = useState("1");

  const isLeader = true;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewfile = (httpLink) => {
    // console.log("handleViewfile", httpLink);
    window.open(httpLink, "_blank");
  };

  const showApprovedList = pendingList.map((file) => (
    <Paper elevation={0} key={file.id}>
      <ListItem>
        <ListItemButton divider onClick={() => handleViewfile(file.httpLink)}>
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={file.id} secondary={file.httpLink} />

          {/* <ListItemIcon>
            <IconButton
              aria-label="deny"
              color="error"
              onClick={() => {
                console.log("deny");
              }}
            >
              <BlockIcon fontSize="large" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton
              aria-label="accept"
              color="success"
              onClick={() => {
                console.log("accept");
              }}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
          </ListItemIcon> */}
        </ListItemButton>
      </ListItem>
    </Paper>
  ));

  const showcheckList = pendingList.map((file) => (
    <Paper elevation={0} key={file.name}>
      <ListItem
        secondaryAction={
          <Stack direction={"row"} paddingRight={5}>
            <IconButton
              aria-label="deny"
              color="error"
              onClick={() => {
                console.log("deny");
              }}
            >
              <BlockIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="accept"
              color="success"
              onClick={() => {
                console.log("accept");
              }}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
          </Stack>
        }
      >
        <ListItemButton divider onClick={() => console.log("view")}>
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={file.name} secondary="alternate content" />
        </ListItemButton>
      </ListItem>
    </Paper>
  ));

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Study Documents
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Approved file" value="1" />
                {isLeader && <Tab label="Pending file" value="2" />}
              </TabList>
            </Box>
            <TabPanel value="1">
              <Paper style={{ maxHeight: "70vh", overflow: "auto" }}>
                <List overflow="auto">{showApprovedList}</List>
              </Paper>
            </TabPanel>
            <TabPanel value="2">
              <Paper style={{ maxHeight: "70vh", overflow: "auto" }}>
                <List overflow="auto">{showcheckList}</List>
              </Paper>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      <Grid sx={{ marginLeft: "400px" }}>
        <Button
          component="label"
          variant="contained"
          // startIcon={<CloudUploadIcon />}
          onClick={handleUploadNewFile}
        >
          Share File
          <VisuallyHiddenInput
            type="file"
            accept="application/pdf, image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Grid>
    </Grid>
  );
}
