import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import HoursChart from "./HoursChart";
import DiscussionChart from "./DiscussionChart";
import PersonalStatisticItem from './PersonalStatisticItem';

export default function PersonalStatistics() {
  return (
    <Grid>
      <Grid paddingLeft={20}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Your Statistics
        </Typography>
        <PersonalStatisticItem />
      </Grid>
      {/* <Grid paddingTop={4}>
        <ChartMeeting />
      </Grid>
      <Grid paddingTop={4}>
        {/* <HoursChart />
      </Grid>
      <Grid paddingTop={4} paddingLeft={20}>
        {/* <DiscussionChart />
      </Grid> */}
    </Grid>
  );
}
