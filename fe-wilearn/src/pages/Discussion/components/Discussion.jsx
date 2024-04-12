import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import AddDiscussion from "./AddDiscussion";
import SeeMore from "./SeeMore";
import Paginate from "./../../../components/Paginate";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useState } from 'react';

export default function DiscussionList() {
  const navigate = useNavigate();
  const { groupInfo } = useSelector((state) => state.studyGroup);

  const discussions = groupInfo ? groupInfo.discussions : [];
  // console.log("discussions", discussions);
  const [currentPage, setCurrentPage] = useState(1);
  const discussionsPerPage = 2;

  const totalPages = Math.ceil(discussions.length / discussionsPerPage);
  const startIndex = (currentPage - 1) * discussionsPerPage;
  const endIndex = Math.min(startIndex + discussionsPerPage, discussions.length);
  const currentDiscussions = discussions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSeeMoreClick = () => {
    // navigate(`/home/groups/:id/discussionDetail`);
    // navigate(`./${discussionId}`);
  };
  var formats = [
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
                    {discussion.accountFullname} - {discussion.dateTime}
                  </Typography>
                  {/* <Typography variant="body1">{discussion.content}</Typography> */}

                  <ReactQuill
                    value={discussion.content}
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
        {totalPages > 1 && (
          <Grid item container justifyContent="center" alignItems="center" paddingTop={5}>
            <Paginate count={totalPages} onPageChange={handlePageChange} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
