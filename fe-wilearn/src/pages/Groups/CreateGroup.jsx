import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Autocomplete,
  Typography,
  Avatar,
  Input,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, getGroupLists } from "../../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";
import { getUserInfo } from "../../app/reducer/userReducer";

const defaultAvatar = "/src/assets/default.jpg";

export default function CreateGroup() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const {subjectLists} = useSelector(state=>state.studyGroup)

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue('image', file);
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Require information.'),
    description: Yup.string().trim().required('Require information.'),
    // subjectIds: Yup.array().min(1, 'Please select at least one subject')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      subjects: [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // if (groupInfo) {
      //   const transformSbjIds = values.subjectIds.map((id) => parseInt(id));
      //   const response = await dispatch(
      //     updateGroupInfo({ ...values, subjectIds: transformSbjIds })
      //   );
      //   if (response.type === updateGroupInfo.fulfilled.type) {
      //     formik.resetForm();
      //     dispatch(getGroupInfo(groupInfo?.id));
      //     onClose();
      //   }
      // } else {
      //   const transformSbjIds = values.subjectIds.map((id) => parseInt(id));
      //   const response = await dispatch(createGroup({ ...values, subjectIds: transformSbjIds }));
      //   if (response.type === createGroup.fulfilled.type) {
      //     dispatch(getGroupLists());
      //     formik.resetForm();
      //     onClose();
      //   }
      // }
      // const data = { ...values, subjectIds: values.subjects.map(sub=> parseInt(sub.id)) }
      const data = {
        name: values.name,
        description: values.description,
        image: values.image,
        subjectIds: values.subjects.map(sub=> parseInt(sub.id)),
      }
      console.log("CreateGroup submit values", values);
      console.log("CreateGroup submit data", data);
      const response = await dispatch(createGroup(data));
        if (response.type === createGroup.fulfilled.type) {
          dispatch(getGroupLists());
          dispatch(getUserInfo())
          formik.resetForm();
          handleCloseDialog();
          toast.success("Create group successfully")
        }else{
          toast.error("Fail to create a new group")
          dispatch(getUserInfo())
        }
    }
  });

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        sx={{
          textAlign: "center",
          fontSize: "14px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginLeft: "900px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "#4CAF50",
          },
        }}
        onClick={() => setOpenDialog(true)}
      >
        Create group
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <Box
            component={'form'}
            // onSubmit={(values)=>formik.handleSubmit(values)}
            onSubmit={formik.handleSubmit}
            // onSubmit={()=>alert('aaaa')}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            mt={'24px'}
          // rowGap={'32px'}
          >
            {/* <form onSubmit={formik.handleSubmit}> */}
              <TextField
                label="Group Name"
                fullWidth
                sx={{ marginTop: "10px" }}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                label="Introduction"
                fullWidth
                multiline
                rows={4}
                sx={{ marginTop: "15px" }}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <Box sx={{ marginTop: "1rem" }}>
                <Autocomplete
                  multiple
                  id="subjects"
                  options={subjectLists}
                  isOptionEqualToValue={
                    (option, value)=>option.id==value.id || option.name==value.name
                  }
                  getOptionLabel={(option) => option.name}
                  value={formik.values.subjects}
                  onChange={(event, selectedOptions) => {
                    formik.setFieldValue('subjects', selectedOptions);
                  }}
                  onBlur={formik.handleBlur('subjects')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select group subjects"
                      placeholder="Select subjects"
                      error={formik.touched.subjects && Boolean(formik.errors.subjects)}
                      helperText={formik.touched.subjects && formik.errors.subjects}
                    />
                  )}
                />


              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Typography variant="h7" marginBottom={1}>
                  Image group
                </Typography>
                <Avatar
                  style={{ width: "150px", height: "150px", borderRadius: 0 }}
                  src={selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar}
                />
                <Input
                  accept="image/*"
                  type="file"
                  id="avatar-upload"
                  style={{ display: "none" }}
                  // onChange={(e)=>handleFileChange(e)}
                  name="image"
                  // value={formik.values.image}
                  onChange={(e)=>{
                    // formik.handleChange(e)
                    handleFileChange(e)
                  }}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  // helperText={formik.touched.image && formik.errors.image}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="contained"
                    component="span"
                    style={{
                      marginTop: "16px",
                      padding: "2px 5px",
                      backgroundColor: "transparent",
                      color: "#000",
                      border: "1px solid #000",
                      fontSize: "12px",
                    }}
                  >
                    Choose File
                  </Button>
                </label>
                {selectedFile ? (
                  <Typography variant="body2" marginTop="10px">
                    Local avatar selected: {selectedFile.name}
                  </Typography>
                ) : (
                  <Typography variant="body2" marginTop="10px">
                    No local avatar is set. Use the upload field to add a local image.
                  </Typography>
                )}
              </Box>
              <DialogActions style={{ padding: "16px" }}>
                <Button onClick={handleCloseDialog} color="inherit">
                  Cancel
                </Button>
                {/* <Button onClick={handleCreateGroup} color="success"> */}
                <Button type="submit" color="success">
                  Create
                </Button>
              </DialogActions>
            {/* </form> */}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
