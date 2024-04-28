import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Avatar,
  AvatarGroup,
  Tooltip,
  Box,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import Chip from "@mui/material/Chip";
import Paginate from "../../../components/Paginate";
import { useDispatch, useSelector } from "react-redux";
import { getGroupMemberLists, getGroupNotJoin, getStudentInvites, getSubjectLists, requestJoinGroup } from "../../../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";
import { getUserInfo, getUsermMeetings } from "../../../app/reducer/userReducer";



export default function ListGroupToJoin(props) {
  const { groups, searchTerm } = props;
  const [page, setPage] = useState(1);
  // const totalPages = Math.ceil(groups.length / 6);
  // const startIndex = (page - 1) * 6;
  // const endIndex = Math.min(startIndex + 6, groups.length);
  // const currentGroups = groups.slice(startIndex, endIndex);
  let totalPages = Math.ceil(groups.length / 6);
  let startIndex = (Math.min(page, totalPages) - 1) * 6;
  let endIndex = Math.min(startIndex + 6, groups.length);
  let currentGroups = groups.slice(startIndex, endIndex);
  // const [currentGroups, setCurrentGroups] = useState(groups.slice(startIndex, endIndex));

  const { userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // useEffect(() => {
  //   totalPages = Math.ceil(groups.length / 6);
  //   if(page>totalPages){ 
  //     setPage(totalPages?totalPages:1);
  //   }
  //  startIndex = (page - 1) * 6;
  //  endIndex = Math.min(startIndex + 6, groups.length);
  // //  currentGroups = groups.slice(startIndex, endIndex);
  //  setCurrentGroups(groups.slice(startIndex, endIndex));
  // }, [groups,  ])
  

  const onRequestJoinGroup = async (groupId, gname) => {

    const response = await dispatch(requestJoinGroup({ groupId, studentId: userInfo?.id }));
    if (response.type === requestJoinGroup.fulfilled.type) {
      toast.success("Request to join group " + gname + " successflly");
      dispatch(getGroupMemberLists());
    } else {
      toast.error(`Something went wrong when requesting to join group ${gname}`)
      response.payload.failures.forEach(f => {
        toast.error(f)
      });
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
        <Grid container justifyContent="center" paddingTop={2} spacing={2}>
          {/* {page+ " "+ totalPages+ " "+startIndex+ " "+endIndex}  */}
          {(!searchTerm || searchTerm.trim() == "") && (
            <Typography
              variant="h2"
              color="textSecondary"
            >
              Search group to join
            </Typography>
          )}
          {groups.length == 0 && searchTerm && searchTerm.trim() != "" && (
            <Typography
              variant="h3"
              color="textSecondary"
            >
              No groups found or you have joined these groups
            </Typography>
          )}
          {/* {currentGroups.map((group, index) => (
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
          ))} */}
          {searchTerm && searchTerm.trim() != ""&& currentGroups.map((group) => (
            <Grid item key={group.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="120"
                  image={group.imagePath}
                  alt={group.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {group.name}
                  </Typography>
                  {/* <Chip label={group.subjects.join(', ')} size="small" variant="filled" /> */}
                  {group.subjects.map((s) => (
                    <Chip style={{ marginRight: 3 }} label={s} size="small" variant="filled" />
                  ))}
                  <Box paddingTop={1.2}>
                    <Grid container alignItems="center" height={"100%"} spacing={1}>
                      <Grid item>
                        <GroupsIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">{group.memberCount}</Typography>
                      </Grid>
                      <Grid>
                        <AvatarGroup max={5}>
                          {group.members.map(mem => (
                            <Tooltip title={(mem.memberRole == 1 ? "Leader: " : "Member: ") + mem.username}>
                              <Avatar alt={mem.username} src={mem.imagePath} />
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      </Grid>
                    </Grid>
                  </Box>
                  <Typography variant="body1">
                    {group.description.length > 40
                      ? group.description.substring(0, 40) + " "
                      : group.description}
                  </Typography>
                </CardContent>
                <Grid container justifyContent="center" paddingBottom={2}>
                  <Button
                    variant="contained"
                    size="small"
                    style={{
                      padding: "6px 10px",
                      fontSize: "14px",
                      backgroundImage:
                        "linear-gradient(to left, #00b4db, #0083b0)",
                    }}
                    onClick={() => onRequestJoinGroup(group.id, group.name)}
                  >
                    Join group
                  </Button>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <div style={{ position: "fixed", bottom: "0", width: "100%", backgroundColor: "#fff", padding: "10px 0" }}>
        <Grid container justifyContent="center">
          {searchTerm && searchTerm.trim() != ""&&  totalPages > 1 && (
            <Paginate count={totalPages} page={page} onPageChange={handlePageChange} />
          )}
        </Grid>
      </div>
    </Grid>
  );
}
