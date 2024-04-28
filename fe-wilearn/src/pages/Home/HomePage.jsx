import React, { useEffect, useState } from "react";
import {
  Typography,
  CardContent,
  CardMedia,
  Card,
  Container,
  Grid,
  Button,
  Stack,
  Avatar,
  AvatarGroup,
  Box,
  Tooltip,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import GroupsIcon from "@mui/icons-material/Groups";
import CreateGroup from "../Groups/CreateGroup";
import Paginate from "./../../components/Paginate";
import {
  getGroupNotJoin,
  getStudentInvites,
  getSubjectLists,
  requestJoinGroup,
} from "../../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";
import { getUserInfo, getUsermMeetings } from "../../app/reducer/userReducer";
import JoinNewGroup from "../Groups/JoinNewGroup";

export default function HomePage() {
  const dispatch = useDispatch();
  const { groupNotJoin } = useSelector((state) => state.studyGroup);
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 6;

  const totalPages = Math.ceil(groupNotJoin.length / groupsPerPage);
  const startIndex = (currentPage - 1) * groupsPerPage;
  const endIndex = Math.min(startIndex + groupsPerPage, groupNotJoin.length);
  const currentGroups = groupNotJoin.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { userInfo } = useSelector((state) => state.user);
  const onRequestJoinGroup = async (groupId, gname) => {
    const response = await dispatch(
      requestJoinGroup({ groupId, studentId: userInfo?.id })
    );
    if (response.type === requestJoinGroup.fulfilled.type) {
      toast.success("Request to join group " + gname + "successflly");
      dispatch(getGroupMemberLists());
      handleCloseDialog();
    } else {
      toast.error(
        `Something went wrong when requesting to join group ${gname}`
      );
    }
    dispatch(getStudentInvites());

    dispatch(getUserInfo());
    dispatch(getUsermMeetings());
    dispatch(getGroupNotJoin());
    dispatch(getSubjectLists());
    dispatch(getStudentInvites());
  };
  useEffect(() => { }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid container justifyContent={"flex-end"} alignContent={"center"}>
          <Stack direction="row">
            <JoinNewGroup lable="Search new group"/>
            {/* <CreateGroup /> */}
          </Stack>
        </Grid>
        {currentGroups.map((group) => (
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
        {totalPages > 1 && (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            paddingTop={5}
          >
            <Paginate count={totalPages} onPageChange={handlePageChange} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
