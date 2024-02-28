import PropTypes from 'prop-types';

const Comment = ({ avatarUrl, username, content, timestamp }) => {
  const styles = {
    commentContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      marginRight: '10px',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    username: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    userDetail: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '10px',
    },
    content: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    timestamp: {
      fontSize: '12px',
      color: '#888',
    },
  };

  return (
    <div style={styles.commentContainer}>
      <div style={styles.userInfo}>
        <img src={avatarUrl} alt="Avatar" style={styles.avatar} />
        <div style={styles.userDetail}>
          <div style={styles.username}>{username}</div>
          <div style={styles.content}>{content}</div>
          <div style={styles.timestamp}>{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Comment;
