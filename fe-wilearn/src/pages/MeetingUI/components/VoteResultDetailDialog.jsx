import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';

const VoteResultDetailDialog = (props) => {
  const { onClose, open, data } = props;

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <Typography
          sx={{
            fontSize: '22px',
            mb: '18px'
          }}
        >
          Evaluation
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {data?.map((item) => (
            <Box
              key={item.id}
              sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '4px',
                color: 'white',
                padding: '12px'
              }}
            >
              <Typography>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Reviewer:{' '}
                </Typography>
                {item?.reviewerUsername}
              </Typography>
              <Typography>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Result:{' '}
                </Typography>
                {item?.result}
              </Typography>
              <Typography>
                <Typography component={'span'} sx={{ fontWeight: 'bold' }}>
                  Comment:{' '}
                </Typography>
                {item?.comment}
              </Typography>
            </Box>
          ))}
          {!data?.length && <Typography>No one has evaluated yet</Typography>}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

VoteResultDetailDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  data: PropTypes.arrayOf(Object)
};

export default VoteResultDetailDialog;
