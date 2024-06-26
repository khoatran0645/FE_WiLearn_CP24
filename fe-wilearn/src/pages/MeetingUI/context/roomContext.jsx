import React, { createContext, useEffect, useReducer, useState } from "react";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import { useNavigate, useParams } from "react-router-dom";
// import { peersReducer } from "src/reducers/peersReducer";
import {
  addPeerStreamAction,
  addPeerNameAction,
  removePeerStreamAction,
  addAllPeersActions,
  removeAllPeerAction,
} from "../../../app/reducer/peersReducer/peersActions";
import { chatReducer } from "../../../app/reducer/chatReducer/chatReducer";
import {
  addMessageAction,
  addHistoryAction,
} from "../../../app/reducer/chatReducer/chatActions";
import { clearVoteData, getReviewInfos } from "../../../app/reducer/voteReducer/votesReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BE_URL } from "../../../constants";

export const RoomContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [isReviewing, setIsReviewing] = useState(false);
  const [focusList, setFocusList] = useState([]);
  const [focusScreenList, setFocusScreenList] = useState([]);
  const [showAvaList, setShowAvaList] = useState([]);
  const [me, setMe] = useState();
  const [shareScreenTrack, setShareScreenTrack] = useState();
  const [meId, setMeId] = useState();
  // const [peers, dispatch] = useReducer(peersReducer, {});
  const peers = useSelector((state) => state.peers)
  const dispatch = useDispatch();
  const [chat, chatDispatch] = useReducer(chatReducer, {
    messages: [],
    isChatOpen: false,
  });
  const { userInfo } = useSelector(state => state.user)
  const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
  };

  const createEmptyVideoTrack = async ({ width, height }) => {
    const canvas = Object.assign(document.createElement('canvas'), { width, height });
    // canvas.getContext('2d').fillRect(0, 0, width, height);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";

    ctx.fillText("No video", canvas.width / 2, canvas.height / 2);
    const canvasStream = canvas.captureStream(25);
    // const track = stream.getVideoTracks()[0];

    // return Object.assign(track, { enabled: false });
    // return stream.getVideoTracks().map((track)=>Object.assign(track, { enabled: true }))
    const video = document.createElement("video");
    video.muted = true;
    video.srcObject = canvasStream;
    var video_tracks = [];
    // video.play().then(() => {
    //   // alert("video.play")
    //   const video_stream = video.captureStream ? video.captureStream(25) : video.mozCaptureStream();
    //   console.log("video_stream", video_stream)
    //   console.log("video_stream", video_stream.getVideoTracks());
    //   video_tracks = video_stream.getVideoTracks();
    //   console.log("video_tracks", video_tracks); // [object MediaStreamTrack], {...}
    //   alert("Finnish convert");
    // }).catch((err)=>{
    //   alert("convert error")
    //   console.log("convert error", err)
    // });
    await video.play();
    // alert("video.play")
    const video_stream = video.captureStream ? video.captureStream(25) : video.mozCaptureStream();
    console.log("video_stream", video_stream)
    console.log("video_stream", video_stream.getVideoTracks());
    video_tracks = video_stream.getVideoTracks();
    console.log("video_tracks", video_tracks); // [object MediaStreamTrack], {...}
    // alert("Finnish convert");
    console.log("video_tracks 2", video_tracks);
    return video_tracks;
    // return canvasStream.getVideoTracks();
  };
  const createEmptyVideoStream = async () => {
    const audioTrack = createEmptyAudioTrack();
    const videoTrack = await createEmptyVideoTrack({ width: 640, height: 480 });
    console.log("videoTrack", videoTrack);
    // const mediaStream = new MediaStream([audioTrack, videoTrack]);
    const mediaStream = new MediaStream([...videoTrack, audioTrack]);
    return mediaStream;
  }
  const createEmptyVideoStreamNew = async () => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Allow accessing images from other origins
      img.src = url;
      await img.decode(); // Wait for the image to load completely
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const stream = canvas.captureStream(1);
      const track = stream.getVideoTracks()[0];
      const mediaStream = new MediaStream([track]);
      return mediaStream
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
  const [defaultStream, setDefaultStream] = useState(null);
  const [camStream, setCamStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [stream, setStream] = useState();
  // const [stream, setStream] = useState();
  // const [stream, setStream] = useState(async()=>{
  //   await createEmptyVideoStream()});
  const [screenSharingId, setScreenSharingId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState(
    localStorage.getItem("userName"),
    ""
  );
  const [isSharing, setIsSharing] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [onVoteChange, setOnVoteChange] = useState(false);
  const [connection, setConnection] = useState();
  const [isRaiseHand, setIsRaiseHand] = useState(false);
  const dispatcher = useDispatch();

  // const [connection, setConnection] = useState();


  const setUpLeave = () => {
    try {
      connection && connection.invoke("LeaveRoom", {
        roomId: roomId,
        peerId: meId,
      }).then(() => {
        // toast.success("Đã rời phòng thành công");
        toast.success("Left meeting successfully");
        //reset roomId
        setRoomId("");
        //reset peers state
        removeAllPeers();
        //reset chat state
        dispatch(clearVoteData());
        //if sharing screen, stop sharing
        if (shareScreenTrack) {
          shareScreenTrack.stop()
          setShareScreenTrack(null)
          setIsSharing(false);
          setScreenSharingId("")
        }
        //reset signalRHub
        connection && connection.stop()
          .then(() => setConnection(null))
          .catch((error) => {
            console.log("connection.stop error", error)
          });
        //reset peers
        me && me.destroy();
        setMe(null);
        //reset stream
        setStream(null);
        //turn off cam
        try{
          if (camStream.getVideoTracks()) {
            camStream.getVideoTracks().forEach(camVidTrack => {
              camVidTrack.stop()
            });
          }
        }
        catch(e){}
        try{
          if (camStream.getAudioTracks()) {
            camStream.getAudioTracks().forEach(camSoundTrack => {
              camSoundTrack.stop()
            });
          }
        }
        catch(e){}
        return true;
      })
        .catch((error) => {
          // toast.error("Lỗi khi rời phòng")
          console.log("connection.stop error", error);
          return false
        });
    } catch (error) {
      console.log("setUpLeave error", error);
      // toast.error("Đã xảy ra lỗi khi rời phòng");
      return false
    }
  }

  const handleVoteChange = (meetingId) => {
    dispatcher(getReviewInfos(meetingId));
    setOnVoteChange(!onVoteChange);
  };

  const enterRoom = ({ roomId }) => {
    navigate(`/groups/${groupId}/meeting/${roomId}`);
  };

  const handleUserList = ({ participants }) => {
    dispatch(addAllPeersActions(participants));
    console.log('peers reducer addAllPeersActions', peers);

  };

  const removePeer = (peerId) => {
    // alert('removePeer' + peerId);
    dispatch(removePeerStreamAction(peerId));
    console.log('peers reducer removePeerStreamAction', peers);

  };
  const removeAllPeers = () => {
    // alert('removePeer' + peerId);
    dispatch(removeAllPeerAction());
    console.log('peers reducer removeAllPeers', peers);

  };

  const switchStream = (newStream) => {
    //Lấy audio cũ gắn vô stream screen
    if (stream && stream.getAudioTracks()) {
      stream.getAudioTracks().forEach(audioTrack => {
        newStream.addTrack(audioTrack);
      });
    }
    setStream(newStream);
    try {
      Object.values(me?.connections).forEach((connection) => {
        const videoTrack = newStream
          ?.getTracks()
          .find((track) => track.kind === "video");
        connection[0].peerConnection
          .getSenders()[1]
          .replaceTrack(videoTrack)
          .catch((err) => {
            console.log("switchStream connection[0].peerConnection.getSenders()[1].replaceTrack err", err)
          })
        // console.log("switchStream connection", connection)
        // console.log("switchStream connection[0].peerConnection", connection[0].peerConnection)
        // console.log("switchStream connection[0].peerConnection.getSenders()", connection[0].peerConnection.getSenders())
        // newStream?.getTracks().forEach(videoTrack=>{
        //   connection[0].peerConnection
        //     .getSenders()[1]
        //     .replaceTrack(videoTrack)
        //     .catch((err) => {
        //       console.log("switchStream connection[0].peerConnection.getSenders()[1].replaceTrack err", err)
        //     })
        // })
      });
    } catch (error) {
      console.log("switchStream error", error)
      // toast.error("switchStream error");
    }

  };

  const shareScreen = async () => {
    console.log(`befor screenSharingId:`, screenSharingId)
    // toast.info(`befor screenSharingId:`, screenSharingId)
    //Nếu srceenSharing => hiện tại đang sharescreen => Tắt share screen
    if (screenSharingId) {
      shareScreenTrack.stop();
      setShareScreenTrack(null);
      setIsSharing(false);
      setScreenSharingId("");

      connection.invoke("EndFocus", { roomId: roomId, peerId: meId, action: "sharing screen" })
      if (camStream) {
        switchStream(camStream);
      } else {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((newCamStream) => {
            setCamStream(newCamStream)
            switchStream(newCamStream);
          })
          .catch(async (error) => {
            console.log("Get cam error", error)
            if (!defaultStream) {
              const newDefaultStream = await createEmptyVideoStream();
              setDefaultStream(newDefaultStream)
              switchStream(newDefaultStream);
            } else {
              switchStream(defaultStream);
            }
          });
      }
      //Nếu !srceenSharing => hiện tại đang ko sharescreen => Bật share screen
    } else {
      // navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
      navigator.mediaDevices.getDisplayMedia({})
        .then((newStream) => {
          if (newStream && newStream.getTracks()) {
            const screenTracks = newStream.getTracks();
            const lastScreenTrack = screenTracks[screenTracks.length - 1];

            //Xử lí khi tắt sharescreen bằng nút ngoài app
            lastScreenTrack.addEventListener("ended", () => {
              // alert("end share screen")
              connection.invoke("EndFocus", { roomId: roomId, peerId: meId, action: "sharing screen" })
              setScreenSharingId("");
              setIsSharing(false);   
              
              // setScreenSharingId(null);
              // window.location.reload(false);
              if (camStream) {
                switchStream(camStream);
              }
              else {
                navigator.mediaDevices
                  .getUserMedia({ video: true, audio: true })
                  .then(newCamStream => {
                    setCamStream(newCamStream);
                    switchStream(newCamStream);
                  })
                  .catch(async (error) => {
                    console.log("Get cam error", error)
                    if (!defaultStream) {
                      const newDefaultStream = await createEmptyVideoStream();
                      setDefaultStream(newDefaultStream)
                      switchStream(newDefaultStream);
                    } else {
                      switchStream(defaultStream);
                    }
                  });
              }
            });
            setShareScreenTrack(lastScreenTrack);
            connection.invoke("StartFocus", { roomId: roomId, peerId: meId, action: "sharing screen" })
          }
          // alert('reach here switchStream')
          switchStream(newStream);
          // alert('reach here')
          setIsSharing(true);
          console.log("me: ", me)
          console.log("me: ", me?.id)
          setScreenSharingId(me?.id || "abc");
        });
      // setScreenSharingId(meId);
    }

  };

  const handleCreateVote = async () => {
    // call api api/review/start
    // setIsSharing(true);
    // console.log('handleCreateVote', isSharing);
    // shareScreen();
    connection.invoke("StartFocus", { roomId: roomId, peerId: meId, action: "reviewing" })
  };

  const handleEndVote = async () => {
    // call api api/review/end
    // setIsSharing(false);
    // shareScreen();
    connection.invoke("EndFocus", { roomId: roomId, peerId: meId, action: "reviewing" })
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

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    setup();
    async function setup() {
      if (roomId) {
        //Init stream
        const meId = `${userName}-${uuidV4()}`;
        await setShowAvaList([{ roomId: roomId, peerId: meId, imagePath: userInfo?.imagePath }]);
        dispatch(addPeerNameAction(meId, userName));
        // const meId = uuidV4();
        const stream = await initStream(meId);
        // await initStream(meId);
        console.log("initStream", stream)
        // toast.info("meId kind" + typeof( meId));
        // toast.info("meId " + meId);
        setMeId(meId);
        // const peer = new Peer(meId.toString());
        const peer = new Peer(meId);

        // const peer = new Peer(meId, {
        //   config: {
        //     iceServers: [
        //       {
        //         urls: "stun:stun.l.google.com:19302",
        //       },
        //       // {
        //       //   urls: "turn:numb.viagenie.ca",
        //       //   username: "webrtc@live.com",
        //       //   credential: "muazkh",
        //       // },
        //     ],
        //   },
        // });
        console.log("setup peer", peer)
        peer.on("call", (call) => {
          // toast.info("Peer is call");
          const { userName } = call.metadata;
          dispatch(addPeerNameAction(call.peer, userName));
          console.log('peers reducer addPeerNameAction', peers);
          call.on("stream", (userVideoStream) => {
            // toast.info("Receive video from "+userName)
            console.log('peerOnCallOnStream userVideoStream', userVideoStream);
            dispatch(addPeerStreamAction(call.peer, userVideoStream));
            console.log('peers reducer addPeerStreamAction', peers);
          });
          call.answer(stream);
        });
        console.log("setup peer", peer)
        setMe(peer);
        initSignalR(meId)


      }
    }

  }
    , [roomId]);
  // }, []);
  const initStream = async (meId) => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (stream.getAudioTracks()[0]) {
            stream.getAudioTracks()[0].enabled = false;
          }
          if (stream.getVideoTracks()[0]) {
            stream.getVideoTracks()[0].enabled = false;
          }
          setCamStream(stream)
          setStream(stream);
          return stream;
          // initSignalR(meId)
        })
        .catch(async () => {
          await navigator.mediaDevices
            .getDisplayMedia({})
            .then((newStream) => {

              // switchStream(newStream);
              setStream(newStream);
              setIsSharing(true);
              // setScreenSharingId(me?.id || "");
              setScreenSharingId(meId);
              if (newStream && newStream.getTracks()) {
                const screenTracks = newStream.getTracks();
                const lastScreenTrack = screenTracks[screenTracks.length - 1];
                lastScreenTrack.addEventListener("ended", () => {
                  // alert("end share screen")
                  setScreenSharingId("");
                  setIsSharing(false);
                  // setScreenSharingId(null);
                  if (camStream) {
                    switchStream(camStream)
                  }
                  else {
                    navigator.mediaDevices
                      .getUserMedia({ video: true, audio: true })
                      .then(stream => {
                        switchStream(stream)
                        setCamStream(stream)
                      })
                      .catch(async (error) => {
                        console.log("Get cam error", error)
                        if (!defaultStream) {
                          const newDefaultStream = await createEmptyVideoStream();
                          setDefaultStream(newDefaultStream)
                          switchStream(newDefaultStream);
                        } else {
                          switchStream(defaultStream);
                        }
                      });
                  }
                });
                setShareScreenTrack(lastScreenTrack);
              }

              return newStream;
              // initSignalR(meId)
            });
        })
    } catch (err) {
      console.log("initStream error", err)
      console.error({ err });
      const newDefaultStream = await createEmptyVideoStream();
      setDefaultStream(newDefaultStream)
      setStream(defaultStream);
      return newDefaultStream;
      if (!defaultStream) {
        // alert("reach heeerre initstream try catch")
      } else {
        setStream(defaultStream);
      }
      return defaultStream;
      // alert("Bạn phải đồng ý chia sẻ camera hoặc màn hình");
      // return await initStream(meId);
    }


    // if (defaultStream) {
    //   setStream(defaultStream);
    //   return defaultStream;
    // } else {
    //   const newDefaultStream = await createEmptyVideoStream();
    //   setDefaultStream(newDefaultStream)
    //   setStream(newDefaultStream);
    //   return newDefaultStream;
    // }
  }

  const initSignalR = async (meId) => {
    // toast.info('initSignalR')
    const accessTokenFactory = localStorage.getItem("token");
    if (roomId) {
      // toast.info('roomId, ' + roomId)
      console.log('roomId', roomId)
      const newConnect = new HubConnectionBuilder()
        // .withUrl('http://localhost:8000/hubs/meetinghub?meetingId=' + meetingId, {
        .withUrl(BE_URL + "/hubs/meetinghub?meetingId=" + roomId, {
          accessTokenFactory: () => accessTokenFactory,
        })
        .build();

      newConnect.on("add-message", (message) => {
        // toast.info("Có tin nhắn mới");
        toast.info("New chat message");
        addMessage(message);
      });

      // newConnect.on("user-joined", (newUser) => {
      //   toast.info(newUser.userName + " vào phòng học");
      //   userJoin(newUser);
      // });
      newConnect.on("user-disconnected", (peerId, userName) => {
        // toast.info(userName + " rời phòng học");
        toast.info(userName + " left meeting");
        removePeer(peerId);
      });
      newConnect.on("get-messages", addHistory);
      // toast.info("meId " + meId);

      // alert("if (meId) "+ meId);
      if (meId) {
        // toast.info("new COnnect" + meId);
      // toast.info("start (meId) "+ meId);
      await newConnect.start();
      // await newConnect.start().catch((err) => console.log("meetHub.start err", err));;
        // newConnect.start().then(() =>{
        //   newConnect.invoke("JoinRoom", {
        //     roomId: roomId,
        //     peerId: meId,
        //     username: userName,
        //   })
        // });
        newConnect.on("get-users", (participants) => {
          handleUserList(participants);
        });
        newConnect.on("OnVoteChange", () => handleVoteChange(roomId));
        newConnect.on("OnEndVote", (review) => {
          // toast.info(review.revieweeUsername + " đã trả bài xong. Xin hãy chấm điểm.");
          review.revieweeUsername !=userName && toast.info(review.revieweeUsername + " finneshed reviewing. Please give "+review.revieweeUsername+" an evaluation.");
          review.revieweeUsername ==userName && toast.info("You finneshed reviewing. Please wait for other members to evaluate");
          handleVoteChange(roomId);
        });
        newConnect.on("OnStartVote", (reviewee) =>
          // toast.info(reviewee + " bắt đầu trả bài")
          toast.info((reviewee==userName?"You":reviewee) + " start reviewing")
        );
        newConnect.on("get-focusList", (list) => {
          // toast.info("get-focusList");
          console.log("get-focusList", list);
          setFocusList(list);
        });
        newConnect.on("get-focusScreenList", (list) => {
          // toast.info("get-focusList");
          console.log("get-focusScreenList", list);
          setFocusScreenList(list);
        });

        // setConnectionState(newConnect.state);
      }
      setConnection(newConnect);
      return newConnect;
    }
    return null
  }

  const toogleRaiseHand = (newIsRaiseHand) => {
    // toast.info(`isRaiseHand ${isRaiseHand}`)
    // toast.info(`isSharing ${isSharing}`)
    // toast.info(`isReviewing ${isReviewing}`)
    // toast.info(`!newIsRaiseHand && !isSharing && !isReviewing ${!newIsRaiseHand && !isSharing && !isReviewing}`)
    // toast.info(`roomId ${roomId}`)
    if (newIsRaiseHand) {
      connection.invoke("EndFocus", { roomId: roomId, peerId: meId, action: "raising hand" })
    } else {
      connection.invoke("StartFocus", { roomId: roomId, peerId: meId, action: "raising hand" })
    }
    setIsRaiseHand(newIsRaiseHand);
  }
  const toogleSound = (isActive) => {
    //Nếu đang bật mic mà chưa có cam stream=> chưa có mic từ cam=>lấy cam stream r lấy audiotrack add vào stream
    if (isActive && !camStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((newCamStream) => {
          setCamStream(newCamStream)
          //Lấy audio cũ gắn vô stream screen
          if (mediaStream && stream.getAudioTracks()) {
            stream.getAudioTracks().forEach(audioTrack => {
              newStream.addTrack(audioTrack);
            });
          }
        })
    }
    if (stream.getAudioTracks()[0]) {
      stream.getAudioTracks()[0].enabled = isActive;
    }
  };

  const toogleVid = (isActive) => {
    // console.log()
    
    if (isActive) {
      // if (stream.getVideoTracks()[0]) {
      //   stream.getVideoTracks()[0].enabled = true;
      // }
      connection.invoke("EndAva", { roomId: roomId, peerId: meId, imagePath: userInfo?.imagePath })
      if (stream == defaultStream) {
        if (camStream) {
          switchStream(camStream);
        } else {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((newCamStream) => {
              connection.invoke("EndAva", { roomId: roomId, peerId: meId, imagePath: userInfo?.imagePath })
              if (newCamStream.getAudioTracks()[0]) {
                newCamStream.getAudioTracks()[0].enabled = false;
              }
              setCamStream(newCamStream)
              switchStream(newCamStream);
            })
            .catch(async (error) => {
              console.log("Get cam error", error)
              if (!defaultStream) {
                const newDefaultStream = await createEmptyVideoStream();
                setDefaultStream(newDefaultStream)
                switchStream(newDefaultStream);
              } else {
                switchStream(defaultStream);
              }
            });
        }
      }
    } else {
      connection.invoke("StartAva", { roomId: roomId, peerId: meId, imagePath: userInfo?.imagePath })
    }
    setIsCamOn(isActive);
    if (camStream.getVideoTracks()[0]) {
      camStream.getVideoTracks()[0].enabled = isActive;
    }
  };

  const userJoin = ({ peerId, userName: name }) => {
    console.log("userJoin { peerId, userName: name }", { peerId, userName: name })
    dispatch(addPeerNameAction(peerId, name));
    if (peerId == meId) {
      dispatch(addPeerStreamAction(peerId, stream));
    }
    console.log('peers reducer addPeerNameAction', peers);
    // if (!stream && roomId) {
    //   initStream();
    // }
    console.log("userJoin me", me)
    console.log("userJoin mystream", stream)
    const call =
      // stream &&
      me.call(peerId, stream, {
        metadata: {
          userName,
        },
      });
    console.log('userJoin call', call);
    call.on("stream", (userVideoStream) => {
      // toast.info("Receive video from "+name)
      //userVideoStream: MediaStream
      console.log('userJoin call on stream', userVideoStream);
      dispatch(addPeerStreamAction(peerId, userVideoStream));
    });
    console.log('userJoin call', call);
    console.log('peers reducer addPeerStreamAction', peers);
    // if(stream == defaultStream){
    //   // toast("Using default stream")
    //   // switchStream(defaultStream);
    //   setTimeout(async()=>{
    //   toast("Using default stream")
    //   const defaultStream = await createEmptyVideoStream();
    //   setDefaultStream(defaultStream);
    //   switchStream(defaultStream);
    //   }, 5000);
    // }
  };

  useEffect(() => {
    if (!stream) return;
    if (!me) return;

    dispatch(addPeerStreamAction(me.id, stream));
    me.on("call", (call) => {
      const { userName } = call.metadata;
      // toast.info("[stream, me, userName] Peer on call")
      dispatch(addPeerNameAction(call.peer, userName));
      console.log('peers reducer addPeerNameAction', peers);
      call.on("stream", (userVideoStream) => {
        // toast.info("Receive video from "+userName)

        console.log('meOnCallOnStream 1 userVideoStream', userVideoStream);
        dispatch(addPeerStreamAction(call.peer, userVideoStream));
        console.log('peers reducer addPeerStreamAction', peers);
      });
      call.answer(stream);
    });
    console.log("me", me)
    if (connection) {
      connection.off("user-joined");
      connection.on("user-joined", (newUser) => {
        // toast.info(newUser.userName + " vào phòng học");
        toast.info((newUser.userName==userName?"You":newUser.userName) + " joined meeting");
        newUser.userName!=userName && userJoin(newUser);
      });
    }


    // connection.invoke("JoinRoom", {
    //   roomId: roomId,
    //   peerId: meId,
    //   username: userName,
    // })
    // initSignalR(meId)
  }, [stream, me, userName]);
  // useEffect(()=>{
  //   if(!stream) return;
  //   if(!connection) return;
  //   connection.on("user-joined", (newUser) => {
  //     toast.info(newUser.userName + " vào phòng học");
  //     userJoin(newUser);
  //   });
  //   connection.invoke("JoinRoom", {
  //     roomId: roomId,
  //     peerId: meId,
  //     username: userName,
  //   })
  // },[stream, connection])
  useEffect(() => {
    if (!me) return;
    if (!connection) return;
    if (!stream) return;
    // connection.on("user-joined", (newUser) => {
    //   toast.info(newUser.userName + " vào phòng học");
    //   userJoin(newUser);
    // });
    me.on("call", (call) => {
      const { userName } = call.metadata;
      // toast.info("[stream, me, userName] Peer on call")
      dispatch(addPeerNameAction(call.peer, userName));
      console.log('peers reducer addPeerNameAction', peers);
      call.on("stream", (userVideoStream) => {
        // toast.info("Receive video from "+userName)
        console.log('meOnCallOnStream 2 userVideoStream', userVideoStream);
        dispatch(addPeerStreamAction(call.peer, userVideoStream));
        console.log('peers reducer addPeerStreamAction', peers);
      });
      call.answer(stream);
    });
    console.log("useEffect[me, connection] connection", connection)
    connection.on("get-focusList", (list) => {
      // toast.info("get-focusList");
      console.log("get-focusList", list);
      setFocusList(list);
    });
    connection.on("get-showAvaList", (list) => {
      console.log("get-showAvaList", list);
      // toast.info("get-showAvaList");
      setShowAvaList(list);
    });

    connection.on("user-joined", (newUser) => {
      // toast.info(newUser.userName + " vào phòng học");
      toast.info((newUser.userName==userName?"You":newUser.userName) + " joined meeting");
      newUser.userName!=userName && userJoin(newUser);
    });
    connection.invoke("JoinRoom", {
      roomId: roomId,
      peerId: meId,
      username: userName,
    })
    connection.invoke("StartAva", { roomId: roomId, peerId: meId, imagePath: userInfo?.imagePath })

    if (isSharing) {
      connection.invoke("StartFocus", { roomId: roomId, peerId: meId, action: "sharing screen" })
    }
  }, [me, connection])
  // }, [me, connection, stream])
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
        // toggleChat,
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
        toogleRaiseHand,
        toogleSound,
        toogleVid,
        removeAllPeers,
        setUpLeave,
        isReviewing,
        setIsReviewing,
        focusList,
        focusScreenList,
        //new show avatar
        isCamOn,
        showAvaList,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
