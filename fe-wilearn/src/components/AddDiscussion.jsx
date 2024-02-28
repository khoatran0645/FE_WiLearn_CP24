import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddDiscussion() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');
  const currentUser = 'Anonymous';

  const handlePostChange = (value) => {
    setNewPost(value);
  };

  const handleClose = () => {
    setShowNewPost(false);
  };
  
  const handleTopicChange = (event) => {
    setNewTopic(event.target.value);
  };

  const handlePostSubmit = () => {
    if (newPost.trim() !== '' && newTopic.trim() !== '') {
      const currentDate = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

      setFormattedDate(currentDate.toLocaleDateString(undefined, dateOptions));
      setFormattedTime(currentDate.toLocaleTimeString(undefined, timeOptions));

      const newPostWithTime = {
        content: newPost,
        date: formattedDate,
        time: formattedTime,
        topic: newTopic,
        creator: currentUser,
      };

      setPosts([...posts, newPostWithTime]);
      setNewPost('');
      setNewTopic('');

      setShowNewPost(true);
    }
  };

  return (
    <div style={{maxWidth:'900px', margin:'0 auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ textAlign: 'center', fontFamily: 'Segoe UI' }}>
          <h2>Add Discussion</h2>
        </div>
        <input
          type="text"
          value={newTopic}
          onChange={handleTopicChange}
          placeholder="Enter topic..."
          style={{ marginBottom: '5px', padding: '5px', marginLeft:'0px' }}
        />
        <ReactQuill
          value={newPost}
          onChange={handlePostChange}
          placeholder="Write your post here..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image',
          ]}
          style={{height:'200px'}}
        />
        <br />
        <div style={{ marginTop: '50px' }}>
        <button
          onClick={handlePostSubmit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            marginLeft: '50px',
            transition: 'background-color 0.3s', 
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Submit
        </button>
        <button
            onClick={handleClose}
            style={{
            backgroundColor: '#999999',
            color: 'white',
            padding: '10px 20px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            transition: 'background-color 0.3s',
            marginLeft: '600px'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#666666')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#999999')}
        >
            Close
        </button>
        </div>
        </div>
            <div>
                {showNewPost && (
                  <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
                      <h2 style={{ fontSize: '20px', margin: '0', color: '#333' }}>Topic: {posts[posts.length - 1].topic}</h2>
                      <p style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: {formattedDate}, Time: {formattedTime}</p>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div dangerouslySetInnerHTML={{ __html: posts[posts.length - 1].content }} />
                      <p style={{ fontSize: '14px', color: '#888', marginTop: '10px' }}>Created by: {currentUser}</p>
                    </div>
                  </div>
                )}
            </div>
    </div>
  );
}