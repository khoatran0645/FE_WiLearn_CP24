import { useState } from 'react';
import AddDiscussion from './AddDiscussion';
import Popup from 'reactjs-popup';
import DiscussionDetail from './DiscussionDetail';
import 'reactjs-popup/dist/index.css';

export default function Discussion() {
  const [showDiscussion, setAddDiscussion] = useState(false);
  const [redirectToDetail, setRedirectToDetail] = useState(false);

  const handleClick = () => {
    setAddDiscussion(true);
  };

  const closeModal = () => {
    setAddDiscussion(false);
  };

  const handleDetailClick = () => {
    setRedirectToDetail(true);
  };

  if (redirectToDetail) {
    return <DiscussionDetail />;
  }

  return (
    <div>
      <h1>Discussion</h1>
      <div>
        <Popup
          modal
          open={showDiscussion}
          onClose={closeModal}
          contentStyle={{
            width: '60%',
            height: '60%',
            borderRadius: '10px',
          }}
        >
          <AddDiscussion discussionId={1} onClose={closeModal} />
        </Popup>
        <button
          onClick={handleClick}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginLeft: '900px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          + Add Discussion
        </button>
      </div>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth:'900px',margin: '20px auto 0' }}>
        <div style={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
          <h2 style={{ fontSize: '20px', margin: '0', color: '#333' }}>Topic: How to add posts using React?</h2>
          <p style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: 28/02/2023 Time: 12:03:15</p>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '14px', color: '#888', textAlign: 'justify' }}>
            We use HTTP requests, such as POST, to “talk to” APIs over the web. With HTTP
            requests, we can access resources outside of our own domain (where our web app is
            stored). These resources can include files, databases, compute functions, and more.
            Besides added capability, using outside resources allows us to make data accessible to
            all instances of our web app. For example, if we want to keep track of user data for
            logins ...
          </p>
          <button
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '8px 16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
            onClick={handleDetailClick}
          >
            See More
          </button>
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
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth:'900px',margin: '20px auto 0' }}>
        <div style={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
          <h2 style={{ fontSize: '20px', margin: '0', color: '#333' }}>Topic: How to add posts using React?</h2>
          <p style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: 28/02/2023 Time: 12:03:15</p>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '14px', color: '#888', textAlign: 'justify' }}>
            We use HTTP requests, such as POST, to “talk to” APIs over the web. With HTTP
            requests, we can access resources outside of our own domain (where our web app is
            stored). These resources can include files, databases, compute functions, and more.
            Besides added capability, using outside resources allows us to make data accessible to
            all instances of our web app. For example, if we want to keep track of user data for
            logins ...
          </p>
          <button
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '8px 16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
            onClick={handleDetailClick}
          >
            See More
          </button>
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
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth:'900px',margin: '20px auto 0' }}>
        <div style={{ background: '#f8f8f8', padding: '20px', borderBottom: '1px solid #ccc' }}>
          <h2 style={{ fontSize: '20px', margin: '0', color: '#333' }}>Topic: How to add posts using React?</h2>
          <p style={{ fontSize: '14px', color: '#888', margin: '5px 0' }}>Date: 28/02/2023 Time: 12:03:15</p>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '14px', color: '#888', textAlign: 'justify' }}>
            We use HTTP requests, such as POST, to “talk to” APIs over the web. With HTTP
            requests, we can access resources outside of our own domain (where our web app is
            stored). These resources can include files, databases, compute functions, and more.
            Besides added capability, using outside resources allows us to make data accessible to
            all instances of our web app. For example, if we want to keep track of user data for
            logins ...
          </p>
          <button
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '8px 16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
            onClick={handleDetailClick}
          >
            See More
          </button>
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
    </div>
  );
}
