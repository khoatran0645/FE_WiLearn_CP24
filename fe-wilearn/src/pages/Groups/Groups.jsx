import {
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Backdrop,
  CircularProgress,
  CardActions,
  Button,
} from "@mui/material";

import { useNavigate, Navigate, Link } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import Invitation from "../../components/Invitation";

import { useState } from "react";
import { useSelector } from "react-redux";
import JoinNewGroup from "./JoinNewGroup";

export default function Groups() {
  const { userInfo } = useSelector((state) => state.user);
  // const {leadGroups, joinGroups} = userInfo;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const showCreatedList = (groupcreatedList) =>
    groupcreatedList.map((group) => (
      <Card key={group.id} sx={{ maxWidth: 200, minWidth: 200 }}>
        <CardMedia
          component="img"
          height="140"
          image={group.imagePath}
          alt="scene"
        />
        <CardContent sx={{paddingBottom: "20px", height: "100px"}}>
          <Typography gutterBottom variant="h5" align="center">
            {group.name}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate(`${group.id}/members`);
            }}
          >
            {/* <Link
              to={`${group.id}/members`}
              state={{ group: group }}
              style={{ textDecoration: "none"}}
            >
            </Link> */}
            View
          </Button>
        </CardActions>
      </Card>
    ));

  return (
    <Grid container>
      <Grid container paddingLeft={5} paddingTop={5}>
        <Grid
          xs={6}
          container
          justifyContent={"flex-start"}
          sx={{ overflow: "auto", paddingTop: 0 }}
        >
          <Typography variant="h4">Groups I manage</Typography>
        </Grid>

        <Grid
          xs={6}
          container
          justifyContent={"flex-end"}
          paddingRight={5}
          alignContent={"center"}
        >
          <Stack direction="row" spacing={3} paddingBottom={"1rem"}>
            <CreateGroup />
          </Stack>
        </Grid>

        <Grid container sx={{ overflow: "auto" }}>
          <Stack direction="row" spacing={1}>
            {(!userInfo?.leadGroups || userInfo?.leadGroups.length == 0) && (
              <p>No groups found.</p>
            )}
            {userInfo?.leadGroups && showCreatedList(userInfo?.leadGroups)}
          </Stack>
        </Grid>
      </Grid>
      <Grid container paddingLeft={5} paddingTop={5}>
        <Grid
          xs={6}
          container
          justifyContent={"flex-start"}
          sx={{ overflow: "auto", paddingTop: 0 }}
        >
          <Typography variant="h4">Groups I joined</Typography>
        </Grid>

        <Grid xs={6} container justifyContent={"flex-end"} paddingRight={5}>
          <Stack direction="row" spacing={3} paddingBottom={"1rem"}>
            <JoinNewGroup lable="Join new group"/>
            <Invitation />
          </Stack>
        </Grid>

        <Grid container>
          <Stack direction="row" spacing={1}>
            {(!userInfo?.joinGroups || userInfo?.joinGroups.length == 0) && (
              <p>No groups found.</p>
            )}
            {userInfo?.joinGroups && showCreatedList(userInfo?.joinGroups)}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
