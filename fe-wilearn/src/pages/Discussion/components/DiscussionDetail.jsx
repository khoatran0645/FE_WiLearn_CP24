import { useState } from 'react';
import CommentList from './CommentList';

export default function DiscussionDetail() {
    const [replyText, setReplyText] = useState('');
  
    const handleReplyChange = (event) => {
      setReplyText(event.target.value);
    };
  
    const handleReplySubmit = () => {
      console.log(`Reply submitted: ${replyText}`);
      setReplyText('');
    };
  
    return (
      <div>
          <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth:'900px',margin: '20px auto 0' }}>
            <div style={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
              <h2 style={{ fontSize: '20px', margin: '0', color: '#333' }}>Topic: How to add posts using React?</h2>
              <p style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: 28/02/2023 Time: 12:03:15</p>
            </div>
            <div style={{ padding: '20px' }}>
              <img
                src="https://cdn.shortpixel.ai/spai/w_985+q_lossy+ret_img+to_webp/cdn-upmostlymulti.pressidium.com/wp-content/uploads/Using-POST-Requests-in-React.png"
                alt="Discussion Image"
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <p style={{ fontSize: '14px', color: '#888', textAlign: 'justify' }}>
                We use HTTP requests, such as POST, to “talk to” APIs over the web. With HTTP requests,
                we can access resources outside of our own domain (where our web app is stored). These
                resources can include files, databases, compute functions, and more. Besides added
                capability, using outside resources allows us to make data accessible to all instances of
                our web app. For example, if we want to keep track of user data for logins, by putting
                this data in a database in the cloud, all instances of our web app can access it from the
                client side.
              </p>
              <p
                style={{
                  fontSize: '14px',
                  color: '#555',
                  marginTop: '10px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                  background: '#eee',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              >
                Created by: Phuong Nam
              </p>        
            </div>
          </div>
           <div style={{ marginTop: '40px', maxWidth:'600px', marginLeft: '170px' }}>
            <h3 style={{ fontSize: '15px', marginBottom: '10px', textAlign: 'left', fontStyle: 'italic' }}>Reply</h3>
            <textarea
              value={replyText}
              onChange={handleReplyChange}
              style={{ width: '100%', minHeight: '80px', borderRadius: '5px', padding: '10px' }}
              placeholder="Type your reply here..."
            />
            <button
              onClick={handleReplySubmit}
              style={{
                backgroundColor: '#3498db',
                color: '#fff',
                padding: '6px 14px',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                marginTop: '10px',
                transition: 'background-color 0.3s',
              }}
            >
              Submit
            </button>
          </div>
          <CommentList/>
      </div>
      
    );
  }
  