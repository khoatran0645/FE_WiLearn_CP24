import { DialogContent, Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import MeetingLabel from 'src/components/MeetingLabel';
import HistoryChat from 'src/modules/students/pages/stats/Modal/HistoryChat';
import HistoryVote from 'src/modules/students/pages/stats/Modal/HistoryVote';

const PastMeetingDialog = (props) => {
  const { onClose, open, data, onOpenHistoryChat, onOpenHistoryVote } = props;

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <Box display="flex" flexDirection={'column'} rowGap={'32px'}>
          {data.map((item) => (
            <MeetingLabel
              key={item.id}
              {...item}
              onCloseFather={onClose}
              onOpenHistoryChat={onOpenHistoryChat}
              onOpenHistoryVote={onOpenHistoryVote}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

PastMeetingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object)
};

PastMeetingDialog.defaultProps = {
  open: false,
  data: []
};

export default PastMeetingDialog;
