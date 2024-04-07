import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Form, useFormik } from "formik";
import {
  getGroupInfo,
  meetingNow,
} from "../../../app/reducer/studyGroupReducer";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MeetingNowButton({ groupId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [contentRoom, setContentRoom] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    groupId: Yup.number().required("Require group id").positive().integer(),
    // ().required('Require information.'),
    name: Yup.string().required("Require meeting name."),
    content: Yup.string().required("Require meeting content."),
  });
  const formik = useFormik({
    initialValues: {
      groupId: parseInt(groupId),
      name: "",
      content: "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await dispatch(meetingNow(values));
      if (response.type === meetingNow.fulfilled.type) {
        formik.resetForm();
        dispatch(getGroupInfo(groupId));
        setOpenDialog(false);
        toast.success("Create meeting successfully");
        console.log("onSubmit res", response);
        navigate(`./${response.payload.id}`);
      } else if (response.type === meetingNow.rejected.type) {
        toast.error("Fail to create meeting");
      }
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleCreateRoom = () => {
    console.log("Creating room:", { nameRoom, contentRoom });
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        onClick={() => setOpenDialog(true)}
      >
        Meeting now
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        {/* <Form
          handleSubmit={formik.submit}
        > */}
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Create meeting now</DialogTitle>
          <DialogContent>
            {/* Group Id: {groupId} */}
            {formik.errors.groupId}
            <FormControl fullWidth>
              <TextField
                label="Meeting Name"
                fullWidth
                sx={{ marginTop: "10px" }}
                // value={nameRoom}
                // onChange={(e) => setNameRoom(e.target.value)}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Content"
                fullWidth
                sx={{ marginTop: "10px" }}
                // value={contentRoom}
                // onChange={(e) => setContentRoom(e.target.value)}
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                error={formik.touched.content && Boolean(formik.errors.content)}
                helperText={formik.touched.content && formik.errors.content}
              />
            </FormControl>
          </DialogContent>
          <DialogActions style={{ padding: "16px" }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            {/* <Button type="submit" onClick={handleCreateRoom}>Create</Button> */}
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>

        {/* </Form> */}
      </Dialog>
    </>
  );
}
