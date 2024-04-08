import { useEffect, useState } from "react";
import {
  Typography,
  TextareaAutosize,
  Button,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import CommentList from "./CommentList";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscussionById } from "../../../app/reducer/studyGroupReducer";


export default function DiscussionDetail() {
  const [replyText, setReplyText] = useState("");
const dispatch = useDispatch();
  const { state } = useLocation();
  
  const data = dispatch(getDiscussionById(state.id));


  console.log("data", data);

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    console.log(`Reply submitted: ${replyText}`);
    setReplyText("");
  };

  return (
    <Grid>
      <Grid
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          margin: "20px auto 0",
        }}
      >
        <Box
          sx={{
            background: "#f8f8f8",
            padding: "20px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Typography
              variant="h6"
              style={{
                color: "#333",
                marginRight: "10px",
                textAlign: "center",
              }}
            >
              Tại sao chọn .NET?
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt="Minia Doe"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST2mXZyjeEgVKZ4yOV5SS2dL5UC10y0RRCew&usqp=CAU"
              sx={{ marginRight: "10px" }}
            />
            <Typography
              variant="body1"
              style={{ fontSize: "16px", color: "#888", margin: "5px 0" }}
            >
              Minia Doe
            </Typography>
          </Grid>
          <Typography
            variant="body1"
            style={{ fontSize: "16px", color: "#888", margin: "5px 0" }}
          >
            March 17, 2024 10:00 AM
          </Typography>
        </Box>
        <Box sx={{ padding: "20px" }}>
          <img
            src="https://www.thietkewebthuonghieu.com/wp-content/uploads/2019/04/splash.png"
            alt="Discussion Image"
            style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
          />
          <Typography
            variant="body1"
            style={{ fontSize: "16px", textAlign: "justify" }}
          >
            .NET là một nền tảng nguồn mở để xây dựng các ứng dụng trên máy tính
            để bàn, web và thiết bị di động có thể chạy nguyên bản trên bất kỳ
            hệ điều hành nào. Hệ thống .NET bao gồm các công cụ, thư viện và
            ngôn ngữ hỗ trợ phát triển phần mềm hiện đại, có quy mô linh hoạt và
            hiệu năng cao. Một cộng đồng nhà phát triển hoạt động tích cực trong
            việc duy trì và hỗ trợ nền tảng .NET. Nói một cách dễ hiểu, nền tảng
            .NET là phần mềm có thể thực hiện những tác vụ sau: Dịch mã ngôn ngữ
            lập trình .NET thành hướng dẫn mà thiết bị máy tính có thể xử lý.
            Cung cấp các tiện ích để phát triển phần mềm hiệu quả. Ví dụ: nó có
            thể tìm thời gian hiện tại hoặc in văn bản trên màn hình. Xác định
            một tập gồm các loại dữ liệu để lưu trữ thông tin như văn bản, số và
            ngày tháng trên máy tính.
          </Typography>
        </Box>
      </Grid>

      <Grid sx={{ marginTop: "20px", maxWidth: "600px", marginLeft: "190px" }}>
        <Typography
          variant="h5"
          style={{
            fontSize: "20px",
            marginBottom: "10px",
            textAlign: "left",
            fontStyle: "italic",
          }}
        >
          Answer
        </Typography>
        <TextareaAutosize
          value={replyText}
          onChange={handleReplyChange}
          style={{
            width: "100%",
            minHeight: "80px",
            borderRadius: "5px",
            padding: "10px",
          }}
          placeholder="Type your reply here..."
        />
        <Button
          onClick={handleReplySubmit}
          variant="contained"
          size="small"
          style={{
            marginTop: "8px",
          }}
        >
          Submit
        </Button>
      </Grid>
      <CommentList />
    </Grid>
  );
}
