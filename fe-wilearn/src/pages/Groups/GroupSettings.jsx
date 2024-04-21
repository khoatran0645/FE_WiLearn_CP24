
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Check as CheckIcon } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Box,
  Autocomplete,
  MenuItem,
  Avatar,
  Input,
} from "@mui/material";
import { useFormik } from "formik";
import { createGroup, getGroupInfo, getGroupLists, getSubjectLists, updateGroupInfo } from "../../app/reducer/studyGroupReducer";
import { getUserInfo } from "../../app/reducer/userReducer";
import * as Yup from 'yup'
import { getGroupInfoAsMember, getGroupMemberLists, getRequestFormList } from "../../app/reducer/studyGroupReducer/studyGroupActions";

const defaultAvatar = "/src/assets/default.jpg";

export default function GroupSettings() {
  const [subject, setSubject] = useState([]);
  const [groupIntro, setGroupIntro] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const { subjectLists, groupInfo } = useSelector(state => state.studyGroup)

  const groupId = groupInfo?.id? groupInfo?.id: 0;
  const groupName = groupInfo?.name? groupInfo?.name: "";
  const groupDescription = groupInfo?.description?groupInfo?.description:"";
  const groupSubjects = groupInfo?.subjects?groupInfo?.subjects:[];
  const groupImagePath = groupInfo?.imagePath?groupInfo?.imagePath:"";
 


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("handleFileChange", file)
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
      id: groupId,
      name: groupName,
      description: groupDescription,
      image: groupImagePath,
      subjects: groupSubjects,
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
        id: values.id,
        name: values.name,
        description: values.description,
        image: values.image,
        subjectIds: values.subjects.map(sub => parseInt(sub.id)),
      }
      console.log("UpdateGroup submit values", values);
      console.log("UpdateGroup submit data", data);
      const response = await dispatch(updateGroupInfo(data));
      if (response.type === updateGroupInfo.fulfilled.type) {
        dispatch(getGroupLists());
        dispatch(getUserInfo())
        dispatch(getSubjectLists());
        dispatch(getGroupInfo(groupId));
        dispatch(getGroupInfoAsMember(groupId));
        dispatch(getGroupLists());
        dispatch(getGroupMemberLists());
        dispatch(getRequestFormList(groupId));
        formik.resetForm();
        toast.success("Update group info successfully")
      } else {
        toast.error("Fail to update group info")
        dispatch(getUserInfo())
      }
    }
  });
//   const createFile= async(path)=> {
//     let response = await fetch(path);
//     let data = await response.blob();
//     let metadata = {
//         type: response.headers["content-type"]
//     };
//     return new File([data], `Group${userInfo?.id}Ava.}`, metadata);
// }
//   if(groupInfo?.imagePath){

//   }
  return (
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
      <input name="id" type="hidden" value={formik.values.id}/>
      <Grid container marginLeft={10} paddingTop={10}>
        <Grid item xs={6}>
          {/* title */}
          <Typography variant="h5" textAlign={"center"}>
            Update group
          </Typography>
          <Stack spacing={2} paddingTop={2}>
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
                  (option, value) => option.id == value.id || option.name == value.name
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
            <Button type="submit">Submit</Button>
          </Stack>
        </Grid>

        <Grid item xs={5} paddingLeft={2}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography variant="body1" marginBottom={1}>
              Image group
            </Typography>
            <Avatar
              style={{ width: "250px", height: "250px", borderRadius: 0 }}
              src={
                // selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar
                selectedFile ? URL.createObjectURL(selectedFile)
                : groupImagePath? groupImagePath : defaultAvatar
              }
            />
           <Input
                  accept="image/*"
                  type="file"
                  id="avatar-upload"
                  style={{ display: "none" }}
                  name="image"
                  // value={formik.values.image}
                  onChange={(e)=>{
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
        </Grid>
      </Grid>
    </Box >
  );
}
