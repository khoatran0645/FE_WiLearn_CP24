import { MEETING_TYPE } from './constants';

export const convertFullName = (name) => {
  let splitName = name.trim().split(' ');
  // let firstName = splitName[0].charAt(0);
  // let lastName = splitName[splitName.length - 1].charAt(0);
  // return firstName + lastName;
  let shortName = '';
  splitName.forEach((name, i) => {
    if (i === splitName.length - 1) {
      shortName = shortName + name;
    } else {
      shortName = shortName + name.charAt(0) + '.';
    }
  });
  return shortName;
};

export const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

export const stringAvatar = (name) => {
  const nameParts = name.split(' ');
  const children = `${nameParts[0][0]}${nameParts.length > 1 ? nameParts[1][0] : ''}`;
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children
  };
};

export const convertToMeetingDtos = (object) => {
  const { pastMeetings, liveMeetings, scheduleMeetings } = object;
  let data = [];
  const newPastMeeting = pastMeetings?.map((m) => ({
    ...m,
    status: MEETING_TYPE.PAST
  }));
  const newLiveMeeting = liveMeetings?.map((m) => ({
    ...m,
    status: MEETING_TYPE.LIVE
  }));
  const newScheduleMeeting = scheduleMeetings?.map((m) => ({
    ...m,
    status: MEETING_TYPE.SCHEDULE
  }));
  if (newPastMeeting?.length) {
    data = data.concat(newPastMeeting);
  }
  if (newLiveMeeting?.length) {
    data = data.concat(newLiveMeeting);
  }
  if (newScheduleMeeting?.length) {
    data = data.concat(newScheduleMeeting);
  }
  return data;
};
