import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import BackHandIcon from "@mui/icons-material/BackHand";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
export default function MeetingPage() {
  const itemData = [
    {
      img: "https://img.freepik.com/premium-photo/anime-male-avatar_950633-956.jpg",
      title: "boy",
    },
    {
      img: "https://play-lh.googleusercontent.com/HHJb4ew7S16SHjqNjp1nEkVKn8L2j1rXPjVmF4fqf-mGjZYYIjhHYKjUJSLbB7SRx1HS",
      title: "Burger",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlaY0vxDVdf2br6KAu4YsszWMAgst_5Uj2dg",
      title: "men",
    },
    {
      img: "data:image/jpeg;base64,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",
      title: "women",
    },
    {
      img: "https://images.squarespace-cdn.com/content/v1/5e6ece70bd2f8a6de8472818/714f685e-d0ba-40f9-8bb2-38722c1fd29c/Tiny+Avatar.png",
      title: "men",
    },
    {
      img: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
      title: "men",
    },
    {
      img: "https://i.pinimg.com/280x280_RS/3a/65/d6/3a65d69aa6ca638c7575f6b883d71900.jpg",
      title: "men",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Duolingo",
    },
    {
      img: "https://pbs.twimg.com/media/Fgnw8TOUYAAuEFb.jpg",
      title: "men",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    
  ];

  return (
    <Box>
      <ImageList sx={{ width: 1, height: 1 / 4 }} cols={5}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.img}`}
              src={`${item.img}`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value="">
          <BottomNavigation sx={{ alignItems: "center" }}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="microphone"
                  control={<Switch color="info" />}
                  label="Microphone"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="camera"
                  control={<Switch color="info" />}
                  label="Camera"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </BottomNavigation>

          <BottomNavigationAction
            label="Share screen"
            icon={<ScreenShareIcon />}
          />
          <BottomNavigationAction label="Raise hand" icon={<BackHandIcon />} />
          <BottomNavigationAction label="More option" icon={<MoreVertIcon />} />

          <BottomNavigationAction
            label="End call"
            icon={<CallEndIcon />}
            sx={{ color: "#c92d2d" }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
