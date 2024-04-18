import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function ReportsPage() {
const {reports} = useSelector(state=>state.admin)
const admin = useSelector(state=>state.admin)
console.log("admin", admin);
  return (
    <>
      <Typography variant='h2'>Reports aaa</Typography>
      {(!reports || reports.length==0) &&(
        "No new report"
      )}
      {reports.map(report => (
        <Box key={report.id} marginTop={2}>
          <Typography><strong>Id: </strong>{report.id}</Typography>
          <Typography><strong>Reason: </strong>{report.detail}</Typography>
          <Typography><strong>Sender: </strong>{report.sender.username}</Typography>
          {report.group&&(
            <>
              <Typography><strong>Group: </strong>{report.group.name}</Typography>
              <Typography><strong>Group id: </strong>{report.group.id}</Typography>
              <Typography><strong>Group description: </strong>{report.group.description}</Typography>
              <Typography><strong>Group subjects: </strong>{report.group.subjects.join(', ')}</Typography>
              <img src={report.group.imagePath}/>
            </>
          )}
          {report.account&&(
            <>
              <Typography><strong>Account: </strong>{report.account.username}</Typography>
              <Typography><strong>Account id: </strong>{report.account.id}</Typography>
              <Typography><strong>Account fullname: </strong>{report.account.fullName}</Typography>
              <Typography><strong>Account phone: </strong>{report.account.phone}</Typography>
              <Typography><strong>Account DOB: </strong>{report.account.dateOfBirth}</Typography>
              {/* <Typography><strong>Account subjects: </strong>{report.group.subjects.join(', ')}</Typography> */}
              <img src={report.account.imagePath}/>
            </>
          )}
        </Box>
      ))}
    </>
  )
}

export default ReportsPage