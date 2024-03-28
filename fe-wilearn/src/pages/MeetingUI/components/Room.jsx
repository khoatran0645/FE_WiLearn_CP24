/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import MeetingAvatar from "./MeetingAvatar";
import VideoPlayer from "./VideoPlayer";
import { RoomContext } from "../context/roomContext";
import peersReducer from "../../../app/reducer/peersReducer/peersReducer";
import { getReviewInfos } from "../../../app/reducer/voteReducer/votesActions";
import { useDispatch } from "react-redux";

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
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [connection, setConnection] = useState();
  const [connectionState, setConnectionState] = useState();
  const [voting, setVoting] = useState();
  const dispatcher = useDispatch();

  const handleGetListVoting = async () => {
    const votingResponse = await dispatcher(getReviewInfos(meetingId));
    if (votingResponse) {
      setVoting(votingResponse);
    }
  };

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
  const othersCount = Object.values(peersToShowRC).filter((otherPeers) => !!otherPeers.stream).length;
  const vidGrid = (stream, streamUsername, key) => {
    //4x4: 10-16
    let width = 1;
    //1-1: 1x1
    if (othersCount == 1|| othersCount == 0) {
      width = 12;
    }
    //2-2: 2x1
    else if (othersCount == 2) {
      width = 6;
    }
    //3-4: 2x2
    else if (othersCount == 3) {
      width = 4;
    }
    //5-6: 3x2
    else if (othersCount < 9) {
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
        othersCount===0 && screenSharingVideo && vidGrid(screenSharingVideo, "You")
      }
      {
        othersCount===0 && screenSharingId !== me?.id && vidGrid(stream, "You")
      }
      {Object.values(peersToShowRC)
        .filter((otherPeers) => !! otherPeers.stream)
        .map((otherPeer) => (
          <>
            {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
            {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
          </>
        ))}
    </Grid>
  );
};
