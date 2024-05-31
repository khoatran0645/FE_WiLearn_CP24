import { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
  CircularProgress,
  Box
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  addDiscussion,
  getDiscussionByGroupId,
  uploadDiscussionFile,
  updateDiscussion,
  getDiscussionById,
} from "../app/reducer/studyGroupReducer/studyGroupActions";

export default function EditIconButton() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const reactQuillRef = useRef(null);

  const { userInfo } = useSelector((state) => state.user);
  const { groupInfo, loading } = useSelector((state) => state.studyGroup);
  const { discussionDetail } = useSelector((state) => state.studyGroup);

  console.log("discussionDetail", discussionDetail.id);

  const handleClickOpen = () => {
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
  }, []);

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
      discussionId: discussionDetail?.id,
      // groupId: groupInfo?.id,
      Question: discussionDetail?.question,
      Content: discussionDetail?.content,
    },
    validationSchema,
    // enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("values", values);
      const response = await dispatch(updateDiscussion(values));
      if (response.type == updateDiscussion.fulfilled.type) {
        toast.success("Update discussion " + values.Question + " successfully");
        dispatch(getDiscussionById(discussionDetail.id));
        formik.resetForm();
        handleClose();
      } else {
        toast.error(
          "Something went wrong when updating disscusion " + values.Question
        );
        response?.payload?.failures &&
          response?.payload?.failures.forEach((fail) => {
            toast.error(fail);
          });
      }
    },
  });

  return (
    <>
      <Tooltip title="Edit this discussion">
        <IconButton size="large">
          <EditIcon fontSize="inherit" onClick={handleClickOpen} />
        </IconButton>
      </Tooltip>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogTitle>Edit</DialogTitle>
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
            <Button onClick={handleClose} color="warning">
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
    </>
  );
}
