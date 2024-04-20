import { Avatar, Grid, Typography, IconButton } from "@mui/material";
import PropTypes from "prop-types";

import FlagCircleIcon from "@mui/icons-material/FlagCircle";

const Comment = ({ avatarUrl, username, content, timestamp }) => {
  const styles = {
    commentContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    userInfo: {
      display: "flex",
      alignItems: "center",
    },
    username: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    userDetail: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "10px",
    },
    content: {
      fontSize: "14px",
      marginBottom: "5px",
      marginLeft: "40px",
    },
    timestamp: {
      fontSize: "12px",
      color: "#888",
      marginLeft: "40px",
    },
    avatar: {
      width: "30px",
      height: "30px",
      marginRight: "10px",
    },
  };

  return (
    <Grid style={styles.commentContainer}>
      <Grid style={styles.userInfo}>
        <Grid style={styles.userDetail}>
          
          <Grid sx={{ display: "flex" }}>
            <Avatar src={avatarUrl} alt="Avatar" style={styles.avatar} />
            
            <Typography style={styles.username}>{username}</Typography>
            <IconButton size="small">
            <FlagCircleIcon fontSize="small"/>
          </IconButton>
          </Grid>
          <Typography style={styles.content}>{content}</Typography>
          <Typography style={styles.timestamp}>{timestamp}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

Comment.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
