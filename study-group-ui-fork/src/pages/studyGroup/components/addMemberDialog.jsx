import { DialogContent, Box, DialogActions, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Button from 'src/components/Button';
import SearchComponent from 'src/components/SearchComponent';
import InviteComponent from './InviteComponent';
import { inviteStudent, searchStudent } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';

const AddMemberDialog = (props) => {
  const { onClose, open, groupId } = props;
  const dispatch = useDispatch();
  const { searchStudentList } = useSelector((state) => state.studyGroup);


  const handleSearch = (value) => {
    value && dispatch(searchStudent({ search: value, groupId }));
  };

  const onInviteStudent = async (studentId) => {
    const response = await dispatch(inviteStudent({ studentId, groupId }));
    if (response.type === inviteStudent.fulfilled.type) {
       onClose();
    }
  };

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          padding: '12px'
        }}
      >
        <SearchComponent fullWidth placeholder="Tìm thành viên" onSearch={handleSearch} />
      </Box>
      <DialogContent>
        <Box display="flex" flexDirection={'column'} rowGap={'32px'}>
          {searchStudentList.length ? (
            searchStudentList.map((student) => (
              <InviteComponent
                key={student.id}
                data={{
                  /* eslint-disable */
                  'Mã số học sinh': student.id,
                  'Họ Tên': student.fullName,
                  'Tên tài khoản': student.username,
                  'Email': student.email,
                  'Trường': student.schhool,
                  'Lớp': student.class
                  /* eslint-enable */
                }}
                actions={[
                  <Button
                    onClick={() => onInviteStudent(student.id)}
                    color="primary"
                    variant="contained"
                    key={'1'}
                  >
                    Mời vào
                  </Button>
                ]}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>Nodata</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddMemberDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  groupId: PropTypes.any
};

AddMemberDialog.defaultProps = {
  open: false
};

export default AddMemberDialog;
