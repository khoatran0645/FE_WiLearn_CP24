import { Button, Grid } from "@mui/material";


export default function JoinMeetingButton() {
  return (
    <Grid container justifyContent="center" sx={{paddingTop:'1rem'}}>
      <Button variant="contained" size="small" sx={{backgroundColor:'#258f3b'}}>
        Join now
      </Button>
    </Grid>
  )
}
