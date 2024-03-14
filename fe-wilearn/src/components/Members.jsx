import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { CardActionArea } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import InviteUser from "./InviteUser";
import UpdateGroup from "./UpdateGroup";
import PlanningButton from "../pages/Groups/PlanningButton";
import MeetingNowButton from "../pages/Meeting/MeetingNowButton";
import RequestJoin from "../pages/Groups/RequestJoin";
import JoinMeetingButton from "../pages/Meeting/JoinMeetingButton";
import StartMeetingButton from "../pages/Meeting/StartMeetingButton";
import UpdateMeetingButton from "../pages/Meeting/UpdateMeetingButton";
import UserMoreInfo from "./UserMoreInfo";
import HistoryMeeting from "../pages/Meeting/HistoryMeeting";

export default function MemberList() {
  const userList = [
    {
      id: 1,
      name: "Linh",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 2,
      name: "Khoi",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 3,
      name: "Duy",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 4,
      name: "Minh",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 5,
      name: "Minh",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 6,
      name: "Đức",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 7,
      name: "Phượng",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 8,
      name: "Tâm",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 9,
      name: "Trung",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 10,
      name: "Hậu",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 11,
      name: "Nga",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 12,
      name: "Tiên",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 13,
      name: "Mai",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 14,
      name: "Đào",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 15,
      name: "Piano",
      avartar: "",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
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
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
        sx={{ width: 100, height: 100, marginTop: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.name}
        </Typography>
      </CardContent>
      <CardActions>
        <UserMoreInfo fullname={user.name} email={user.email} phone={user.phone} />
      </CardActions>
    </Container>
  ));

  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/meeting");
  // };

  return (
    <Grid container spacing={0} direction={"row"}>
      <Grid xs={8}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Group: SWP490
        </Typography>
      </Grid>
      <Grid xs={4} sx={{ textAlign: "right", paddingRight: 10 }}>
        <UpdateGroup />
      </Grid>

      <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <RequestJoin />
          <InviteUser />
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
          <PlanningButton />
          <MeetingNowButton />
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
                  <JoinMeetingButton />
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="2"
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
                  <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                    <StartMeetingButton/>
                    <UpdateMeetingButton />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              key="3"
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
                  <Grid container justifyContent="center" sx={{ paddingTop: "1rem" }}>
                  <UpdateMeetingButton />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={11.5} paddingTop={3}>
        <HistoryMeeting/>
      </Grid>
    </Grid>
  );
}
