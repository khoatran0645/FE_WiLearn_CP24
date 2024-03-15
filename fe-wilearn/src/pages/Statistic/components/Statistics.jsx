import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import StatisticItem from "./StatisticItem";


export default function Statistics() {
    return (
      <Grid>
        <Grid paddingLeft={20}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>Statistics</Typography>
          <StatisticItem/>
        </Grid>
        <Grid paddingTop={4}>
          <ChartMeeting/>    
        </Grid>      
      </Grid>
    )
  }