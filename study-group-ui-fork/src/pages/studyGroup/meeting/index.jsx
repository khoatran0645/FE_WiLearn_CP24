import { Box, Drawer, styled } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { privateRoutes } from "src/common/constants.js";
import CustomIcon from "src/components/CustomIcon";
import UserPaper from "src/components/UserPaper";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";
import MessageIcon from "@mui/icons-material/Message";
import DrawIcon from "@mui/icons-material/Draw";
import TabComponent from "./components/Tabs";
import { Room } from "src/pages/studyGroup/meeting/components/Room";
import { RoomContext } from "src/context/roomContext";
import { useDispatch } from "react-redux";
import {
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { startReview, endReview, getReviewInfos } from "src/context/actions";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { clearVoteData } from "src/context/reducers";
import { toast } from "react-toastify";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CancelIcon from "@mui/icons-material/Cancel";

const Wrapper = styled(Box)(({ direction }) => {
  return {
    display: "flex",
    height: "100%",
    maxHeight: "70vh",
    flexDirection:
      direction === "row" ? "row" : direction === "column" ? "column" : "row",
  };
});

const MemberWrapper = styled(Box)(() => {
  return {
    width: "100%",
    maxHeight: "80vh",
    maxWidth: "200px",
    flexWrap: "wrap",
    justifyContent: "center",
  };
});

const itemProps = ["Webcam 1", "Webcam 2", "Webcam 3", "Webcam 4"];

const Meeting = () => {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [direction, setDirection] = useState("row");
  const [totalItems, setTotalItems] = useState(itemProps);
  const containerRef = useRef(null);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  const [hasMore, setHasmore] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const userVideo = useRef();
  const {
    chat,
    toggleChat,
    shareScreen,
    peers,
    screenSharingId,
    handleCreateVote,
    handleEndVote,
    userName,
    isSharing,
  } = useContext(RoomContext);
  const dispatch = useDispatch();
  const { meetingId, groupId } = useParams();
  const [isDisableVoteButton, setIsDisableVoteButton] = useState(false);
  const { votesData } = useSelector((state) => state.votes);
  const { connection, meId, toogleSound, toogleVid } = useContext(RoomContext);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { [screenSharingId]: sharing, ...peersToShow } = peers;

  const openDrawer = toggleChat;
  const closeDrawer = toggleChat;

  setDirection;

  const handleAddMember = () => {
    const newItems = [...totalItems, `Webcam ${totalItems.length + 1}`];
    setTotalItems(newItems);
  };
  handleAddMember;
  const updateDimensions = () => {
    setViewHeight(window.innerHeight);
  };

  const handleClickVoteButton = async () => {
    if (isFirstClick) {
      handleCreateVote();
      dispatch(startReview(meetingId));
    } else {
      handleEndVote();
      const response = await dispatch(endReview(meetingId));
      if (response.type === endReview.fulfilled.type) {
        dispatch(getReviewInfos(meetingId));
      }
    }
    setIsFirstClick(!isFirstClick);
  };

  const handleLeaveRoom = () => {
    connection.invoke("LeaveRoom", {
      roomId: meetingId,
      peerId: meId,
    });
    toast.info("Đang rời cuộc họp");
    setTimeout(() => {
      connection.stop().catch((error) => {});
      dispatch(clearVoteData());
    }, 2000);
    if (userInfo?.roleName === "Parent") {
      navigate(`/study`);
    } else {
      navigate(`/study-group/${groupId}`);
    }
  };

  const handleEndRoom = () => {
    connection.invoke("LeaderEndMeeting");
    // connection.on('LeaderEndMeeting', (msg) => {
    //   toast.info(msg);
    //   handleLeaveRoom();
    // });
  };

  const location = useLocation();
  const redirectToWhiteBoard = () => {
    const path = location.pathname;
    // window.open('./whiteboard', '_blank');
    window.open(path + "/whiteboard", "_blank");
  };
  const renderActions = (onClickChat, shareScreen) => {
    return (
      <>
        <CustomIcon
          title="Dừng chia sẻ"
          titleOff="Chia sẻ màn hình"
          key={1}
          onClick={shareScreen}
          activeIcon={<PresentToAllIcon />}
          offIcon={<PresentToAllIcon />}
        />
        <CustomIcon
          title="Bật cam"
          titleOff="Tắt cam"
          key={5}
          onClick={toogleVid}
          activeIcon={<VideocamOffIcon />}
          offIcon={<VideocamIcon />}
        />
        <CustomIcon
          title="Bật mic"
          titleOff="Tắt mic"
          key={6}
          onClick={toogleSound}
          activeIcon={<MicOffIcon />}
          offIcon={<MicIcon />}
        />
        {userInfo?.roleName !== "Parent" && (
          <CustomIcon
            title="Dừng dò bài"
            titleOff="Bắt đầu dò bài"
            key={2}
            onClick={handleClickVoteButton}
            activeIcon={<ThumbsUpDownRoundedIcon />}
            offIcon={<ThumbsUpDownRoundedIcon />}
          />
        )}
        <CustomIcon
          title="Tin nhắn"
          onClick={onClickChat}
          key={3}
          isChangeColor={false}
          activeIcon={<MessageIcon />}
          offIcon={<MessageIcon />}
        />
        {/* <NavLink
          key={4}
          to={{ pathname: './whiteboard', state: { meetHub: connection } }}
          target="_blank"
          state={{ meetHub: connection, abc: 'abc' }}
          abc={{ meetHub: connection }}
        >
          <CustomIcon
            title="Bảng trắng"
            activeIcon={<VideocamIcon />}
            offIcon={<VideocamOffIcon />}
          />
        </NavLink> */}
        <CustomIcon
          title="Bảng vẽ"
          key={4}
          activeIcon={<DrawIcon />}
          offIcon={<DrawIcon />}
          onClick={redirectToWhiteBoard}
          isChangeColor={false}
        />
        <CustomIcon
          title="Rời phòng"
          onClick={handleLeaveRoom}
          key={7}
          activeIcon={<ExitToAppIcon />}
          offIcon={<ExitToAppIcon />}
        />
        {location.state.isLead && (
          <CustomIcon
            title="Kết thúc buổi học"
            // title={location.state.isLead}
            onClick={handleEndRoom}
            key={8}
            activeIcon={<CancelIcon />}
            offIcon={<CancelIcon />}
          />
        )}
      </>
    );
  };
  useEffect(() => {
    if (connection && connection !== undefined) {
      connection.on("LeaderEndMeeting", (msg) => {
        toast.info(msg);
        handleLeaveRoom();
      });
    }
  }, [connection]);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
    dispatch(getReviewInfos(meetingId));
    //
    // connection.on('LeaderEndMeeting', (msg) => {
    //   toast.info(msg);
    //   handleLeaveRoom();
    // });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const clientHeight = containerRef.current.clientHeight;
    if (!hasMore && clientHeight > (viewHeight * 60) / 100) {
      setHasmore(true);
    } else if (hasMore && clientHeight <= (viewHeight * 60) / 100) {
      setHasmore(false);
    }
  });

  useEffect(() => {
    if (votesData && votesData.length > 0) {
      votesData.forEach((vd) => {
        if (vd.revieweeUsername === userName) {
          setIsDisableVoteButton(!isDisableVoteButton);
        }
      });
    }
  }, [votesData]);

  return (
    <Box sx={{ height: "100%" }}>
      <Wrapper direction={direction}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", gap: "8px", height: "100%" }}>
            <Box flex={1}>
              <Room />
            </Box>
            <MemberWrapper ref={containerRef}>
              {/* <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {Object.values(peersToShow)
                  .filter((peer) => !!peer.stream)
                  .map((peer) => (
                    <UserPaper key={peer.id} stream={peer.stream} name={peer.userName} />
                  ))}
              </Box> */}
            </MemberWrapper>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "32px",
            }}
          >
            {/* {renderActions(openDrawer, shareScreen, handleCreateVote)} */}
            {renderActions(openDrawer, shareScreen, handleCreateVote)}
          </Box>
        </Box>
      </Wrapper>
      <Drawer anchor={"right"} open={chat.isChatOpen} onClose={closeDrawer}>
        <TabComponent />
      </Drawer>
    </Box>
  );
};

export default Meeting;
