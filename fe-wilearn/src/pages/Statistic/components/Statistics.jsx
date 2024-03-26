import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import StatisticItem from "./StatisticItem";
import HoursChart from "./HoursChart";
import DiscussionChart from "./DiscussionChart";

export default function Statistics() {
  return (
    <Grid>
      <Grid paddingLeft={20}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Overview
        </Typography>
        <StatisticItem />
      </Grid>
      <Grid paddingTop={4}>
        <ChartMeeting />
      </Grid>
      <Grid paddingTop={4}>
        <HoursChart />
      </Grid>
      <Grid paddingTop={4} paddingLeft={20}>
        <DiscussionChart />
      </Grid>
    </Grid>
  );
}
