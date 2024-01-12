/* eslint-disable no-unused-vars */
import {
  Box,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CustomDialogTitle from "src/components/CustomDialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "src/components/Button";
import { RoomContext } from "src/context/roomContext";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object({});

const VoteFormDialog = (props) => {
  const { connection } = useContext(RoomContext);
  const { onClose, open, onVote } = props;
  const { meetingId } = useParams();

  const formik = useFormik({
    initialValues: {
      comment: "",
      vote: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onVote(values.comment, values.vote);
      if (connection && connection.state === "Connected") {
        connection.invoke("VoteForReview", parseInt(meetingId));
      }
      formik.resetForm();
    },
  });

  return (
    <Dialog
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: "10px" } }}
      onClose={onClose}
      open={open}
    >
      <CustomDialogTitle onClose={onClose}>
        ĐÁNH GIÁ KẾT QUẢ HỌC CỦA
      </CustomDialogTitle>
      <DialogContent>
        <Box component={"form"} onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
            }}
          >
            <FormControl
              sx={{
                flex: 1,
              }}
            >
              <TextField
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                placeholder="Nêu cảm nhận của bạn"
                multiline
                rows={10}
                maxRows={10}
              />
            </FormControl>
            <FormControl>
              <RadioGroup
                name="vote"
                value={formik.values.vote}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Rất tệ"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Khá tệ"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Bình thường"
                />
                <FormControlLabel value="4" control={<Radio />} label="Tốt" />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Rất tốt"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ marginLeft: "auto", display: "inherit" }}
          >
            Gửi đánh giá
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

VoteFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

VoteFormDialog.defaultProps = {
  open: false,
};

export default VoteFormDialog;
