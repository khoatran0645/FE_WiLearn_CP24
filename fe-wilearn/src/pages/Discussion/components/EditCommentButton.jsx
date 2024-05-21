import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  updateAnswer,
  getAnswerByDiscussionId,
} from "../../../app/reducer/studyGroupReducer/studyGroupActions";

export default function EditCommentButton(props) {
  const [open, setOpen] = useState(false);
  const { loading, error, answerList } = useSelector(
    (state) => state.studyGroup
  );
  console.log("answerList", answerList);
  const dispatch = useDispatch();
  const { discussionId } = useParams();

  // useEffect(() => {
  //   dispatch(getAnswerByDiscussionId(discussionId));
  // }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const content = formJson.content;

    const data = {
      content: content,
      answerId: props.answerId,
      fileId: "",
    };

    console.log(data);
    dispatch(updateAnswer(data)).then(() => {
      dispatch(getAnswerByDiscussionId(discussionId));
    });
    if (!error && !loading) {
      toast.success("Update answer successfully");
      
    } else {
      toast.error("Something went wrong when update answer");
    }
    handleClose();
  };
  return (
    <>
      <Tooltip title="Edit comment">
        <IconButton size="small">
          <EditIcon fontSize="inherit" onClick={handleClickOpen} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          //   onSubmit: (event) => {
          //     event.preventDefault();
          //     const formData = new FormData(event.currentTarget);
          //     const formJson = Object.fromEntries(formData.entries());
          //     const reason = formJson.reason;
          //     console.log(reason);
          //     handleClose();
          //   },
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Edit comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
