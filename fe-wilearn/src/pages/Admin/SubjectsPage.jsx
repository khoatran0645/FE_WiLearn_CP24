import { Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function SubjectsPage() {
const{subjectLists} = useSelector(state=>state.studyGroup)

  return (
    <>
      <Typography variant='h3'>Manage Subjects</Typography>
      {subjectLists&&subjectLists.map(subject=>(
        <>
          <Paper key={subject.id} elevation={3} sx={{ padding: 1, marginTop: 1 }}>
            <Typography><strong>Id: </strong>{subject.id}</Typography>
            <Typography><strong>Name: </strong>{subject.name}</Typography>
          </Paper>
        </>
      ))}
      <Typography variant='h4'>Create new subject</Typography>
    </>
  )
}

export default SubjectsPage