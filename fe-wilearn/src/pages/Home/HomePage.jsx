import { useEffect } from "react";
import {
  Typography,
  CardContent,
  CardMedia,
  Card,
  Container,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import CreateGroup from "../Groups/CreateGroup";

export default function HomePage() {
  const dispatch = useDispatch();
  const { groupNotJoin } = useSelector((state) => state.studyGroup);

  useEffect(() => {}, [dispatch]);

  console.log("groupNotJoin:", groupNotJoin);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid

          container
          justifyContent={"flex-end"}
          alignContent={"center"}
        >
          <Stack direction="row">
            <CreateGroup />
          </Stack>
        </Grid>
        {groupNotJoin.map((group) => (
          <Grid item key={group.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="120"
                image={group.imagePath}
                alt={group.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {group.name}
                </Typography>
                <Chip label={group.subjects} size="small" variant="filled" />
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <GroupsIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{group.memberCount}</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1">{group.description}</Typography>
              </CardContent>
              <Grid container justifyContent="center" paddingBottom={2}>
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    padding: "6px 10px",
                    fontSize: "14px",
                    backgroundImage:
                      "linear-gradient(to left, #00b4db, #0083b0)",
                  }}
                >
                  Request
                </Button>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
