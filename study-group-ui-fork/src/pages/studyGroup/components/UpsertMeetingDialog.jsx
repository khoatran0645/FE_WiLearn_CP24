import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Dialog, DialogContent } from '@mui/material';
import SingleScheduleForm from './SingleScheduleForm';
import { useParams } from 'react-router-dom';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const UpsertMeetingDialog = (props) => {
  const { onClose, open } = props;
  const [value, setValue] = React.useState(0);
  const { groupId } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Lập kế hoạch" {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SingleScheduleForm groupId={groupId} onClose={onClose} />
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

UpsertMeetingDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default UpsertMeetingDialog;
