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
import {
  Avatar,
} from "@mui/material";

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
    focusScreenList,
    showAvaList,

  } = useContext(RoomContext);
  // const [peers, dispatch] = useReducer(peersReducer, {});
  const peers = useSelector(state => state.peers)
  const [connection, setConnection] = useState();
  const [voting, setVoting] = useState();
  const dispatcher = useDispatch();

  const handleGetListVoting = async () => {
    const votingResponse = await dispatcher(getReviewInfos(meetingId));
    if (votingResponse) {
      setVoting(votingResponse);
    }
  };

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
  // const { [screenSharingId]: sharingRC, ...peersToShowRC } = peers;
  const { [meId]: sharingRC, ...peersToShowRC } = peers;
  const peersToShowRcObj = Object.values(peersToShowRC).filter((otherPeers) => !!otherPeers.stream);
  // const { [screenSharingId]: sharing, ...peersToShow } = peersRC;
  const othersCount = peersToShowRcObj.length;
  const isPeerIdFocus = (peerId) => {
    console.log("isPeerIdFocus focusScreenList", focusScreenList)
    console.log("isPeerIdFocus peerId", peerId)
    return focusScreenList.some(focus => focus.peerId == peerId)
  }
  const addFocusActionsToUsername = (peerId, uname) => {
    let actionsString = null;
    focusScreenList.forEach(focus => {
      console.log("addFocusActionsToUsername focusScreenList.forEach focus", focus)
      if (focus.peerId == peerId) {
        actionsString = focus.actions.join(", ")
      }
    });
    if (actionsString) {
      if (uname == userName || uname == "You") {
        return `You are ${actionsString}`
      }
      return `${uname} is ${actionsString}`
    }
    return uname == userName?"You":uname
  }

  // const focusPeer = peersToShowRcObj.filter((peer)=>)

  const vidGrid = (stream, streamName, peerId, count = othersCount) => {
    //4x4: 10-16
    let width = 1;
    if (count == 1 || count == 0) {
      //1-1: 1x1
      width = 8;
    }
    else if (count == 2) {
      //2-2: 2x1
      width = 6;
    }
    else if (count == 3) {
      //3-4: 2x2
      width = 3;
    }
    else if (count < 9) {
      //5-6: 3x2
      width = 3;
    }
    else {
      //7-8: 4x2
      width = 2;
    }
    let ava =  showAvaList.find(focus => focus.peerId == peerId);
    if(meId==peerId && focusScreenList.find(f=>f.peerId == meId)){
      ava=false;
    }
    console.log("vidGrid cam", ava)
    return (
      <Grid item xs={width} key={peerId} 
      sx={{
        transition: 'all 2s ease',
      }}
      >
        <Box>
          <Box>
            <MeetingAvatar>
              {
                ava &&(
                  <Avatar
                  alt={streamName==="You"? "You're avatar": `${streamName}'s avatar`}
                  src={ava?.imagePath}
                  sx={{ width: '50%', height:'50%' }}
                  />
                )
              }
              <VideoPlayer
                stream={stream}
                muted={streamName === userName || streamName === "You"}
                height={ava?"0px":"100%"}
                sx={{
                  // height: "",
                  // height: (ava?"0px":"0px"),
                  // transition: 'all 1s ease-in-and-out',
                }}
              />
            <Box>{addFocusActionsToUsername(peerId ,streamName)}</Box>
            </MeetingAvatar>
          </Box>
        </Box>
      </Grid>
    );
  };
  const vidGridWithAction = (stream, streamName, peerId, actions, count = othersCount) => {
    //4x4: 10-16
    let width = 1;
    if (count == 1 || count == 0) {
      //1-1: 1x1
      width = 8;
    }
    else if (count == 2) {
      //2-2: 2x1
      width = 6;
    }
    else if (count == 3) {
      //3-4: 2x2
      width = 3;
    }
    else if (count < 9) {
      //5-6: 3x2
      width = 3;
    }
    else {
      //7-8: 4x2
      width = 2;
    }
    console.log("actions", actions)
    const ava = !actions.includes("sharing screen") &&  showAvaList.find(focus => focus.peerId == peerId);
    // const ava =   showAvaList.find(focus => focus.peerId == peerId);
    console.log("vidGridWithAction cam", ava)
    return (
      <Grid item xs={width} key={peerId} 
        sx={{
          transition: 'all 2s ease',
        }}
      >
        <Box>
          <Box>
            <MeetingAvatar>
              {
                ava &&(
                  <Avatar
                  alt={streamName==="You"? "You're avatar": `${streamName}'s avatar`}
                  src={ava?.imagePath}
                  sx={{ width: '60%', height:'60%' }}
                  />
                )
              }
              <VideoPlayer
                stream={stream}
                muted={streamName === userName || streamName === "You"}
                height={ava?"0px":"100%"}
                sx={{
                  // height: "0px",
                  // height:(ava?"0px":"0px"),
                  // transition: 'all 1s ease-in-and-out',
                }}
              />
            <Box>{streamName==="You"? "You are ": `${streamName} is `}{actions}</Box>
            </MeetingAvatar>
          </Box>
        </Box>
      </Grid>
    );
  };
  return (
    <>
      <Transition
        in={othersCount == 0}
        timeout={2000}
      >
        {state => (
          <Grid container spacing={1} alignItems="center" display={"flex"} justifyContent="center"
            sx={{
              transition: 'all 2s ease',
              // display: (state === 'exited' || state === 'exiting')?"none":"",
              opacity: (state === 'exited' || state === 'exiting') ? 0 : 1,
              height: (state === 'exited' || state === 'exiting') ? "0px" : "100%",
              overflow: 'hidden'
            }}
          >
            {
              screenSharingVideo && vidGrid(screenSharingVideo, "You", meId, 1)
            }
            {
              screenSharingId !== me?.id && vidGrid(stream, "You", meId, 1)
            }
          </Grid>
        )}
      </Transition>
      <Transition
        in={othersCount != 0 && focusScreenList.length==0}
        timeout={2000}
      >
        {state => (
          <Grid container spacing={1} alignItems="center" display={"flex"} justifyContent="center"
            sx={{
              transition: 'all 2s ease',
              // display: (state === 'exited' || state === 'exiting')?"none":"",
              opacity: (state === 'exited' || state === 'exiting') ? 0 : 1,
              height: (state === 'exited' || state === 'exiting') ? "0px" : "100%",
              overflow: 'hidden'
            }}
          >
            {peersToShowRcObj.map((otherPeer) => (
              <>
                {vidGrid(otherPeer.stream, otherPeer.userName, otherPeer.id, othersCount)}
              </>
            ))}
          </Grid>
        )}
      </Transition>
      <Transition
        in={othersCount != 0 && focusScreenList.length!=0}
        timeout={2000}
      >
        {state => {
          const peersObj = Object.values(peers).filter((peer) =>!!peer.stream);
          const peersObjMapped = Object.values(peers)
          .map(peer=>{
            console.log("focusScreenList", focusScreenList)
            console.log("peer", peer)
            const focus = focusScreenList.find(f=>f.peerId == peer.id)
            if(focus){
              const uname = peer.userName== userName? "You": peer.userName;
              const mappedPeer ={stream: peer.stream, id: peer.id, userName: uname, actions: focus.actions.join(", ")}
              return mappedPeer
            }
            return null;
          })
          .filter((peer) =>peer!=null && !!peer.stream);
          console.log("peersObjMapped", peersObjMapped)
          return(
            <Grid container spacing={1} alignItems="center" display={"flex"} justifyContent="center"
              sx={{
                transition: 'all 2s ease',
                // display: (state === 'exited' || state === 'exiting')?"none":"",
                opacity: (state === 'exited' || state === 'exiting') ? 0 : 1,
                height: (state === 'exited' || state === 'exiting') ? "0px" : "100%",
                overflow: 'hidden'
              }}
            >
              {peersObjMapped.map((peer) => (
                <>
                  {vidGridWithAction(peer.userName=="You"?stream: peer.stream, peer.userName, peer.id, peer.actions,peersObjMapped.length)}
                </>
              ))}
            </Grid>
        )}}
      </Transition>
    </>
  );
};
