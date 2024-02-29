import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const groupcreatedList = [
    { id: 1, name: "Khối A1" },
    { id: 2, name: "Khối A2" },
    { id: 3, name: "Khối B1" },
    { id: 4, name: "Khối B2" },
    { id: 5, name: "Khối C1" },
    { id: 6, name: "Khối C2" },
    { id: 7, name: "Khối D1" },
    { id: 8, name: "Khối D2" },
    { id: 9, name: "Khối E1" },
    { id: 10, name: "Khối E2" },
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
          image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
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
        <TextField label="Search groups" variant="outlined" size="small" />
        <Button variant="contained" size="small">
          Search
        </Button>
      </Grid>
      <Grid xs={6} container justifyContent={"flex-end"} paddingRight={5}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small">
            Create new group
          </Button>
          <Button variant="contained" size="small">
            Invite
          </Button>
        </Stack>
      </Grid>
      <Grid xs={12} container justifyContent={"flex-start"} sx={{ overflow: "auto", paddingTop: 5}}>
        <Typography variant="h4">My own groups</Typography>
        <Grid xs={12}>
          <Stack direction="row" spacing={1}>
            {showList}
          </Stack>
        </Grid>
      </Grid>

      <Grid xs={12} container justifyContent={"flex-start"} sx={{ overflow: "auto", paddingTop: 5}}>
        <Typography variant="h4">I joined these groups</Typography>
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1}>
          <Card sx={{ maxWidth: 345, minWidth: 200 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Khối D
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
