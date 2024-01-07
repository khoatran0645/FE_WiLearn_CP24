import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import VoteFormDialog from "./VoteFormDialog";
import { RoomContext } from "src/context/roomContext";
import { useDispatch, useSelector } from "react-redux";
import { getReviewInfos, vote } from "src/context/actions";
import { useParams } from "react-router-dom";
import VoteResultDetailDialog from "../../components/VoteResultDetailDialog";

const Vote = () => {
  const [voteForm, setVoteForm] = useState(false);
  const [voteResultDetail, setVoteResultDetail] = useState(false);
  const { userName } = useContext(RoomContext);
  const dispatch = useDispatch();
  const { votesData } = useSelector((state) => state.votes);
  const [reviewId, setReviewId] = useState(0);
  const { meetingId } = useParams();
  const [currentVoteData, setCurrentVoteData] = useState(null);

  const onOpenVoteForm = (reviewId) => {
    userName;
    setVoteForm(true);
    setReviewId(reviewId);
  };
  const onCloseVoteForm = () => {
    setVoteForm(false);
  };

  const onOpenVoteResultDetail = (data) => {
    setVoteResultDetail(true);
    setCurrentVoteData(data);
  };
  const onCloseVoteResultDetail = () => {
    setVoteResultDetail(false);
  };

  const renderButton = (voteData) => {
    // return voteData.revieweeUsername === userName ? (
    //   <Button variant="contained" onClick={() => onOpenVoteResultDetail(voteData?.details)}>
    //     Kết quả đánh giá
    //   </Button>
    // ) : (
    //   <Button
    //     disabled={voteData.reviewerUsernames.includes(userName)}
    //     variant="contained"
    //     onClick={() => onOpenVoteForm(voteData.id)}
    //   >
    //     Vote
    //   </Button>
    // );
    return (
      <>
        <Button
          variant="contained"
          onClick={() => onOpenVoteResultDetail(voteData?.details)}
          style={{ margin: "5px" }}
        >
          Kết quả đánh giá
        </Button>
        {voteData.revieweeUsername !== userName && (
          <Button
            disabled={voteData.reviewerUsernames.includes(userName)}
            variant="contained"
            onClick={() => onOpenVoteForm(voteData.id)}
            style={{ margin: "5px" }}
          >
            Đánh giá
          </Button>
        )}
      </>
    );
  };

  const onVote = async (message, voteValue) => {
    const respose = await dispatch(
      vote({
        reviewId: reviewId,
        comment: message,
        result: parseInt(voteValue),
      })
    );
    if (respose.type === vote.fulfilled.type) {
      dispatch(getReviewInfos(meetingId));
    }
    onCloseVoteForm();
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.main",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* {voting[0]?.username && voting[0]?.username} */}
          {votesData?.map((v) => {
            return (
              <Box
                key={v.id}
                sx={{
                  padding: "12px",
                  backgroundColor: "#6c707b6e",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                    component={"span"}
                  >
                    {v.revieweeUsername} dò bài
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                    component={"span"}
                  >
                    Số người đã chấm: {v.details.length}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                    component={"span"}
                  >
                    Trung bình điểm: {v.average}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {renderButton(v)}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>
      <VoteFormDialog
        open={voteForm}
        onClose={onCloseVoteForm}
        onVote={onVote}
      />
      <VoteResultDetailDialog
        data={currentVoteData}
        open={voteResultDetail}
        onClose={onCloseVoteResultDetail}
      />
    </Box>
  );
};

export default Vote;
