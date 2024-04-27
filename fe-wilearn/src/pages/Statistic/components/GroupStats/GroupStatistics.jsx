import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ChartMeeting from "./ChartMeeting";
import HoursChart from "./HoursChart";
import DiscussionChart from "./DiscussionChart";
import GroupStatisticItem from "./GroupStatisticItem";

import { useDispatch, useSelector } from "react-redux";
import { getMoreGroupStats } from "../../../../app/reducer/studyGroupReducer";

export default function GroupStatistics() {
  const { userInfo } = useSelector((state) => state.user);
  const { groupInfo, moreGroupStats } = useSelector(
    (state) => state.studyGroup
  );
  const dispatch = useDispatch();
  // console.log("groupInfo", groupInfo);
  // console.log("moreGroupStats", moreGroupStats);
  // console.log("userInfo", userInfo);

  useEffect(() => {
    if (groupInfo && userInfo) {
      const data = {
        groupId: groupInfo.id,
        userId: userInfo.id,
      };
      dispatch(getMoreGroupStats(data));
    }
  }, [groupInfo, userInfo]);
  // console.log("moreGroupStats", moreGroupStats);
  return (
    <Grid>
      <Grid paddingLeft={20}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Overview
        </Typography>
        <GroupStatisticItem />
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
