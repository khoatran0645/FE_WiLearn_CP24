import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Autocomplete,
  Typography,
  Avatar,
  Input,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateGroupInfo,
  getGroupInfo,
} from "../app/reducer/studyGroupReducer/studyGroupActions";
import { getUserInfo } from "../app/reducer/userReducer";

const defaultAvatar = "/src/assets/default.jpg";

export default function UpdateGroup({ groupId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const { groupInfo, subjectLists } = useSelector((state) => state.studyGroup);

  useEffect(() => {
    console.log("Fetching group info...");
    dispatch(getGroupInfo(groupId));
  }, [dispatch, groupId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("image", file);
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Group name is required."),
    description: Yup.string().trim().required("Description is required."),
  });

  const formik = useFormik({
    initialValues: {
      name: groupInfo?.name || "",
      description: groupInfo?.description || "",
      image: "",
      subjects: groupInfo?.subjects || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting form...");
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", values.image);
      values.subjects.forEach((sub) =>
        formData.append("subjectIds[]", parseInt(sub.id))
      );

      try {
        console.log("Updating group info...");
        await dispatch(updateGroupInfo(groupId, formData));
        dispatch(getUserInfo());
        toast.success("Group updated successfully");
      } catch (error) {
        console.error("Failed to update group:", error);
        toast.error("Failed to update group");
      }
    },
  });

  console.log("Render UpdateGroup component:", groupInfo, subjectLists);

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      mt={3}
    >
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
        label="Description"
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
          options={subjectLists || []}
          isOptionEqualToValue={(option, value) =>
            option.id === value.id || option.name === value.name
          }
          getOptionLabel={(option) => option.name}
          value={formik.values.subjects}
          onChange={(event, selectedOptions) => {
            formik.setFieldValue("subjects", selectedOptions);
          }}
          onBlur={formik.handleBlur("subjects")}
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
        <Typography variant="h6" marginBottom={1}>
          Group Image
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
          name="image"
          onChange={(e) => {
            handleFileChange(e);
          }}
          error={formik.touched.image && Boolean(formik.errors.image)}
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
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button type="submit" color="primary" variant="contained">
          Update
        </Button>
      </Box>
    </Box>
  );
}
