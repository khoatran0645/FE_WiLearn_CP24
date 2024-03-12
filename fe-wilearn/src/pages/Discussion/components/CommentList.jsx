import Comment from "./Comment";

const CommentList = () => {
  const comments = [
    {
      avatarUrl: 'https://banner2.cleanpng.com/20181231/fta/kisspng-computer-icons-user-profile-portable-network-graph-circle-svg-png-icon-free-download-5-4714-onli-5c2a3809d6e8e6.1821006915462707298803.jpg',
      username: 'John Doe',
      content: 'Great explanation! Thanks for sharing.',
      timestamp: '2 hours ago',
    },
    {
      avatarUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp',
      username: 'Jane Doe',
      content: 'I have a question. How can I implement this in my project?',
      timestamp: '1 hour ago',
    },
  ];

  return (
    <div style={{maxWidth:'900px', marginLeft: '200px', textAlign: 'left'}}>
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          avatarUrl={comment.avatarUrl}
          username={comment.username}
          content={comment.content}
          timestamp={comment.timestamp}
        />
      ))}
    </div>
  );
};

export default CommentList;
