import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateGroup from "./CreateGroup";
import InviteUser from "./InviteUser";
import ButtonSearchGroup from "./ButtonSearchGroup";

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
      image: "https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg",
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

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/members");
  };

  const showList = groupcreatedList.map((group) => (
    <Card key={group.id} sx={{ maxWidth: 345, minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          onClick={handleClick}
          component="img"
          height="140"
          image={group.image}
          alt="scene"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {group.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));

  return (
    <Grid container spacing={2}>
      <Grid xs={6} container justifyContent={"flex-start"} paddingLeft={5}>
        <ButtonSearchGroup/>
      </Grid>
      <Grid xs={6} container justifyContent={"flex-end"} paddingRight={5}>
        <Stack direction="row" spacing={1}>
          <CreateGroup/>
          <InviteUser/>
        </Stack>
      </Grid>
      <Grid
        xs={12}
        container
        justifyContent={"flex-start"}
        sx={{ overflow: "auto", paddingTop: 5 }}
      >
        <Typography variant="h4">My own groups</Typography>
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
            {showList}
          </Stack>
        </Grid>
      </Grid>

      <Grid
        xs={12}
        container
        justifyContent={"flex-start"}
        sx={{ overflow: "auto", paddingTop: 5 }}
      >
        <Typography variant="h4">I joined these groups</Typography>
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1}>
          <Card sx={{ maxWidth: 345, minWidth: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0QgxfB2v5SxI80ZfdR4Q4OvZi-3oHkRkHAw"
                alt="scene"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nhóm D
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
