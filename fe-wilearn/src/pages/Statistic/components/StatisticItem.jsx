import { Box, Card, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function StatisticItem() {
  return (
    <Grid container direction="column" paddingTop={5}>
      <Grid item>
        <DatePicker label={'"month" and "year"'} views={['month', 'year']} />
      </Grid>
      <Grid container direction="row" paddingTop={4} spacing={2}>
        <Grid item>
          <Card sx={{ marginRight: 10, color: "white", padding: '20px', boxShadow: '0 4px 8px rgba(0, 128, 128, 0.2)', borderRadius: '8px', border: '2px solid #2374c0', backgroundColor: '#5466ae', width: '270px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <Typography variant="h6">Meeting Statistics</Typography>
           <Box>
            <Typography>Total Meetings: 17</Typography>
            <Typography>Attended Meetings: 12</Typography>
            <Typography>Absent Meetings: 5</Typography>
           </Box>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ marginRight: 10, color: "white", padding: '20px', boxShadow: '0 4px 8px rgba(0, 128, 128, 0.2)', borderRadius: '8px', border: '2px solid #2374c0', backgroundColor: '#5466ae', width: '270px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <Typography variant="h6">Discussion Statistics</Typography>
            <Typography>Total Discussion: 38</Typography>
            <Typography>Total Answer: 15</Typography>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
