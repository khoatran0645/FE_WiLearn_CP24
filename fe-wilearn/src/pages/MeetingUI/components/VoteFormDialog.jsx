/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
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
import CustomDialogTitle from "./CustomDialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
// import Button from "src/components/Button";
import { RoomContext } from "../context/roomContext";
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
        Evaluate
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
                placeholder="Leave your comment"
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
                  label="Very bad"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Bad"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Average"
                />
                <FormControlLabel 
                  value="4" 
                  control={<Radio />} 
                  label="Good" 
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Very good"
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
            Send
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
