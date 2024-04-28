import { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  addDiscussion,
  getDiscussionByGroupId,
  uploadDiscussionFile,
} from "../../../app/reducer/studyGroupReducer/studyGroupActions";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AddDiscussion() {
  const [open, setOpen] = useState(false);
  const reactQuillRef = useRef(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { groupInfo, loading } = useSelector((state) => state.studyGroup);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContentChange = (value) => {
    formik.setFieldValue("Content", value);
  };

  const imageHandler = useCallback(() => {
    const editor = reactQuillRef.current.getEditor();
    console.log("editor", editor);
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log("file", file);
        const res = await dispatch(uploadDiscussionFile({ file: file }));
        if (res.type === uploadDiscussionFile.fulfilled.type) {
          const url = res?.payload ? res?.payload : "";
          editor.insertEmbed(editor.getSelection(), "image", url);
        } else {
          toast.error(
            "Something went wrong when adding image to discussion's body"
          );
          res?.payload?.failures &&
            res.payload.failures.forEach((error) => {
              toast.error(error);
            });
        }
      } else {
        toast.info("You could only upload images.");
      }
    };

  }, [])


  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["code-block"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler, // <-
      },
    },
    // clipboard: {
    //   matchVisual: false,
    // },
  }));

  const validationSchema = Yup.object({
    Question: Yup.string().trim().required("Require information."),
    Content: Yup.string().trim().required("Require information."),
  });
  const formik = useFormik({
    initialValues: {
      userId: userInfo?.id,
      groupId: groupInfo?.id,
      Question: "",
      Content: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values);
      const response = await dispatch(addDiscussion(values));
      if (response.type == addDiscussion.fulfilled.type) {
        toast.success("Create discussion " + values.Question + " successfully");
        dispatch(getDiscussionByGroupId(values.groupId));
        formik.resetForm();
        handleClose();
      } else {
        toast.error(
          "Something went wrong when creating disscusion " + values.Question
        );
        response?.payload?.failures &&
          response?.payload?.failures.forEach((fail) => {
            toast.error(fail);
          });
      }
    },
  });

  return (
    <Grid>
      <Button
        onClick={handleOpen}
        style={{
          textAlign: "center",
          fontSize: "14px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          marginLeft: "900px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        + Add Discussion
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box component="form" onSubmit={formik.handleSubmit}>
          {/* <input type="hidden" name="userId" value={formik.values.userId}/> */}
          {/* <input name="groupId" value={formik.values.groupId}/> */}
          <DialogTitle>Add Discussion</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="topic"
              label="Enter topic"
              type="text"
              fullWidth
              name="Question"
              value={formik.values.Question}
              onChange={formik.handleChange}
              error={formik.touched.Question && Boolean(formik.errors.Question)}
              helperText={formik.touched.Question && formik.errors.Question}
            />
            <ReactQuill
              style={{ height: "300px" }}
              onChange={handleContentChange}
              ref={reactQuillRef}
              theme="snow"
              modules={modules}
              name="Content"
              value={formik.values.Content}
              error={formik.touched.Content && Boolean(formik.errors.Content)}
              helperText={formik.touched.Content && formik.errors.Content}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" color="primary">
                Submit
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Grid>
  );
}
