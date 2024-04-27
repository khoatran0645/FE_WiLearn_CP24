import { useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { getPersonalStatistics } from "../../../../app/reducer/userReducer/userActions";


export default function PersonalStatisticItem() {
  const dispatch = useDispatch();
  const { statsData, userInfo } = useSelector((state) => state.user);

  // console.log(statsData);

  useEffect(() => {
    // Call your function with the default value when the component loads
    userInfo ? handleTimeCHange(dayjs()) : null;
    // handleTimeCHange(dayjs());
  }, [userInfo]);

  const handleTimeCHange = (timeData) => {
    const data = {
      userId: userInfo.id,
      time: dayjs(timeData).format("YYYY-MM"),
    };
    // console.log("data", data);
    dispatch(getPersonalStatistics(data));
    // console.log(statsData);
  };

  return (
    <Grid container direction="column" paddingTop={5}>
      <Grid item>
        <DatePicker
          disableFuture
          label={'"month" and "year"'}
          views={["month", "year"]}
          // defaultValue={dayjs()}
          closeOnSelect
          defaultValue={dayjs()}
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
                Total Meetings: {statsData ? statsData.totalMeetingsCount : 0}
              </Typography>
              <Typography>
                Attended Meetings:{" "}
                {statsData ? statsData.atendedMeetingsCount : 0}
              </Typography>
              <Typography>
                Absent Meetings: {statsData ? statsData.missedMeetingsCount : 0}
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
              Total meeting hours: {statsData ? statsData.totalMeetingTme : 0}
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
              {statsData ? statsData.totalDiscussionsCount : 0}
            </Typography>
            <Typography>
              Total Answer:{" "}
              {statsData ? statsData.totalAnswerDiscussionsCount : 0}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
