import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { CardActionArea } from "@mui/material";

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
      <Grid xs={4} sx={{ textAlign: "right", paddingRight: 10 }}>
        <Button variant="contained" size="medium">
          Update
        </Button>
      </Grid>

      <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <Button variant="outlined" size="small">
            Request to join
          </Button>
          <Button variant="contained" size="small">
            Invite new member
          </Button>
        </Stack>
      </Grid>
      <Grid xs={10}>
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

      <Grid xs={12}>
        <Typography variant="h4" textAlign={"left"}>
          Lessons
        </Typography>
      </Grid>

      <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <Button variant="outlined" size="small">
            Planning
          </Button>
          <Button variant="contained" size="small">
            Meeting now
          </Button>
        </Stack>
      </Grid>
      <Grid
        xs={10}
        container
        justifyContent={"flex-start"}
        sx={{ overflow: "auto" }}
      >
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
            <Card
              key="1"
              sx={{ maxWidth: 345, minWidth: 200, border: "3px solid green" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Can join now
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="1"
              sx={{ maxWidth: 345, minWidth: 200, border: "3px solid orange" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Can start now
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="1"
              sx={{ maxWidth: 345, minWidth: 200, border: "3px solid red" }}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: "left" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    Meeting name
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Content: on tap kiem tra Ly
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Expect: 29/02 10:34 - 11:19
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Happen: 29/02 10:49
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Status: Cannot start
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={12} paddingTop={3}>
        <Button variant="contained" fullWidth>
          Meeting history
        </Button>
      </Grid>
    </Grid>
  );
}
