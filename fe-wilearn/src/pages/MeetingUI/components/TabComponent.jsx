import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Grid, Tab, Tabs, Tooltip, styled } from '@mui/material';
import Vote from './Vote';
import Chat from './chat/Chat';
import UserPaper from './UserPaper';
import { RoomContext } from '../context/roomContext';
import MessageIcon from "@mui/icons-material/Message";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  // eslint-disable-next-line no-unused-vars

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: '100%', width: '100%' }}
    >
      {value === index && (
        <Box sx={{ height: '100%', backgroundColor: 'background.main' }}>{children}</Box>
      )}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.any,
  value: PropTypes.number,
  index: PropTypes.number
};

const TabComponent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const { peers, screenSharingId, stream, userName, me, meId, focusList } = useContext(RoomContext);
  const { [meId]: sharing, ...peersToShow } = peers;
  console.log("peersToShow", peersToShow)

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;
  const isPeerIdFocus = (peerId)=>{
    console.log("isPeerIdFocus focusList", focusList)
    console.log("isPeerIdFocus peerId", peerId)
    return focusList.some(item=>item.peerId==peerId)
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      // minWidth={"300px"}
      // height="calc(100vh - 49px)"
      // height= "80vh"
      height="100%"
      maxHeight="80vh"
      // alignContent="center"
      // alignItems="center"
      // maxHeight={"calc(100vh - 49px)"}
      sx={{
        backgroundColor: 'background.main',
        paddingLeft: 1
      }}
    >
      <Box width="100%" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} >
          {/* <Box sx={{ width:"100%",  }}> */}
          {/* <Tab icon={<PeopleAltOutlinedIcon />} label="Members" /> */}
          <Tab icon={<Tooltip title="Members"> <PeopleAltOutlinedIcon /></Tooltip>} />
          {/* <Tab icon={<MessageIcon />} label="Chats" /> */}
          <Tab icon={<Tooltip title="Chats"><MessageIcon /></Tooltip>} />
          {/* <Tab icon={<LocalLibraryOutlinedIcon />} label="Reviews" /> */}
          <Tab icon={<Tooltip title="Reviews"><LocalLibraryOutlinedIcon /></Tooltip>} />
          {/* </Box> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} id="TabPanel">
        {/* <MemberWrapperTab id="MemberWrapperTab"> */}
          <Box
            display="flex"
            sx={{
              width: "100%",
              // maxWidth: "300px",
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
      // alignContent:"center",
      // alignItems:"center"
            }}
            alignContent="center"
            alignItems="center"
            border={'ActiveBorder'}
          >
          {/* <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  alignSelf="center"
  justifyContent="center"
  // sx={{ minHeight: '100vh' }}
  // sx={{maxWidth:"300px"}}
>
<Grid item > */}
            <UserPaper
              key={meId}
              stream={stream}
              name={"You"}
              isFocus={isPeerIdFocus(meId)}
              peerId={meId}
              />
            {Object.values(peersToShow).length == 0
              ? ("No one else is here")
              : <>
                Other people
                <Divider />
              </>
            }
            {Object.values(peersToShow)
              .filter((peer) => !!peer.stream)
              .map((peer) => (
                <UserPaper 
                  key={peer.id} 
                  stream={peer.stream} 
                  name={peer.userName} 
                  isFocus={isPeerIdFocus(peer.id)}
                  peerId={peer.id}
              />
              ))}
              {/* </Grid>
              </Grid> */}
          </Box>
        {/* </MemberWrapperTab> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Chat />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Vote />
      </TabPanel>
    </Box>
  );
};

const MemberWrapperTab = styled(Box)(() => {
  return {
    width: '100%',
    maxHeight: '80vh',
    maxWidth: '200px',
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  };
});

TabComponent.propTypes = {};

export default TabComponent;
