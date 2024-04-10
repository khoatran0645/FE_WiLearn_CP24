import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SeeMore({ discussionId }) {
  const navigate = useNavigate();

  const { groupInfo } = useSelector((state) => state.studyGroup);
  console.log(groupInfo)

  const handleSeeMoreClick = () => {
    // navigate(`/home/groups/:id/discussionDetail`);
    navigate(`./${discussionId}`);
    console.log("groupinfo", discussionId);
    // console.log("discussionId", discussionId);
  };
  return (
    <Grid>
      <Button
        size="small"
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={handleSeeMoreClick}
      >
        See more
      </Button>
    </Grid>
  );
}
