
export default function StatisticItem() {
    const containerStyle = {
      display: 'flex',
      gap: '200px',
      marginLeft: '200px',
      marginTop: '20px',
    };
  
    const statisticContainerStyle = {
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      marginLeft: '60px',
    };
  
    const headingStyle = {
      color: '#333',
      marginBottom: '10px',
    };
  
    const paragraphStyle = {
      color: '#555',
      margin: '10px 0',
      textAlign: 'left',
    };
  
    return (
      <div style={containerStyle}>
        <div style={statisticContainerStyle}>
          <h2 style={headingStyle}>Meeting Statistics</h2>
          <p style={paragraphStyle}>Total Meetings: 17</p>
          <p style={paragraphStyle}>Attended Meetings: 12</p>
          <p style={paragraphStyle}>Absent Meetings: 5</p>
        </div>
  
        <div style={statisticContainerStyle}>
          <h2 style={headingStyle}>Discussion Statistics</h2>
          <p style={paragraphStyle}>Total Discussion: 38</p>
        </div>
      </div>
    );
  }
  
  