import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import Container from "@mui/material/Container";
export default function MemberList() {
  const userList = [
    { id: 1, name: "Linh", avartar: "" },
    { id: 2, name: "Khoi", avartar: "" },
    { id: 3, name: "Duy", avartar: "" },
    { id: 4, name: "Minh", avartar: "" },
    { id: 5, name: "Minh", avartar: "" },
    { id: 6, name: "Đức", avartar: "" },
    { id: 7, name: "Phượng", avartar: "" },
    { id: 8, name: "Tâm", avartar: "" },
    { id: 9, name: "Trung", avartar: "" },
    { id: 10, name: "Hậu", avartar: "" },
    { id: 11, name: "Nga", avartar: "" },
    { id: 12, name: "Tiên", avartar: "" },
    { id: 13, name: "Mai", avartar: "" },
    { id: 14, name: "Đào", avartar: "" },
    { id: 15, name: "Piano", avartar: "" },
  ];

  const memberList = userList.map((user) => (
    <Container
      key={user.id}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar
        alt={user.name}
        src="/fe-wilearn/src/assets/11276378.png"
        sx={{ width: 100, height: 100, marginTop: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">More</Button>
      </CardActions>
    </Container>
  ));

  return (
    <Grid container spacing={1} direction={"row"}>
      <Grid xs={8}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Group: SWP490
        </Typography>
      </Grid>
      <Grid xs={4} sx={{ textAlign: "right" }}>
        <Button variant="contained" size="large" endIcon={<WifiCalling3Icon />}>
          Study Together
        </Button>
      </Grid>

      <Grid>
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {memberList}
        </Card>
      </Grid>
    </Grid>
  );
}
