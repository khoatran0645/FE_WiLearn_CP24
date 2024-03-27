/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import MeetingAvatar from "./MeetingAvatar";
import VideoPlayer from "./VideoPlayer";
import { RoomContext } from "../context/roomContext";
import peersReducer from "../../../app/reducer/peersReducer/peersReducer";
import { getReviewInfos } from "../../../app/reducer/voteReducer/votesActions";
// import UserPaper from "src/components/UserPaper";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { BE_URL } from "src/common/constants";

export const Room = () => {
  const { meetingId } = useParams();
  const {
    
    ws,
    peers: peersRC, 
    me,
    stream,
    screenSharingId,
    setRoomId,
    userName,
    meId,
    handleUserList,
    handleVoteChange,
    setConnection: setContextConnection,
  } = useContext(RoomContext);
  // const peersRC = useContext(RoomContext).peers;
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [connection, setConnection] = useState();
  const [connectionState, setConnectionState] = useState();
  const [voting, setVoting] = useState();
  // const { addMessage, userJoin, removePeer, addHistory } =
  //   useContext(RoomContext);
  const dispatcher = useDispatch();

  const handleGetListVoting = async () => {
    const votingResponse = await dispatcher(getReviewInfos(meetingId));
    if (votingResponse) {
      setVoting(votingResponse);
    }
  };

  // useEffect(() => {
  //   // const accessTokenFactory = localStorage.getItem("token");
  //   // if (meetingId) {
  //   //   const newConnect = new HubConnectionBuilder()
  //   //     // .withUrl('http://localhost:8000/hubs/meetinghub?meetingId=' + meetingId, {
  //   //     .withUrl(BE_URL + "/hubs/meetinghub?meetingId=" + meetingId, {
  //   //       accessTokenFactory: () => accessTokenFactory,
  //   //     })
  //   //     .build();

  //   //   newConnect.on("add-message", (message) => {
  //   //     toast.info("Có tin nhắn mới");
  //   //     addMessage(message);
  //   //   });

  //   //   // newConnect.on('user-joined', userJoin);
  //   //   newConnect.on("user-joined", (newUser) => {
  //   //     toast.info(newUser.userName + " vào phòng học");
  //   //     userJoin(newUser);
  //   //   });
  //   //   newConnect.on("user-disconnected", (peerId, userName) => {
  //   //     toast.info(userName + " rời phòng học");
  //   //     removePeer(peerId);
  //   //   });
  //   //   newConnect.on("get-messages", addHistory);

  //   //   if (meId) {
  //   //     newConnect.start().then(() =>
  //   //       newConnect.invoke("JoinRoom", {
  //   //         roomId: meetingId,
  //   //         peerId: meId,
  //   //         username: userName,
  //   //       })
  //   //     );
  //   //     setConnection(newConnect);
  //   //     setConnectionState(newConnect.state);
  //   //   }
  //   // }
  // }, [meetingId, meId]);

  useEffect(() => {
    if (connection && connection !== undefined) {
      // get list users in room
      connection.on("get-users", (participants) => {
        handleUserList(participants);
      });
      setContextConnection(connection);
    }
  }, [connection]);

  useEffect(() => {
    setRoomId(meetingId);
  }, [meetingId, setRoomId]);

  useEffect(() => {
    if (meetingId && connection && connection !== undefined) {
      handleGetListVoting();
    }
  }, [meetingId, connection]);

  useEffect(() => {
    if (screenSharingId === null) {
      window.location.reload(false);
    }
  }, [screenSharingId]);

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

  // eslint-disable-next-line no-unused-vars
  const { [screenSharingId]: sharing, ...peersToShow } = peers;
  const { [screenSharingId]: sharingRC, ...peersToShowRC } = peersRC;
  // const loadOtherVids = () => {
  //   return Object.values(peersToShow)
  //     .filter((otherPeers) => !!otherPeers.stream)
  //     .map((otherPeer) => (
  //       // <UserPaper key={peer.id} stream={peer.stream} name={peer.userName} />
  //       // <Box key={otherPeer.id}>
  //       //   <VideoPlayer stream={otherPeer.stream} />
  //       //   <Box>{otherPeer.userName}</Box>
  //       // </Box>
  //       Ok
  //     ));
  // };
  const vidGrid = (stream, streamUsername, key) => {
    console.log("Other ppl", peersToShowRC);
    const count =
      Object.values(peersToShowRC).filter((otherPeers) => !!otherPeers.stream)
        .length + 1;
    //4x4: 10-16
    let width = 1;
    //1-1: 1x1
    if (count == 1) {
      width = 9;
    }
    //2-2: 2x1
    else if (count == 2) {
      width = 6;
    }
    //3-4: 2x2
    else if (count == 3) {
      width = 4;
    }
    //5-6: 3x2
    else if (count < 9) {
      width = 3;
    }
    //7-8: 4x2
    else {
      width = 2;
    }
    return (
      <Grid item xs={width} key={key}>
        <Box>
          <Box>
            <MeetingAvatar>
              <VideoPlayer
                stream={stream}
                muted={streamUsername === userName}
              />
            </MeetingAvatar>
            <Box>{streamUsername}</Box>
          </Box>
        </Box>
      </Grid>
    );
  };
  return (
    <Grid container spacing={1}>
      {
        screenSharingVideo && vidGrid(screenSharingVideo, userName)
        // <Grid item xs={() => vidFrameSize()}>
        // <Grid item xs={9}>
        //   <Box>
        //     <Box>
        //       <MeetingAvatar>
        //         <VideoPlayer stream={screenSharingVideo} />
        //       </MeetingAvatar>
        //       <Box>{userName}</Box>
        //     </Box>
        //   </Box>
        // </Grid>
      }
      {
        screenSharingId !== me?.id && vidGrid(stream, userName)
        // (
        //   <Grid item xs={3}>
        //     <Box>
        //       <MeetingAvatar>
        //         <VideoPlayer stream={stream} />
        //       </MeetingAvatar>
        //       <Box>{userName}</Box>
        //     </Box>
        //   </Grid>
        // )
      }
      {/* {loadOtherVids()} */}
      {Object.values(peersToShowRC)
        .filter((otherPeers) => !!otherPeers.stream)
        .map((otherPeer) => (
          <>
            {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
          </>
          // (
          //   <Grid item xs={() => vidFrameSize()} key={otherPeer.id}>
          //     <Box>
          //       <MeetingAvatar>
          //         <VideoPlayer stream={otherPeer.stream} />
          //       </MeetingAvatar>
          //       <Box>{otherPeer.userName}</Box>
          //     </Box>
          //   </Grid>
          // )
        ))}
      {/* {Object.values(peersToShowRC)
        .filter((peer) => !!peer.stream)
        .map((peer) => (
          <>
            {peersToShow.length}
            {peer.userName}
            <UserPaper key={peer.id} stream={peer.stream} name={peer.userName} />
          </>
        ))} */}
    </Grid>
  );
};
