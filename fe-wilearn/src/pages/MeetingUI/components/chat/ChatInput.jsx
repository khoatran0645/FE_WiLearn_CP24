import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import SendIcon from "@mui/icons-material/Send";
import { RoomContext } from "../../context/roomContext";

const ChatInput = () => {
  const { me, connection } = useContext(RoomContext);
  const roomId = window.location.href.split("/").pop();
  useEffect(() => {
    const accessTokenFactory = localStorage.getItem("token");
    try {
      meetHub.stop().catch((error) => console.log(error));
      setMeetHub(null);
    } catch (err) {}
  }, []);

  const formik = useFormik({
    initialValues: {
      txt: "",
    },
    onSubmit: async (values) => {
      // sendMessage(values.txt);
      const userName = localStorage.getItem("userName");
      const messageData = {
        roomId: roomId,
        content: values.txt,
        timestamp: new Date().toLocaleTimeString().toString(),
        // timestamp: new Date().getTime().toString(),
        // author: userName,
        author: me?.id,
        userName: userName,
      };
      // meetHub.invoke("SendMessage", messageData);
      connection.invoke("SendMessage", messageData);
      // meetHub.invoke('SendMessage', null);
      formik.setFieldValue("txt", "");
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", gap: "8px" }}
      // sx={{ display: "flex" }}
    >
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            padding: "8px 12px",
          },
        }}
        // multiline
        // rows={1}
        fullWidth={true}
        size="small"
        name="txt"
        value={formik.values.txt}
        onChange={formik.handleChange}
        error={formik.touched.txt && Boolean(formik.errors.txt)}
        helperText={formik.touched.txt && formik.errors.txt}
      />
      <Button variant="contained" type="submit" endIcon={<SendIcon />}>
        Gửi
      </Button>
    </Box>
  );
};

ChatInput.propTypes = {};

export default ChatInput;
