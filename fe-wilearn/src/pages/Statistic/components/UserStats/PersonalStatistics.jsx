import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import HoursChart from "./HoursChart";
import DiscussionChart from "./DiscussionChart";
import PersonalStatisticItem from "./PersonalStatisticItem";

import { useDispatch, useSelector } from "react-redux";
import { getMoreUserStats } from "../../../../app/reducer/userReducer";

export default function PersonalStatistics() {
  const { userInfo, moreUserStats } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {

    userInfo && dispatch(getMoreUserStats(userInfo?.id));
  }, [userInfo]);
  // console.log("moreUserStats", moreUserStats);
  return (
    <Grid>
      <Grid paddingLeft={20}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Your Statistics
        </Typography>
        <PersonalStatisticItem />
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
