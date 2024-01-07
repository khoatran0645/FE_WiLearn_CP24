import { Box, DialogContent, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import InviteComponent from './InviteComponent';
import Button from 'src/components/Button';

const InvitesListDialog = (props) => {
  const { onClose, open, invitations, onAcceptInvitation, onDeclineInvitation } = props;

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <Box>
          {invitations?.length ? (
            invitations.map((inv) => (
              <InviteComponent
                key={inv.id}
                data={{
                  /* eslint-disable */
                  'Tên nhóm': inv.groupName,
                  'Số thành viên': inv.memberCount,
                  'Môn học': inv.subjects.join(', '),
                  'Lớp': inv.class
                  /* eslint-enable */
                }}
                actions={[
                  <Button
                    onClick={() => onDeclineInvitation(inv.id)}
                    color="secondary"
                    variant="contained"
                    key={'0'}
                  >
                    Từ chối
                  </Button>,
                  <Button
                    onClick={() => onAcceptInvitation(inv.id)}
                    color="primary"
                    variant="contained"
                    key={'1'}
                  >
                    Chấp nhận
                  </Button>
                ]}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No data</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

InvitesListDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  invitations: PropTypes.arrayOf(Object),
  onAcceptInvitation: PropTypes.func,
  onDeclineInvitation: PropTypes.func
};

InvitesListDialog.defaultProps = {
  open: false
};

export default InvitesListDialog;
