import { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { addDiscussion } from "../../../app/reducer/studyGroupReducer/studyGroupActions";

export default function AddDiscussion() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { groupInfo } = useSelector((state) => state.studyGroup);

  // console.log("userInfo", userInfo);
  // console.log("groupInfo", groupInfo);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {
    if (topic.trim().length === 0 || content.trim().length === 0) {
      toast.error("Please fill all the fields.");
    } else {
      const data = JSON.parse(JSON.stringify({
        "userId": userInfo.id,
        "groupId": groupInfo.id,
        "Question": topic,
        "Content": content,
        "File": "",
      }));
      dispatch(addDiscussion(data));
      handleClose();
    }
  };

  return (
    <Grid>
      <Button
        onClick={handleOpen}
        style={{
          textAlign: "center",
          fontSize: "14px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginLeft: "900px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        + Add Discussion
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add Discussion</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="topic"
            label="Enter topic"
            type="text"
            fullWidth
            value={topic}
            onChange={handleTopicChange}
          />
          <ReactQuill
            style={{ height: "300px" }}
            value={content}
            onChange={handleContentChange}
            theme="snow"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
