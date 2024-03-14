import { useState } from 'react';
import { Paper, Typography, TextareaAutosize, Button, Grid } from '@mui/material';
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
      <Grid>
          <Grid sx={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth:'900px',margin: '20px auto 0' }}>
            <Paper sx={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
              <Typography variant="h6" style={{ color: '#333' }}>Topic: How to add posts using React?</Typography>
              <Typography variant="body1" style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: 28/02/2023 Time: 12:03:15</Typography>
            </Paper>
            <Paper sx={{ padding: '20px' }}>
              <img
                src="https://t3h.com.vn/photos/1/Anh%20bai%20viet/Top-reactJS-frameworks.png"
                alt="Discussion Image"
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <Typography variant="body1" style={{ fontSize: '14px', color: '#888', textAlign: 'justify' }}>
                We use HTTP requests, such as POST, to “talk to” APIs over the web. With HTTP requests,
                we can access resources outside of our own domain (where our web app is stored). These
                resources can include files, databases, compute functions, and more. Besides added
                capability, using outside resources allows us to make data accessible to all instances of
                our web app. For example, if we want to keep track of user data for logins, by putting
                this data in a database in the cloud, all instances of our web app can access it from the
                client side.
              </Typography>
              <Typography variant="body1"
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
              </Typography>        
            </Paper>
          </Grid>
           <Grid sx={{ marginTop: '20px', maxWidth:'600px', marginLeft: '190px' }}>
            <Typography variant="h5" style={{ fontSize: '20px', marginBottom: '10px', textAlign: 'left', fontStyle: 'italic' }}>Answer</Typography>
            <TextareaAutosize
              value={replyText}
              onChange={handleReplyChange}
              style={{ width: '100%', minHeight: '80px', borderRadius: '5px', padding: '10px' }}
              placeholder="Type your reply here..."
            />
            <Button
              onClick={handleReplySubmit}
              variant="contained"
              size="small"
              style={{
                marginTop: '8px',
              }}
            >
              Submit
            </Button>
          </Grid>
          <CommentList/>
      </Grid>
    );
  }
