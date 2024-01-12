import React, { createContext, useEffect, useReducer, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import socketIOClient from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { peersReducer } from "src/reducers/peersReducer";
import {
  addPeerStreamAction,
  addPeerNameAction,
  removePeerStreamAction,
  addAllPeersActions,
} from "src/reducers/peersActions";
import { chatReducer } from "src/reducers/chatReducer";
import {
  addMessageAction,
  addHistoryAction,
  toggleChatAction,
} from "src/reducers/chatActions";
import { getReviewInfos } from "./actions";
import { useDispatch } from "react-redux";

export const RoomContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [me, setMe] = useState();
  const [meId, setMeId] = useState();
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });
  const [stream, setStream] = useState();
  const [screenSharingId, setScreenSharingId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName"),
    ""
  );
  const [isSharing, setIsSharing] = useState(false);
  const [onVoteChange, setOnVoteChange] = useState(false);
  const [connection, setConnection] = useState();
  const dispatcher = useDispatch();
  // const [connection, setConnection] = useState();

  const handleVoteChange = (meetingId) => {
    dispatcher(getReviewInfos(meetingId));
    setOnVoteChange(!onVoteChange);
  };

  const enterRoom = ({ roomId }) => {
    navigate(`/study-group/${groupId}/meeting/${roomId}`);
  };

  const handleUserList = ({ participants }) => {
    dispatch(addAllPeersActions(participants));
  };

  const removePeer = (peerId) => {
    // alert('removePeer' + peerId);
    dispatch(removePeerStreamAction(peerId));
  };

  const switchStream = (stream) => {
    setStream(stream);
    Object.values(me?.connections).forEach((connection) => {
      const videoTrack = stream
        ?.getTracks()
        .find((track) => track.kind === "video");
      connection[0].peerConnection
        .getSenders()[1]
        .replaceTrack(videoTrack)
        .catch((err) => console.log(err));
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      setIsSharing(false);
      setScreenSharingId("");
      // setScreenSharingId(null);
      // window.location.reload(false);
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else {
      // navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
      navigator.mediaDevices.getDisplayMedia({}).then((newStream) => {
        const audio = stream.getAudioTracks()[0];
        newStream.addTrack(audio);
        switchStream(newStream);
      });
      setIsSharing(true);
      setScreenSharingId(me?.id || "");
    }
  };

  const handleCreateVote = async () => {
    // call api api/review/start
    // setIsSharing(true);
    // console.log('handleCreateVote', isSharing);
    // shareScreen();
  };

  const handleEndVote = async () => {
    // call api api/review/end
    // setIsSharing(false);
    // shareScreen();
  };

  const handleIsSharingChange = (value) => {
    setIsSharing(value);
  };

  const sendMessage = (message) => {
    const messageData = {
      content: message,
      timestamp: new Date().getTime(),
      author: me?.id,
      userName: userName,
    };
    chatDispatch(addMessageAction(messageData));
  };
  const addMessage = (message) => {
    chatDispatch(addMessageAction(message));
  };

  const addHistory = (messages) => {
    chatDispatch(addHistoryAction(messages));
  };

  const toggleChat = () => {
    chatDispatch(toggleChatAction(!chat?.isChatOpen));
  };

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    const meId = uuidV4();
    setMeId(meId);
    // const peer = new Peer(meId, {
    //   config: {
    //     iceServers: [
    //       {
    //         urls: "stun:stun.l.google.com:19302",
    //       },
    //       {
    //         urls: "turn:numb.viagenie.ca",
    //         username: "webrtc@live.com",
    //         credential: "muazkh",
    //       },
    //     ],
    //   },
    // });
    const peer = new Peer(meId);
    setMe(peer);
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
        if(!stream){
          navigator.mediaDevices.getDisplayMedia({}).then((newStream) => {
            // switchStream(newStream);
            setStream(newStream);
          });
          setIsSharing(true);
        }
    } catch (err) {
      console.error({ err });
    }

    // if (connection && roomId) {
    //   connection.on('UserOnlineInMeeting', handleUserOnlineInMeeting);
    // }
  }, []);

  const toogleSound = (isActive) => {
    if (stream.getAudioTracks()[0]) {
      stream.getAudioTracks()[0].enabled = isActive;
    }
  };

  const toogleVid = (isActive) => {
    if (stream.getVideoTracks()[0]) {
      stream.getVideoTracks()[0].enabled = isActive;
    }
  };

  const userJoin = ({ peerId, userName: name }) => {
    dispatch(addPeerNameAction(peerId, name));
    const call =
      stream &&
      me.call(peerId, stream, {
        metadata: {
          userName,
        },
      });
    call.on("stream", (userVideoStream) => {
      dispatch(addPeerStreamAction(peerId, userVideoStream));
      //new
      // const audio = document.createElement('audio');
      // audio.style.display = 'none';
      // document.body.appendChild(audio);

      // audio.srcObject = userVideoStream;
      // audio.play();
    });
  };

  useEffect(() => {
    if (!stream) return;
    if (!me) return;

    //   dispatch(addPeerNameAction(peerId, name));
    //   const call =
    //     stream &&
    //     me.call(peerId, stream, {
    //       metadata: {
    //         userName
    //       }
    //     });
    //   call.on('stream', (userVideoStream) => {
    //     console.log('onstream');
    //     dispatch(addPeerStreamAction(peerId, userVideoStream));
    //   });
    // });

    me.on("call", (call) => {
      const { userName } = call.metadata;
      dispatch(addPeerNameAction(call.peer, userName));
      call.answer(stream);
      call.on("stream", (userVideoStream) => {
        dispatch(addPeerStreamAction(call.peer, userVideoStream));
        //new
        // const audio = document.createElement('audio');
        // audio.style.display = 'none';
        // document.body.appendChild(audio);

        // audio.srcObject = userVideoStream;
        // audio.play();
      });
    });
  }, [stream, me, userName]);

  return (
    <RoomContext.Provider
      value={{
        me,
        peers,
        stream,
        shareScreen,
        screenSharingId,
        setRoomId,
        sendMessage,
        chat,
        toggleChat,
        userName,
        setUserName,
        handleCreateVote,
        isSharing,
        handleEndVote,
        handleUserList,
        handleVoteChange,
        setConnection,
        meId,
        connection,
        //new
        addMessage,
        userJoin,
        removePeer,
        addHistory,
        toogleSound,
        toogleVid,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
