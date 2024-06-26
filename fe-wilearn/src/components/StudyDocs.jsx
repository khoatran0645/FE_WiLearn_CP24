import { useState } from "react";
import {
  Grid,
  Typography,
  styled,
  List,
  ListItem,
  ListItemAvatar,
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

import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  uploadFile,
  checkFile,
} from "../app/reducer/studyGroupReducer/studyGroupActions";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import ReportIconButton from "./ReportIconButton";
import ImageIcon from "@mui/icons-material/Image";

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
  const [initTab, setInitTab] = useState("1");
  const dispatch = useDispatch();

  const { groupInfo, listFile, loading, error } = useSelector(
    (state) => state.studyGroup
  );
  const { userInfo } = useSelector((state) => state.user);
  // console.log("groupInfo", groupInfo.id);
  // console.log("userInfo", userInfo.id);

  const approvedList = listFile?.filter((doc) => doc.approved && doc.isActive);
  const pendingList = listFile?.filter((doc) => !doc.approved && doc.isActive);
  console.log("approvedList", approvedList);
  console.log("pendingList", pendingList);

  const handleFileChange = (event) => {
    // console.log("file", event.target.files[0]);
    if (event.target.files[0].type == undefined) {
      return;
    } else {
      const fileType = event.target.files[0].type.toLowerCase();
      // console.log("fileType", fileType);
      // const validFileTypes = ["application/pdf", "image/jpeg", "image/png"];
      const validFileTypes = [];
      if (validFileTypes.includes(fileType)) {
        toast.error("Wrong format.");
        toast.info("Only pdf, jpeg, png file is accepted");
      } else {
        const data = {
          userId: userInfo.id,
          groupId: groupInfo.id,
          file: event.target.files[0],
        };
        // console.log("file2", event.target.files[0]);
        // setUploadedFile(event.target.files[0]);
        dispatch(uploadFile(data));
        // console.log("res", res);
        // console.log(loading);
        // console.log(error);
        // Check if upload was successful
        if (loading) {
          toast.loading("Uploading...");
        }
        if (loading === false && error === null) {
          // console.log("Upload fulfilled");
          toast.success("File uploaded successfully.");
          toast.info("Please wait for approval");
          // console.log("listFile", listFile); // Log the result
          // setTimeout(() => {
          //   location.reload();
          // }, 3000);
        } else {
          // console.error("Upload failed:", error); // Log the reason for failure
          toast.error("File upload failed.");
        }
        // console.log("uploadedFile", uploadedFile);
      }
    }
  };

  const handleDenyFile = (id) => {
    console.log("handleCheckFile", id);
    const data = {
      fileId: id,
      groupId: groupInfo.id,
      checkFile: false,
    };
    const res = dispatch(checkFile(data));
    if (error != null) {
      toast.error(error);
    } else {
      toast.promise("File deny.");
    }
    console.log("handleDenyFile", res);
  };
  const handleApproveFile = (id) => {
    console.log("handleCheckFile", id);
    const data = {
      fileId: id,
      groupId: groupInfo.id,
      checkFile: true,
    };
    const res = dispatch(checkFile(data));
    if (error != null) {
      toast.error(error);
    } else {
      toast.info("File approved.");
    }
    console.log("handleApproveFile", res);
  };

  const { groupId } = useParams();
  let leadGroups = [];
  if (userInfo) {
    leadGroups = userInfo.leadGroups ? userInfo.leadGroups : [];
  }
  const isLead = leadGroups.some((g) => g.id == parseInt(groupId));

  const handleChange = (event, newValue) => {
    setInitTab(newValue);
  };

  const handleViewfile = (httpLink) => {
    console.log(
      "handleViewfile",
      decodeURIComponent(httpLink.match(/_(.*?)\?/)[1]).substring(
        decodeURIComponent(httpLink.match(/_(.*?)\?/)[1]).lastIndexOf(".") + 1
      )
    );
    window.open(httpLink, "_blank");
  };

  const showApprovedList = approvedList.map((file) => (
    <Paper elevation={0} key={file.id}>
      <ListItem
        secondaryAction={<ReportIconButton type={"file"} fileId={file.id} />}
      >
        <ListItemButton divider onClick={() => handleViewfile(file.httpLink)}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: '#F1FAFF' }}>
              {decodeURIComponent(file.httpLink.match(/_(.*?)\?/)[1]).substring(
                decodeURIComponent(
                  file.httpLink.match(/_(.*?)\?/)[1]
                ).lastIndexOf(".") + 1
              ) === "pdf" ? (
                <PictureAsPdfIcon color="primary" />
              ) : (
                <ImageIcon color="primary" />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={decodeURIComponent(file.httpLink.match(/_(.*?)\?/)[1])}
            // secondary={file.id}
          />

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
    <Paper elevation={0} key={file.id}>
      <ListItem
        secondaryAction={
          <Stack direction={"row"} paddingRight={5}>
            <IconButton
              aria-label="deny"
              color="error"
              onClick={() => {
                handleDenyFile(file.id);
              }}
            >
              <BlockIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="accept"
              color="success"
              onClick={() => {
                handleApproveFile(file.id);
              }}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
          </Stack>
        }
      >
        <ListItemButton divider onClick={() => handleViewfile(file.httpLink)}>
          <ListItemAvatar>
            {/* <Avatar style={{ backgroundColor: '#FFF5EA' }}> */}
            <Avatar>
              {decodeURIComponent(file.httpLink.match(/_(.*?)\?/)[1]).substring(
                decodeURIComponent(
                  file.httpLink.match(/_(.*?)\?/)[1]
                ).lastIndexOf(".") + 1
              ) === "pdf" ? (
                <PictureAsPdfIcon background color="warning" />
              ) : (
                <ImageIcon color="warning" />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={decodeURIComponent(file.httpLink.match(/_(.*?)\?/)[1])}
            // secondary={file.id}
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  ));

  return (
    <>
      {loading && <Loading />}
      {listFile && (
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

          <Grid container justifyContent="center" alignItems="center" xs={4}>
            <Grid item textAlign="center">
              <Button component="label" variant="contained">
                Share File
                <VisuallyHiddenInput
                  type="file"
                  // accept="application/pdf, image/jpeg, image/png"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Button>
              <Typography variant="body2" color="text.secondary" paddingTop={2}>
                * All file types are accepted
              </Typography>
            </Grid>
          </Grid>

          <Grid xs={8}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={initTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Approved file" value="1" />
                    {isLead && <Tab label="Pending file" value="2" />}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Paper
                    style={{
                      maxHeight: "70vh",
                      minHeight: "70vh",
                      overflow: "auto",
                    }}
                  >
                    {(!showApprovedList || showApprovedList.length == 0) && (
                      <Typography align="center">No file yet</Typography>
                    )}
                    <List overflow="auto">{showApprovedList}</List>
                  </Paper>
                </TabPanel>
                <TabPanel value="2">
                  <Paper
                    style={{
                      minHeight: "70vh",
                      maxHeight: "70vh",
                      overflow: "auto",
                    }}
                  >
                    {(!showcheckList || showcheckList.length == 0) && (
                      <Typography align="center">
                        No pending file yet
                      </Typography>
                    )}

                    <List overflow="auto">{showcheckList}</List>
                  </Paper>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
