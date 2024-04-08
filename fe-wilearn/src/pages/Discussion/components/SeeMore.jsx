import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SeeMore({ discussionId }) {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    // navigate(`/home/groups/:id/discussionDetail`);
    navigate(`./${discussionId}`,{ state: { id: discussionId } });
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
