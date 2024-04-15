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
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function DiscussionList() {
  const { groupInfo } = useSelector((state) => state.studyGroup);
  const discussions = groupInfo ? groupInfo.discussions : [];
  // console.log("discussions", discussions);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {}, []);
  useEffect(() => {}, [discussions]);

  const options = ["Newest", "Oldest"];
  const handleSort = (event, newValue) => {
    // console.log("Selected value:", newValue);
    // switch (newValue) {
    //   case "Newest": {
    //     console.log("newest");
    //     const newestData = [...discussions].sort((a, b) => {
    //       dayjs(b.createdAt) - dayjs(a.createdAt);
    //     });
    //     console.log("newest data:", newestData);
    //     setSortedData(newestData);
    //     break;
    //   }
    //   case "Oldest": {
    //     console.log("oldest");
    //     const oldestData = [...discussions].sort(
    //       (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    //     );
    //     setSortedData(oldestData);
    //     break;
    //   }
    //   default: {
    //     setSortedData(discussions);
    //   }
    // }
  };

  // console.log("sortedData", sortedData);

  const [currentPage, setCurrentPage] = useState(1);
  const discussionsPerPage = 2;

  const totalPages = Math.ceil(discussions.length / discussionsPerPage);
  const startIndex = (currentPage - 1) * discussionsPerPage;
  const endIndex = Math.min(
    startIndex + discussionsPerPage,
    discussions.length
  );
  const currentDiscussions = discussions.slice(startIndex, endIndex);

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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={options}
          defaultValue={"Newest"}
          sx={{ width: 150 }}
          getOptionLabel={(option) => option}
          onChange={handleSort}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Sort by" />}
        />
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
                    {discussion.accountFullname} -{" "}
                    {dayjs(discussion.createAt).format("DD/MM/YYYY")}
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
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            paddingTop={5}
          >
            <Paginate count={totalPages} onPageChange={handlePageChange} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
