import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { inviteStudent, searchStudent } from "../app/reducer/studyGroupReducer";
import { toast } from "react-toastify";

export default function InviteUser() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { searchStudentList } = useSelector((state) => state.studyGroup);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenSearchUser = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { groupId } = useParams();

  const handleSearch = async (searchTerm) => {
    // const searchTerm = searchRef.current.value;
    // console.log("searchTerm",searchTerm)
    // setSearchTerm(searchTerm);
    // value && dispatch(searchStudent({ search: value, groupId }));
    const response = await dispatch(
      searchStudent({ search: searchTerm, groupId })
    );

    if (response.type === searchStudent.fulfilled.type) {
      // setNewSearch(searchGroups);
    }
  };

  const onInviteStudent = async (studentId, stuName) => {
    const response = await dispatch(inviteStudent({ studentId, groupId }));
    if (response.type === inviteStudent.fulfilled.type) {
      // onClose();
      toast.success("Invite student " + stuName + " successflly");
      dispatch(getRequestFormList(groupId));
    } else {
      toast.error(`Something went wrong when inviting ${stuName}`);
      response.payload.failures.forEach((f) => {
        toast.error(f);
      });
    }
  };

  return (
    <Box>
      <Button onClick={handleOpenSearchUser} variant="contained" size="small">
        Invite new member
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Search user</DialogTitle>
        <DialogContent>
          <TextField
            label="Search student"
            value={searchTerm}
            fullWidth
            sx={{ marginTop: "10px" }}
            onChange={async (e) => {
              await setSearchTerm(e.target.value);
              await handleSearch(e.target.value);
            }}
          />
          <Box
            minHeight={"25vh"}
            minWidth={"40vw"}
            display="flex"
            flexDirection={"column"}
            rowGap={"32px"}
          >
            {searchStudentList.length ? (
              searchStudentList.map((student) => (
                // <InviteComponent
                //   key={student.id}
                //   data={{
                //     /* eslint-disable */
                //     'Mã số học sinh': student.id,
                //     'Họ Tên': student.fullName,
                //     'Tên tài khoản': student.username,
                //     'Email': student.email,
                //     'Trường': student.schhool,
                //     'Lớp': student.class
                //     /* eslint-enable */
                //   }}
                //   actions={[
                //     <Button
                //       onClick={() => onInviteStudent(student.id)}
                //       color="primary"
                //       variant="contained"
                //       key={'1'}
                //     >
                //       Mời vào
                //     </Button>
                //   ]}
                // />
                <Box
                  sx={{
                    backgroundColor: "background.main",
                    borderRadius: "12px",
                    padding: "24px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  <Grid container>
                    <Grid key={student.id} item xs={12}>
                      <Typography>
                        <strong>Username: </strong>
                        {student.username}
                      </Typography>
                      <Grid item xs={12}>
                        <Typography>
                          <strong>Fullname: </strong>
                          {student.fullName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <strong>Email: </strong>
                          {student.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={() => onInviteStudent(student.id, student.name)}
                      color="primary"
                      variant="contained"
                    >
                      Mời vào
                    </Button>
                  </Stack>
                </Box>
              ))
            ) : !searchTerm || searchTerm.trim() == "" ? (
              <Typography variant="h4" color="textSecondary">
                Search student to inivite
              </Typography>
            ) : (
              <Typography variant="h5" color="textSecondary">
                No students found or searched students have joined
              </Typography>
            )}
          </Box>
        </DialogContent>
        {/* <DialogActions sx={{ marginRight: "10px" }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSearchSubmit} color="primary">
            Invite
          </Button>
        </DialogActions> */}
      </Dialog>
    </Box>
  );
}
