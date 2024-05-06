import { Box, Button, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewReportLists,
  getReportLists,
  resolveReport,
} from "../../app/reducer/adminReducer/adminActions";
import { toast } from "react-toastify";

function ReportsPage() {
  const { newReports, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleReport = async (id, isApproved) => {
    const response = await dispatch(
      resolveReport({ id: id, isApproved: isApproved })
    );
    if (response.type === resolveReport.fulfilled.type) {
      toast.success(
        `${isApproved ? "Approved" : "Rejected"} report successfully`
      );
    } else {
      toast.error(
        `Something went wrong when ${
          isApproved ? "approving" : "rejecting"
        } report`
      );
      response?.payload?.failures &&
        response.payload.failures.forEach((error) => {
          toast.error(error);
        });
    }
    dispatch(getReportLists());
    dispatch(getNewReportLists());
  };
  console.log("admin", admin);
  return (
    <Box padding={3}>
      <Typography variant="h3">Resolve Reports</Typography>
      {(!newReports || newReports.length == 0) && "No new report"}
      {newReports.map((report) => (
        <Box key={report.id} marginTop={2}>
          <Paper elevation={3} sx={{ padding: 2, marginTop: 1 }}>
            <Typography>
              <strong>Id: </strong>
              {report.id}
            </Typography>
            <Typography>
              <strong>Reason: </strong>
              {report.detail}
            </Typography>
            <Typography>
              <strong>Sender: </strong>
              {report.sender.username} - {report.sender.fullName}
            </Typography>
            {report.group && (
              <Paper elevation={3} sx={{ padding: 3, marginTop: 1 }}>
                <Typography>
                  <strong>Group: </strong>
                  {report.group.name}
                </Typography>
                <Typography>
                  <strong>Group id: </strong>
                  {report.group.id}
                </Typography>
                <Typography>
                  <strong>Group description: </strong>
                  {report.group.description}
                </Typography>
                <Typography>
                  <strong>Group subjects: </strong>
                  {report.group.subjects.join(", ")}
                </Typography>
                <img src={report.group.imagePath} />
              </Paper>
            )}
            {report.account && (
              <Paper elevation={3} sx={{ padding: 3, marginTop: 1 }}>
                <Typography>
                  <strong>Account: </strong>
                  {report.account.username}
                </Typography>
                <Typography>
                  <strong>Account id: </strong>
                  {report.account.id}
                </Typography>
                <Typography>
                  <strong>Account fullname: </strong>
                  {report.account.fullName}
                </Typography>
                <Typography>
                  <strong>Account phone: </strong>
                  {report.account.phone}
                </Typography>
                <Typography>
                  <strong>Account DOB: </strong>
                  {report.account.dateOfBirth}
                </Typography>
                {/* <Typography><strong>Account subjects: </strong>{report.group.subjects.join(', ')}</Typography> */}
                <img src={report.account.imagePath} />
              </Paper>
            )}
            {report.discussion && (
              <Paper elevation={3} sx={{ padding: 3, marginTop: 1 }}>
                <Typography>
                  <strong>Discussion id: </strong>
                  {report.discussion.id}
                </Typography>
                <Typography>
                  <strong>Discussion created date: </strong>
                  {report.discussion.question}
                </Typography>
                <Typography>
                  <strong>Discussion content: </strong>
                  {report.discussion.content}
                </Typography>
                <Typography>
                  <strong>Discussion created date: </strong>
                  {dayjs(report.discussion.createdAt).format(
                    "DD/MM/YYYY HH:MM"
                  )}
                </Typography>
              </Paper>
            )}
            {report.file && (
              <Paper elevation={3} sx={{ padding: 3, marginTop: 1 }}>
                <Typography>
                  <strong>File id: </strong>
                  {report.file.id}
                </Typography>
                <Typography>
                  <strong>File created date: </strong>
                  {dayjs(report.file.createdDate).format("DD/MM/YYYY HH:MM")}
                </Typography>
                <Typography>
                  <strong>File httpLink: </strong>
                  {report.file.httpLink}
                </Typography>
              </Paper>
            )}
            <Box paddingTop={2}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => handleReport(report.id, true)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleReport(report.id, false)}
              >
                Reject
              </Button>
            </Box>
          </Paper>
        </Box>
      ))}
    </Box>
  );
}

export default ReportsPage;
