import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MEETING_TYPE } from 'src/common/constants';
import { convertToMeetingDtos } from 'src/common/utils';
import CustomSection from 'src/components/CustomSection';
import MeetingLabel from 'src/components/MeetingLabel';
import ScheduleMeeting from './ScheduleMeeting';

const SchedulePage = () => {
  const { groupInfo } = useSelector((state) => state.studyGroup);
  const [meetingLists, setMeetingLists] = useState([]);

  useEffect(() => {
    if (groupInfo) {
      const internalMeetingLists = convertToMeetingDtos(groupInfo);
      setMeetingLists(internalMeetingLists);
    }
  }, [groupInfo]);

  return (
    // <Box>
    //   <Grid container spacing={2} rowGap={3}>
    //     <Grid item xs={12}>
    //       <CustomSection
    //         title="Cuộc họp đang diễn ra"
    //         listItem={meetingLists
    //           .filter((m) => m.status !== MEETING_TYPE.PAST)
    //           .map((m) => (
    //             <MeetingLabel
    //               onJoinNow={() => {}}
    //               onUpdate={() => {}}
    //               meetingId={m.id}
    //               key={m.id}
    //               {...m}
    //             />
    //           ))}
    //         loading={false}
    //         actions={[]}
    //       />
    //     </Grid>
    //     <Grid item xs={12}>
    //       <CustomSection
    //         title="Lịch học nhóm"
    //         listItem={meetingLists
    //           .filter((m) => m.status !== MEETING_TYPE.PAST)
    //           .map((m) => (
    //             <MeetingLabel
    //               onJoinNow={() => {}}
    //               onUpdate={() => {}}
    //               meetingId={m.id}
    //               key={m.id}
    //               {...m}
    //             />
    //           ))}
    //         loading={false}
    //         actions={[]}
    //       />
    //     </Grid>
    //   </Grid>
    // </Box>

    <ScheduleMeeting schedulesItem={meetingLists} />
  );
};

export default SchedulePage;
