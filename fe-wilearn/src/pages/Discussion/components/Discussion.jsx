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

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Newest");
  const discussionsPerPage = 2;

  // Sorting logic
  const sortedDiscussionList = [...discussionList].sort((a, b) => {
    if (sortOrder === "Newest") {
      return new Date(b.createAt) - new Date(a.createAt);
    } else {
      return new Date(a.createAt) - new Date(b.createAt);
    }
  });

  const totalPages = Math.ceil(
    sortedDiscussionList.length / discussionsPerPage
  );
  const startIndex = (currentPage - 1) * discussionsPerPage;
  const endIndex = Math.min(
    startIndex + discussionsPerPage,
    sortedDiscussionList.length
  );
  const currentDiscussions = sortedDiscussionList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event, value) => {
    setSortOrder(value);
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
      <Grid sx={{marginLeft:"0px"}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={["Newest", "Oldest"]}
          value={sortOrder}
          onChange={handleSortChange}
          sx={{ width: 150, mb: 2 }}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Sort by" />}
        />
      </Grid>
      <AddDiscussion />
      <Grid item xs={12} md={8}>
        {(!currentDiscussions || currentDiscussions.length === 0) && (
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
          padding: "10px 0",
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
