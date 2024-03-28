import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SeeMore() {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate("/groups/:id/discussionDetail");
  };
  return (
    <Grid>
        <Button size="small" variant="outlined" sx={{ mt: 2 }} onClick={handleSeeMoreClick}>See more</Button>
    </Grid>
  )
}
