import { Box, Drawer, Grid, styled } from "@mui/material";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
// import { privateRoutes } from "src/common/constants.js";
import CustomIcon from "./components/CustomIcon";
// import UserPaper from "src/components/UserPaper";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ThumbsUpDownRoundedIcon from "@mui/icons-material/ThumbsUpDownRounded";
import MessageIcon from "@mui/icons-material/Message";
import DrawIcon from "@mui/icons-material/Draw";
import TabComponent from "./components/TabComponent";
import { Room } from "./components/Room";
import { RoomContext } from "./context/roomContext";
import { useDispatch } from "react-redux";
import {
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  startReview,
  endReview,
  getReviewInfos,
} from "../../app/reducer/voteReducer/votesActions";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import { clearVoteData } from "src/context/reducers";
import { toast } from "react-toastify";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
// import { removeAllPeerAction } from "src/reducers/peersActions";
// import peersReducer from "src/reducers/peersReducer";

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
  const [direction, setDirection] = useState("collumn");
  const [totalItems, setTotalItems] = useState(itemProps);
  // const containerRef = useRef(null);
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  // const [hasMore, setHasmore] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  // const userVideo = useRef();
  const {
    shareScreen,
    handleCreateVote,
    handleEndVote,
    userName,
    isSharing,
    setUpLeave,
    isReviewing,
    setIsReviewing,
    toogleRaiseHand,
  } = useContext(RoomContext);
  const dispatch = useDispatch();
  const { meetingId, groupId } = useParams();
  const [isDisableVoteButton, setIsDisableVoteButton] = useState(false);
  const { votesData } = useSelector((state) => state.votes);
  const {
    connection,
    toogleSound,
    toogleVid,
    me,
    shareScreenTrack,
    stream,
    isCamOn,
  } = useContext(RoomContext);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars

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
    if (!isReviewing) {
      handleCreateVote();
      dispatch(startReview(meetingId));
    } else {
      handleEndVote();
      const response = await dispatch(endReview(meetingId));
      if (response.type === endReview.fulfilled.type) {
        dispatch(getReviewInfos(meetingId));
      }
    }
    setIsReviewing(!isReviewing);
  };
  // const [mypeers] = useReducer(peersReducer, {});
  // const [mypeers, mydispatch] = useReducer(peersReducer, {});

  const handleLeaveRoom = () => {
    // setUpLeave();
    // if(setUpLeave()){
    if (userInfo?.roleName === "Parent") {
      navigate(`/study`);
    } else {
      navigate(`/groups/${groupId}`);
    }
    // }
  };

  const handleEndRoom = () => {
    connection.invoke("LeaderEndMeeting");
    // connection.on('LeaderEndMeeting', (msg) => {
    //   toast.info(msg);
    //   handleLeaveRoom();
    // });
  };
  const leadGroups = userInfo?.leadGroups;
  const isLead =
    leadGroups &&
    leadGroups.some((gr) => {
      return gr.id === parseInt(groupId);
    });

  const location = useLocation();
  const redirectToWhiteBoard = () => {
    const path = location.pathname;
    // window.open('./whiteboard', '_blank');
    window.open(path + "/whiteboard", "_blank");
  };
  const renderActions = (shareScreen) => {
    return (
      <>
        <CustomIcon
          // title="Dừng chia sẻ"
          title="Stop sharing"
          // titleOff="Chia sẻ màn hình"
          titleOff="Share screen"
          key={1}
          onClick={shareScreen}
          activeIcon={<PresentToAllIcon />}
          offIcon={<PresentToAllIcon />}
          isOn={isSharing}
        />
        <CustomIcon
          // title="Bật cam"
          title="Turn on cam"
          // titleOff="Tắt cam"
          titleOff="Turn off cam"
          key={5}
          onClick={toogleVid}
          activeIcon={<VideocamOffIcon />}
          offIcon={<VideocamIcon />}
          isOn={!isCamOn}
        />
        <CustomIcon
          // title="Bật mic"
          title="Turn on mic"
          // titleOff="Tắt mic"
          titleOff="Turn off mic"
          key={6}
          onClick={toogleSound}
          activeIcon={<MicOffIcon />}
          offIcon={<MicIcon />}
          isOn={true}
        />
        {userInfo?.roleName !== "Parent" && (
          <CustomIcon
            // title="Dừng trả bài"
            title="Stop reviewing"
            // titleOff="Bắt đầu trả bài"
            titleOff="Start reviewing"
            key={2}
            onClick={handleClickVoteButton}
            activeIcon={<LocalLibraryOutlinedIcon />}
            offIcon={<LocalLibraryOutlinedIcon />}
          />
        )}
        <CustomIcon
          title="Lower hand"
          titleOff="Raise hand"
          key={3}
          onClick={toogleRaiseHand}
          activeIcon={<BackHandOutlinedIcon />}
          offIcon={<BackHandOutlinedIcon />}
        />
        <CustomIcon
          title="Whiteboard"
          key={4}
          activeIcon={<DrawIcon />}
          offIcon={<DrawIcon />}
          onClick={redirectToWhiteBoard}
          isChangeColor={false}
        />
        <CustomIcon
          title="Leave meeting"
          onClick={handleLeaveRoom}
          key={7}
          activeIcon={<ExitToAppIcon />}
          offIcon={<ExitToAppIcon />}
        />
        {isLead && (
          <CustomIcon
            title="End meeting"
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
    dispatch(getReviewInfos(meetingId));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (votesData && votesData.length > 0) {
      votesData.forEach((vd) => {
        if (vd.revieweeUsername === userName) {
          setIsDisableVoteButton(!isDisableVoteButton);
        }
      });
    }
  }, [votesData]);
  useEffect(
    () => {
      return () => {
        setUpLeave();
      };
    },
    connection,
    me,
    shareScreenTrack,
    stream
  );
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container sx={{ flexGrow: 1, height: "90vh" }}>
        <Grid item xs={7.5} md={9} lg={9.5}>
          <Wrapper direction={direction}>
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  // gap: "8px",
                  height: "100%",
                }}
              >
                <Box flex={1}>
                  <Room />
                </Box>
                {/* <MemberWrapper ref={containerRef}>
              </MemberWrapper> */}
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
                {renderActions(shareScreen)}
              </Box>
            </Box>
          </Wrapper>
        </Grid>
        <Grid item xs={4.5} md={3} lg={2.5}>
          <TabComponent />
        </Grid>
      </Grid>
      {/* <Drawer anchor={"right"} open={chat.isChatOpen} onClose={closeDrawer}>
        <TabComponent />
      </Drawer> */}
    </Box>
  );
};

export default Meeting;
