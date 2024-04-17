import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Paginate from "../../../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { getGroupMemberLists, getGroupNotJoin, getStudentInvites, getSubjectLists, requestJoinGroup } from "../../../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";
import { getUserInfo, getUsermMeetings } from "../../../app/reducer/userReducer";



export default function ListGroup(props) {
  const {groups, searchTerm} = props;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(groups.length / 8);
  const startIndex = (page - 1) * 8;
  const endIndex = Math.min(startIndex + 8, groups.length);
  const currentGroups = groups.slice(startIndex, endIndex);

  const {userInfo} = useSelector(state=>state.user)
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const onRequestJoinGroup = async(groupId, gname) => {

    const response = await dispatch(requestJoinGroup({ groupId, studentId: userInfo?.id }));
    if (response.type === requestJoinGroup.fulfilled.type) {
      toast.success("Request to join group "+ gname + "successflly");
      dispatch(getGroupMemberLists());
    }else{
      toast.error(`Something went wrong when requesting to join group ${gname}`)
      response.payload
    }
    dispatch(getStudentInvites());

    dispatch(getUserInfo());
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites())
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} style={{ margin: "0 auto" }}>
        <Grid container justifyContent="center" paddingTop={2}>
          {groups.length==0 && (!searchTerm || searchTerm.trim()=="") && (
            <Typography
              variant="h2"
              color="textSecondary"
            >
                Search group to join
            </Typography>
          )}
          {groups.length==0 && searchTerm && searchTerm.trim()!="" && (
            <Typography
              variant="h3"
              color="textSecondary"
            >
              No groups found or you have joined these groups
            </Typography>
          )}
          {currentGroups.map((group, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{
                  maxWidth: 250,
                  height: "260px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginBottom: "10px",
                  border: "1px solid",
                }}
              >
                <CardHeader
                  title={
                    <Typography variant="h6" style={{ fontSize: "14px" }}>
                      {group.name}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" style={{ fontSize: "11px" }}>
                      {group.subjects.join(', ')}
                    </Typography>
                  }
                  style={{ paddingBottom: "2px", paddingTop: "8px" }}
                />
                <CardMedia
                  component="img"
                  height="100"
                  image={group.imagePath}
                  alt={group.name}
                  style={{ objectFit: "cover" }}
                />
                <CardContent
                  style={{
                    height: "70px",
                    paddingTop: "8px",
                    overflow: "auto",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    fontSize="14px"
                  >
                    {group.description}
                  </Typography>
                </CardContent>
                <Grid container justifyContent="center">
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      padding: "4px 8px",
                      fontSize: "11px",
                      backgroundImage:
                        "linear-gradient(to left, #00b4db, #0083b0)",
                    }}
                    onClick={()=>onRequestJoinGroup(group.id, group.name)}
                  >
                    Join Group
                  </Button>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "#fff", padding: "10px 0" }}>
        <Grid container justifyContent="center">
          {totalPages > 1 && (
            <Paginate count={totalPages} page={page} onPageChange={handlePageChange} />
          )}
        </Grid>
      </div>
    </Grid>
  );
}
