import { useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getGroupStats } from "../../../../app/reducer/studyGroupReducer/studyGroupActions";

export default function GroupStatisticItem() {
  const dispatch = useDispatch();
  const { groupStats, groupInfo } = useSelector((state) => state.studyGroup);

  // console.log("groupStats", groupStats);
  // console.log("groupInfo", groupInfo);

  useEffect(() => {
    groupInfo ? handleTimeCHange(dayjs()) : null;
  }, [groupInfo]);

  const handleTimeCHange = (timeData) => {
    const data = {
      groupId: groupInfo.id,
      time: dayjs(timeData).format("YYYY-MM"),
    };
    // console.log("data", data);
    dispatch(getGroupStats(data));
    // console.log(statsData);
  };

  return (
    <Grid container direction="column" paddingTop={5}>
      <Grid item>
        <DatePicker
          disableFuture
          label={'"month" and "year"'}
          views={["month", "year"]}
          defaultValue={dayjs()}
          closeOnSelect
          onAccept={handleTimeCHange}
        />
      </Grid>
      <Grid container direction="row" paddingTop={4} spacing={2}>
        <Grid item>
          <Card
            sx={{
              marginRight: 10,
              color: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 128, 128, 0.2)",
              borderRadius: "8px",
              border: "2px solid #2374c0",
              backgroundColor: "#5466ae",
              width: "270px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Number Of Meetings</Typography>
            <Box>
              <Typography>
                Total Meetings: {groupStats ? groupStats.totalMeetingsCount : 0}
              </Typography>
              <Typography>
                Attended Meetings:{" "}
                {groupStats ? groupStats.atendedMeetingsCount : 0}
              </Typography>
              <Typography>
                Absent Meetings:{" "}
                {groupStats ? groupStats.missedMeetingsCount : 0}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              marginRight: 10,
              color: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 128, 128, 0.2)",
              borderRadius: "8px",
              border: "2px solid #2374c0",
              backgroundColor: "#5466ae",
              width: "270px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Meeting Hours Statistics</Typography>
            <Typography>
              Total meeting hours: {groupStats ? groupStats.totalMeetingTme : 0}
            </Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              marginRight: 10,
              color: "white",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 128, 128, 0.2)",
              borderRadius: "8px",
              border: "2px solid #2374c0",
              backgroundColor: "#5466ae",
              width: "270px",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Discussion Statistics</Typography>
            <Typography>
              Total Discussion:{" "}
              {groupStats ? groupStats.totalDiscussionsCount : 0}
            </Typography>
            <Typography>
              Total Answer:{" "}
              {groupStats ? groupStats.totalAnswerDiscussionsCount : 0}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
