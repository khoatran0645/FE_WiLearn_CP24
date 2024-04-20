import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSubject } from '../../app/reducer/adminReducer/adminActions';
import { toast } from 'react-toastify'
import { getSubjectLists } from '../../app/reducer/studyGroupReducer/studyGroupActions';
import * as Yup from 'yup'
import { useFormik } from 'formik';

function SubjectsPage() {
  const dispatch = useDispatch();
  const { subjectLists } = useSelector(state => state.studyGroup)

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Require information.'),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await dispatch(createSubject(formik.values.name));
      if (response.type == createSubject.fulfilled.type) {
        toast.success("Create subject " + name + " successfully")
        dispatch(getSubjectLists())
      } else {
        toast.error("Something went wrong when creating subject " + name)
        response?.payload?.failures && response?.payload?.failures.forEach(fail => {
          toast.error(fail)
        });
      }
    }
  });

  return (
    <Box padding={2}>
      <Typography variant='h3'>Manage Subjects</Typography>
      {subjectLists && subjectLists.map(subject => (
        <>
          <Paper key={subject.id} elevation={3} sx={{ padding: 1, marginTop: 1 }}>
            <Typography><strong>Id: </strong>{subject.id}</Typography>
            <Typography><strong>Name: </strong>{subject.name}</Typography>
          </Paper>
        </>
      ))}
      <Box
        component={"form"}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant='h4'>Create new subject</Typography>
        <TextField
          label
          placeholder="Subject name"
          variant="outlined"
          size="small"
          sx={{ width: "500px" }}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <Button color='primary' variant='contained' type='submit'>Create</Button>
      </Box>
    </Box>
  )
}

export default SubjectsPage