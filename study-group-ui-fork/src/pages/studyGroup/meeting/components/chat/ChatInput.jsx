import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { RoomContext } from "src/context/roomContext";
import SendIcon from "@mui/icons-material/Send";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "src/common/constants";
// import { useParams } from 'react-router-dom';

const ChatInput = () => {
  // const [meetHub, setMeetHub] = useState();
  // const { addMessage, me } = useContext(RoomContext);
  const { me, connection } = useContext(RoomContext);
  // const { sendMessage } = useContext(RoomContext);
  const roomId = window.location.href.split("/").pop();
  useEffect(() => {
    const accessTokenFactory = localStorage.getItem("token");
    // alert(meetHub != null);
    // if (meetHub != null) {
    // alert('meethub exsit');
    try {
      meetHub.stop().catch((error) => console.log(error));
      setMeetHub(null);
    } catch (err) {}
    // }
    // if (meetHub) {
    // const newConnect = new HubConnectionBuilder()
    //   // .withUrl('http://localhost:8000/hubs/meetinghub?tempConnection=ok&meetingId=' + roomId, {
    //   .withUrl(
    //     BE_URL + "/hubs/meetinghub?tempConnection=ok&meetingId=" + roomId,
    //     {
    //       accessTokenFactory: () => accessTokenFactory,
    //     }
    //   )
    //   .withAutomaticReconnect()
    //   .build();
    // newConnect.start().catch((err) => console.log(err));

    // newConnect.on('add-message', (message) => {
    //   console.log('\n\nadd-message');
    //   console.log(message);
    //   addMessage(message);
    // });
    // setMeetHub(newConnect);
    // }
    // return () => {
    //   newConnect.stop().catch((error) => console.log(error));
    //   setMeetHub(null);
    // };
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
    >
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            padding: "8px 12px",
          },
        }}
        multiline
        rows={1}
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
