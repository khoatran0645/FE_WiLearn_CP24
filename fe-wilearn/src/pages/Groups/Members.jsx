import {
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Container,
  Stack,
  Box,
} from "@mui/material";

import InviteUser from "../../components/InviteUser";
// import UpdateGroup from "./UpdateGroup";
import RequestJoin from "./RequestJoin";
import UserMoreInfo from "./UserMoreInfo";
import Paginate from "../../components/Paginate";
import { useSelector } from "react-redux";

export default function MemberList() {
  const {groupInfo} = useSelector(state=>state.studyGroup)
  const userList = groupInfo ? groupInfo.members : [
    {
      id: 1,
      fullName: "Linh",
      avatar: "https://livewiredemos.com/images/avatar.png",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 2,
      fullName: "Khoi",
      avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 3,
      fullName: "Duy",
      avatar: "https://i.pinimg.com/474x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 4,
      fullName: "Minh",
      avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 5,
      fullName: "Minh",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGQ8dQ-LMiMmTEyBijR0FzpQHC7tH6qTE2g&usqp=CAU",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 6,
      fullName: "Đức",
      avatar: "https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 7,
      fullName: "Phượng",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDZQHtkC_0XJu5cyn28YqkueoSBnqH4hgx7Q&usqp=CAU",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 8,
      fullName: "Tâm",
      avatar: "https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 9,
      fullName: "Trung",
      avatar: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 10,
      fullName: "Hậu",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 11,
      fullName: "Nga",
      avatar: "https://storage.needpix.com/rsynced_images/user-307993_1280.png",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    {
      id: 12,
      fullName: "Tiên",
      avatar: "https://toppng.com/uploads/preview/user-pro-avatar-scalable-vector-graphics-icon-woman-icon-11553526869tcdfa31pvo.png",
      email: "XXXXXXXXXXXXXX",
      phone: "0987654321",
    },
    // {
    //   id: 13,
    //   fullName: "Mai",
    //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4oz0KdCvHj_hvY5exy-qFr06SPFjyA4ZoPg&usqp=CAU",
    //   email: "XXXXXXXXXXXXXX",
    //   phone: "0987654321",
    // },
    // {
    //   id: 14,
    //   fullName: "Đào",
    //   avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLSDBGl63KMyzp0oqzKaQDgLn6PHLmQ6EejQ&usqp=CAU",
    //   email: "XXXXXXXXXXXXXX",
    //   phone: "0987654321",
    // },
    // {
    //   id: 15,
    //   fullName: "Piano",
    //   avatar: "https://static.vecteezy.com/system/resources/thumbnails/009/749/751/small/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg",
    //   email: "XXXXXXXXXXXXXX",
    //   phone: "0987654321",
    // },
  ];

  const renderMemberCard = (user) => (
    <Grid key={user.id} item xs={12} sm={6} md={4} lg={2}>
      <Card sx={{ maxWidth: 180 }} elevation={5}>
        <CardContent>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={user.fullName}
              src={user.avatar}
              sx={{ width: 100, height: 100, marginTop: 2 }}
            />
            <Typography gutterBottom variant="h6">
              {user.fullName}
            </Typography>
          </Container>
        </CardContent>
        <CardActions>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
            <UserMoreInfo
              fullname={user.fullName}
              email={user.email}
              phone={user.phone}
            />
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/meeting");
  // };

  return (
    <Grid container direction={"row"}>
      <Grid container paddingBottom={2}>
        <Grid 
          xs={6} 
          justifyContent={"flex-start"}
          item={true}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
              Members
          </Typography>
        </Grid>     
        <Stack spacing={1} direction={"row"} justifyContent={"flex-end"} paddingLeft={35}>
            <RequestJoin />
            <InviteUser />
        </Stack>
      </Grid>
      <Grid container spacing={2}>
      {userList.map((user) => renderMemberCard(user))}
      </Grid>
      <Grid
        xs={6}
        sx={{ textAlign: "right", paddingRight: 5 }}
        justifyContent={"flex-end"}
        item={true}
      >
        {/* <UpdateGroup /> */}
        
      </Grid>

      {/* <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <RequestJoin />
          <InviteUser />
        </Stack>
      </Grid> */}

      {/* <Grid xs={12} paddingTop={2}>
        <Typography variant="h4" textAlign={"left"}>
          Meetings
        </Typography>
      </Grid>

      <Grid xs={2} container justifyContent={"center"}>
        <Stack spacing={1} justifyContent={"center"}>
          <PlanningButton />
          <MeetingNowButton />
        </Stack>
      </Grid> */}

      {/* <Grid
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
                  <Typography gutterBottom variant="h6">
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
                  <Typography gutterBottom variant="h6">
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
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ paddingTop: "1rem" }}
                  >
                    <StartMeetingButton />
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
                  <Typography gutterBottom variant="h6">
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
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ paddingTop: "1rem" }}
                  >
                    <UpdateMeetingButton />
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={11.5} paddingTop={3}>
        <HistoryMeeting />
      </Grid> */}
      <Grid container justifyContent="center" alignItems="center" paddingTop={5}>
            <Paginate count={10}/>
        </Grid>
    </Grid>
  );
}
