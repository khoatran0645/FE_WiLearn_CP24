import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  CardContent,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import AddDiscussion from "./AddDiscussion";
import Paginate from "./../../../components/Paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useState } from "react";
import dayjs from "dayjs";

export default function DiscussionList() {
  const { discussionList } = useSelector((state) => state.studyGroup);

  // console.log("discussionList", discussionList);
  // console.log("answerList", answerList);

  const options = ["Newest", "Oldest"];

  const [currentPage, setCurrentPage] = useState(1);
  const discussionsPerPage = 2;

  const totalPages = Math.ceil(discussionList.length / discussionsPerPage);
  const startIndex = (currentPage - 1) * discussionsPerPage;
  const endIndex = Math.min(
    startIndex + discussionsPerPage,
    discussionList.length
  );
  const currentDiscussions = discussionList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formats = [
    "background",
    "bold",
    "color",
    "font",
    "code",
    "italic",
    "link",
    "size",
    "strike",
    "script",
    "underline",
    "blockquote",
    "header",
    "indent",
    "list",
    "align",
    "direction",
    "code-block",
    "formula",
    // 'image'
    // 'video'
  ];

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} textAlign="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Discussions
        </Typography>
      </Grid>
      <AddDiscussion />
      <Grid item xs={12} md={8}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          defaultValue={"Newest"}
          sx={{ width: 150 }}
          getOptionLabel={(option) => option}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Sort by" />}
        /> */}
        {(!currentDiscussions || currentDiscussions.length == 0) && (
          <Typography align="center" variant="h5">
            No discussion yet
          </Typography>
        )}
        <List>
          {currentDiscussions.map((discussion) => (
            <ListItem key={discussion.id} mb={3}>
              <Card
                sx={{
                  width: "100%",
                  backgroundColor: "#f7f7f7",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {discussion.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {discussion.account.fullName} -{" "}
                    {dayjs(discussion.createAt).format("DD/MM/YYYY HH:MM")}
                  </Typography>
                  {/* <Typography variant="body1">{discussion.content}</Typography> */}

                  <ReactQuill
                    value={
                      discussion.content.length > 200
                        ? discussion.content.substring(0, 200) + "..."
                        : discussion.content
                    }
                    readOnly
                    theme={"bubble"}
                    formats={formats}
                  />

                  {/* <SeeMore discussionId={discussion.id} /> */}
                  <Link to={`./${discussion.id}`}>
                    <Button variant="outlined">See more</Button>
                  </Link>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        
      </Grid>
      <div
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            backgroundColor: "#fff",
            padding: "50px 0",
          }}
        >
          {totalPages > 1 && (
            <Grid item container justifyContent="center">
              <Paginate count={totalPages} onPageChange={handlePageChange} />
            </Grid>
          )}
        </div>
    </Grid>
  );
}
