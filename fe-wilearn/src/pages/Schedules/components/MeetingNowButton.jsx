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
import { meetingNow } from "../../../app/reducer/studyGroupReducer";
import * as Yup from "yup";

export default function MeetingNowButton({ groupId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [contentRoom, setContentRoom] = useState("");

  const validationSchema = Yup.object({
    groupId: Yup.number().required('Require group id').positive().integer(),
    // ().required('Require information.'),
    name: Yup.string().required('Require meeting name.'),
    content: Yup.string().required('Require meeting content.'),
  });
  const formik = useFormik({
    initialValues: {
      groupId: parseInt(groupId),
      name: "",
      content: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const response = await dispatch(
        meetingNow(values)
      );
      if (response.type === scheduleMeeting.fulfilled.type) {
        formik.resetForm();
        dispatch(getGroupInfo(groupId));
        setOpenDialog(false);
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
      <Form

        handleSubmit={formik.submit}>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="xs"
          fullWidth
          onSubmit={formik.handleSubmit}
        >
          <DialogTitle>Create meeting now</DialogTitle>
          <DialogContent>
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
                name="name"
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
        </Dialog>
      </Form>
    </>
  );
}
