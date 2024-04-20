import { useEffect, useState } from "react";
import {
  Typography,
  TextareaAutosize,
  Button,
  Grid,
  Avatar,
  Box,
  IconButton,
} from "@mui/material";
import CommentList from "./CommentList";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { addAnswer } from "../../../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import {
  getAnswerByDiscussionId,
  getDiscussionById,
} from "../../../app/reducer/studyGroupReducer/studyGroupActions";

export default function DiscussionDetail() {
  const { discussionDetail, loading, error } = useSelector(
    (state) => state.studyGroup
  );
  const { userInfo } = useSelector((state) => state.user);
  const [replyText, setReplyText] = useState("");
  dayjs.extend(customParseFormat);
  const dispatch = useDispatch();
  const { discussionId } = useParams();

  useEffect(() => {
    dispatch(getAnswerByDiscussionId(discussionId));
    dispatch(getDiscussionById(discussionId));
  }, [discussionId]);

  if (loading) {
    return <Loading />; // Render loading indicator
  }

  if (!discussionDetail) {
    return <div>No data available</div>; // Handle case when data is null
  }

  // console.log("discussionDetail", discussionDetail);
  // console.log("discussionId", discussionId);
  // console.log("error", error);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    // console.log(`Reply submitted: ${replyText}`);
    const data = {
      userId: userInfo.id,
      discussionId: discussionId,
      content: replyText.trim(),
      file: "",
    };
    // console.log("data", data);
    dispatch(addAnswer(data))
      .then(() => {
        // Fetch updated comments after adding a new comment
        dispatch(getAnswerByDiscussionId(discussionId));
      })
      .catch((error) => {
        // Handle error if necessary
        console.error("Error adding answer:", error);
        // Display error message to the user
        toast.error("Failed to add answer. Please try again.");
      });
    setReplyText("");
  };

  return (
    <Grid>
      <Grid
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          margin: "20px auto 0",
        }}
      >
        <Box
          sx={{
            background: "#f8f8f8",
            padding: "20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Typography
              variant="h6"
              style={{
                color: "#333",
                marginRight: "10px",
                textAlign: "center",
              }}
            >
              {discussionDetail?.question}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={discussionDetail?.account?.fullName}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2mXZyjeEgVKZ4yOV5SS2dL5UC10y0RRCew&usqp=CAU"
              src={discussionDetail.account.ImagePath}
              sx={{ marginRight: "10px" }}
            />

            <Typography
              variant="body1"
              style={{ fontSize: "16px", color: "#888", margin: "5px 0" }}
            >
              {discussionDetail?.account?.fullName}
            </Typography>
            <IconButton>
              <FlagCircleIcon />
            </IconButton>
          </Grid>
          <Typography
            variant="body1"
            style={{ fontSize: "16px", color: "#888", margin: "5px 0" }}
          >
            {/* March 17, 2024 10:00 AM */}
            {dayjs(discussionDetail?.createAt).format("DD/MM/YYYY HH:mm")}
          </Typography>
        </Box>
        <Box sx={{ padding: "20px" }}>
          <ReactQuill
            value={discussionDetail?.content}
            readOnly={true}
            theme={"bubble"}
          />
        </Box>
      </Grid>
      <Typography
        variant="h5"
        style={{
          fontSize: "20px",
          marginBottom: "10px",
          marginTop: "30px",
          textAlign: "left",
          marginLeft: "300px",
          fontStyle: "italic",
        }}
      >
        Answer
      </Typography>
      <Grid
        sx={{
          maxWidth: "600px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "300px",
        }}
      >
        <TextareaAutosize
          value={replyText}
          onChange={handleReplyChange}
          style={{
            width: "100%",
            minHeight: "80px",
            borderRadius: "5px",
            padding: "10px",
          }}
          placeholder="Type your reply here..."
        />
        <Button
          onClick={handleReplySubmit}
          variant="contained"
          size="small"
          {...(replyText.trim() === "" ? { disabled: true } : {})}
          style={{
            marginTop: "8px",
          }}
        >
          Submit
        </Button>
      </Grid>
      <CommentList />
    </Grid>
  );
}
