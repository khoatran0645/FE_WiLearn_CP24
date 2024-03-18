import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Paper from "@mui/material/Paper";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
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

  const handleFileChange = (event) => {
    event.target.files?.length &&
      setUploadedFile(Array.from(event.target.files));
  };

  const handleUploadNewFile = () => {
    // Gọi hàm để reset trạng thái đã upload (nếu cần)
    // setUploadedFile(null);
  };

  const listFile = [
    { name: "file1.pdf" },
    { name: "file2.pdf" },
    { name: "file3.pdf" },
    { name: "file4.pdf" },
    { name: "file5.pdf" },
    { name: "file6.pdf" },
    { name: "file7.pdf" },
    { name: "file8.pdf" },
    { name: "file9.pdf" },
    { name: "file10.pdf" },
    { name: "file11.pdf" },
  ];

  const listFiles = listFile.map((file) => (
    <Paper elevation={3} key={file.name}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={file.name} secondary="alternate content" />
        <ListItemIcon>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      </ListItem>
    </Paper>
  ));

  return (
    <Grid>
      <Grid item xs={6}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "left" }}
        >
          Study Docs
        </Typography>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="baseline"
        padding={2}
      >
        <Grid item xs={6}>
          <Grid xs={12}>
            <Typography variant="h6">List of files</Typography>
          </Grid>

          <Grid xs={10}>
            <Paper style={{ maxHeight: "50vh", overflow: "auto" }}>
              <List>{listFiles}</List>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Button
            component="label"
            variant="contained"
            size="small"
            startIcon={<CloudUploadIcon />}
            onClick={handleUploadNewFile}
          >
            Share File
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </Button>

          <Grid item xs={12}>
            <Typography variant="h6">
              Uploaded File: {uploadedFile.name}
            </Typography>
            <DocViewer
              documents={uploadedFile.map((file) => ({
                uri: window.URL.createObjectURL(file),
                fileName: file.name,
              }))}
              pluginRenderers={DocViewerRenderers}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
