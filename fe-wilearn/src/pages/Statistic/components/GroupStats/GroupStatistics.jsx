import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import HoursChart from "./HoursChart";
import DiscussionChart from "./DiscussionChart";
import GroupStatisticItem from "./GroupStatisticItem";

export default function GroupStatistics() {
  return (
    <Grid>
      <Grid paddingLeft={20}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Overview
        </Typography>
        <GroupStatisticItem />
      </Grid>
      <Grid paddingTop={4}>{/* <ChartMeeting /> */}</Grid>
      <Grid paddingTop={4}>{/* <HoursChart /> */}</Grid>
      <Grid paddingTop={4} paddingLeft={20}>
        {/* <DiscussionChart /> */}
      </Grid>
    </Grid>
  );
}
