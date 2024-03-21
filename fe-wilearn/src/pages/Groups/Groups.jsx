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
  Button,
} from "@mui/material";

import { useNavigate, Navigate, Link } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import Invitation from "../../components/Invitation";

import { useState } from "react";
import JoinNewGroup from "../../components/JoinNewGroup";

export default function Groups() {
  const groupcreatedList = [
    {
      id: 1,
      name: "Nhóm A1",
      image:
        "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg",
    },
    {
      id: 2,
      name: "Nhóm A2",
      image:
        "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg",
    },
    {
      id: 3,
      name: "Nhóm B1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    },
    {
      id: 4,
      name: "Nhóm B2",
      image:
        "https://static.vecteezy.com/system/resources/previews/003/623/626/non_2x/sunset-lake-landscape-illustration-free-vector.jpg",
    },
    {
      id: 5,
      name: "Nhóm C1",
      image:
        "https://d150u0abw3r906.cloudfront.net/wp-content/uploads/2021/10/image2-2-1024x649.png",
    },
    {
      id: 6,
      name: "Nhóm C2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmBah5MSMopRmrD_8Me0kE4hwPh8TI6mFwrA",
    },
    {
      id: 7,
      name: "Nhóm D1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLytpLCORdw7AZ4N1S8cEeeb4NdIpjuSwG9Q",
    },
    {
      id: 8,
      name: "Nhóm D2",
      image:
        "https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2018/03/acj-2003-beautiful-landscapes-around-the-world-og.jpg",
    },
    {
      id: 9,
      name: "Nhóm E1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpMMIz4U2cDT_qWp8zoFjcQXDZT0vhf7t85w",
    },
    {
      id: 10,
      name: "Nhóm E2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2CHaCF_K3tt1gpEAz0gBo1mTLGgWwtLi3DA",
    },
  ];

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const showList = groupcreatedList.map((group) => (
    <Card key={group.id} sx={{ maxWidth: 345, minWidth: 200 }}>
      <CardActionArea>
        <Link
          to={`groups/${group.id}`}
          state={{ group: group }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={group.image}
            alt="scene"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              {group.name}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
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
            {showList}
          </Stack>
        </Grid>
      </Grid>

      {/* <Backdrop
        onTransitionEnd={handleClose}
        transitionDuration={{ enter: 1000, exit: 100 }}
        unmountOnExit
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}

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
            <JoinNewGroup />
            <Invitation />
          </Stack>
        </Grid>

        <Grid container>
          <Stack direction="row" spacing={1}>
            <Card sx={{ maxWidth: 345, minWidth: 200 }}>
              <CardActionArea>
                <Link
                  to={`groups/joined`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QgxfB2v5SxI80ZfdR4Q4OvZi-3oHkRkHAw"
                    alt="scene"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Nhóm D
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
