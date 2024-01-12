import { Box, Grid, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitle from "src/components/CustomTitle";
import UpsertGroupDialog from "./components/UpsertGroupDialog";
import { useNavigate } from "react-router-dom";
import { privateRoutes } from "src/common/constants";
import {
  acceptInvitation,
  clearSearchGroup,
  declineInvitation,
  getGroupLists,
  getGroupMemberLists,
  getStudentInvites,
  getSubjectLists,
  searchGroups,
} from "./reducer";
import { stringAvatar, stringToColor } from "src/common/utils";
import AvatarComponent from "src/components/AvatarComponent";
import SearchComponent from "src/components/SearchComponent";
import ButtonCustom from "src/components/Button";
import { RoomContext } from "src/context/roomContext";
import SearchGroupDialog from "./components/SearchGroupDialog";
import InvitesListDialog from "./components/InvitesListDialog";
import StudentDocuments from "../students/Documents";
import { toast } from "react-toastify";

const StudyGroup = () => {
  const { subjectLists, leadGroups, memberGroups, invitations } = useSelector(
    (state) => state.studyGroup
  );
  const [open, setOpen] = useState(false);
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [openJoinForm, setOpenJoinForm] = useState(false);
  const { setUserName } = useContext(RoomContext);
  const { userInfo } = useSelector((state) => state.auth);
  const [openSearchGroup, setOpenSearchGroup] = useState(false);

  const onOpenJoinFormModal = () => {
    setOpenJoinForm(true);
    dispatch(getStudentInvites());
  };

  const onCloseJoinFormModal = () => {
    setOpenJoinForm(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const onGoToGroupDetail = (id) => {
    naviagate(privateRoutes.studyGroupDetail.replace(":groupId", id));
  };

  const onAcceptInvitation = async (inviteId) => {
    const response = await dispatch(acceptInvitation(inviteId));
    if (response.type === acceptInvitation.fulfilled.type) {
      dispatch(getStudentInvites());
      dispatch(getGroupMemberLists());
    }
  };
  const onDeclineInvitation = async (inviteId) => {
    const response = await dispatch(declineInvitation(inviteId));
    if (response.type === acceptInvitation.fulfilled.type) {
      dispatch(getStudentInvites());
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "Student") {
      naviagate("/student/stats");
    }
    dispatch(getSubjectLists());
    dispatch(getGroupLists());
    dispatch(getGroupMemberLists());
    userInfo?.username && setUserName(userInfo?.username);
  }, []);

  const onSearch = async (keyword) => {
    const response = await dispatch(searchGroups(keyword));
    console.log(response.type);
    if (response.type === searchGroups.fulfilled.type) {
      setOpenSearchGroup(true);
    } else {
      toast.error("Không tìm thấy nhóm");
    }
  };

  const onCloseSearchGroup = () => {
    setOpenSearchGroup(false);
    dispatch(clearSearchGroup());
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <SearchComponent placeholder="Tìm nhóm" onSearch={onSearch} />
        <ButtonCustom
          onClick={onOpenJoinFormModal}
          color="primary"
          variant="contained"
        >
          Lời mời
        </ButtonCustom>
      </Box>
      <Grid container spacing={2} rowGap={3}>
        <Grid item xs={12}>
          <CustomTitle mb={3}>Nhóm tôi tạo</CustomTitle>
          <Box sx={{ display: "flex", gap: "32px" }}>
            <Tooltip arrow title="Tạo nhóm" placement="top">
              <AvatarComponent onClick={handleOpen}>
                Tạo <br /> nhóm
              </AvatarComponent>
            </Tooltip>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "32px",
                flex: 1,
                overflowX: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {leadGroups.map((gr) => {
                return (
                  <AvatarComponent
                    key={gr.id}
                    onClick={() => onGoToGroupDetail(gr.id)}
                    // {...stringAvatar(gr.name)}
                    // {...stringToColor(gr.name)}
                    sx={{
                      bgcolor: stringToColor(gr.name),
                    }}
                  >
                    {gr.name}
                  </AvatarComponent>
                );
              })}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CustomTitle mb={3}>Nhóm tôi tham gia</CustomTitle>
          <Box sx={{ display: "flex", gap: "32px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "32px",
                flex: 1,
                overflowX: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {memberGroups.map((gr) => (
                <AvatarComponent
                  onClick={() => onGoToGroupDetail(gr.id)}
                  key={gr.id}
                  sx={{
                    bgcolor: stringToColor(gr.name),
                  }}
                >
                  {gr.name}
                </AvatarComponent>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* <StudentDocuments /> */}
        <UpsertGroupDialog
          subjectLists={subjectLists}
          open={open}
          onClose={handleClose}
        />
      </Grid>
      <InvitesListDialog
        invitations={invitations}
        open={openJoinForm}
        onClose={onCloseJoinFormModal}
        onAcceptInvitation={onAcceptInvitation}
        onDeclineInvitation={onDeclineInvitation}
      />
      <SearchGroupDialog open={openSearchGroup} onClose={onCloseSearchGroup} />
    </Box>
  );
};

export default StudyGroup;
