/* eslint-disable no-unused-vars */
import { Box, Grid } from "@mui/material";
import React, { useContext, useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import MeetingAvatar from "./MeetingAvatar";
import VideoPlayer from "./VideoPlayer";
import { RoomContext } from "../context/roomContext";
import peersReducer from "../../../app/reducer/peersReducer/peersReducer";
import { getReviewInfos } from "../../../app/reducer/voteReducer/votesActions";
import { useDispatch, useSelector } from "react-redux";
import Transition from "react-transition-group/Transition";

export const Room = () => {
  const { meetingId } = useParams();
  const {

    ws,
    // peers: peersRC, 
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
  // const [peers, dispatch] = useReducer(peersReducer, {});
  const peers = useSelector(state => state.peers)
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
  const { [screenSharingId]: sharingRC, ...peersToShowRC } = peers;
  // const { [screenSharingId]: sharing, ...peersToShow } = peersRC;
  const othersCount = Object.values(peersToShowRC).filter((otherPeers) => !!otherPeers.stream).length;

  const vidGrid = (stream, streamName, key, transitionState = (othersCount == 0)) => {
    //4x4: 10-16
    let width = 1;
    if (othersCount == 1 || othersCount == 0) {
      //1-1: 1x1
      width = 12;
    }
    else if (othersCount == 2) {
      //2-2: 2x1
      width = 6;
    }
    else if (othersCount == 3) {
      //3-4: 2x2
      width = 4;
    }
    else if (othersCount < 9) {
      //5-6: 3x2
      width = 3;
    }
    else {
      //7-8: 4x2
      width = 2;
    }
    return (
    //   <Transition
    //     in={transitionState}
    //     timeout={2000}
    //   >
    //     {state => (
      <Grid item xs={width} key={key} sx={{
        transition: 'all 2s ease',
        // opacity: (state === 'exited' || state === 'exiting')?0:1
      }}>
        <Box>
          <Box>
            <MeetingAvatar>
              <VideoPlayer
                stream={stream}
                muted={streamName === userName || streamName === "You"}
                sx={{
                  transition: 'all 1s ease-in-and-out',
                }}
                />
                </MeetingAvatar>
            <Box>{streamName}</Box>
          </Box>
        </Box>
      </Grid>

      //   )}
      // </Transition> 
    );
  };
  return (
    <>
      <Transition
        in={othersCount == 0}
        timeout={2000}
      >
        {state => (
          <Grid container spacing={1}
            sx={{
              transition: 'all 2s ease',
              // display: (state === 'exited' || state === 'exiting')?"none":"",
              opacity: (state === 'exited' || state === 'exiting')?0:1,
              height: (state === 'exited' || state === 'exiting')?"0px":"100%",
              overflow: 'hidden'
            }}
          >
            {
              screenSharingVideo && vidGrid(screenSharingVideo, "You", (othersCount == 0))
            }
            {
              screenSharingId !== me?.id && vidGrid(stream, "You", (othersCount == 0))
            }
            {Object.values(peersToShowRC)
              .filter((otherPeers) => !!otherPeers.stream)
              .map((otherPeer) => (
                <>
                  {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id, (othersCount != 0))}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                </>
              ))}
          </Grid>
        )}
      </Transition>
      <Transition
        in={othersCount != 0}
        timeout={2000}
      >
        {state => (
          <Grid container spacing={1}
            sx={{
              transition: 'all 2s ease',
              // display: (state === 'exited' || state === 'exiting')?"none":"",
              opacity: (state === 'exited' || state === 'exiting')?0:1,
              height: (state === 'exited' || state === 'exiting')?"0px":"100%",
              overflow: 'hidden'
            }}
          >
            {Object.values(peersToShowRC)
              .filter((otherPeers) => !!otherPeers.stream)
              .map((otherPeer) => (
                <>
                  {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id, (othersCount != 0))}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                  {/* {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id)} */}
                </>
              ))}
          </Grid>
        )}
      </Transition>
    </>
  );
};
