export const fetchAddNewGroup = async () => {
  const mockSuccessResponse = {
    code: 200,
    status: 'success',
    data: {}
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSuccessResponse);
    }, 1000);
  });
};

export const fetchGetMembersByGroupId = async () => {
  const mockSuccessResponse = {
    code: 200,
    status: 'success',
    data: [
      {
        id: 1,
        fullName: 'Thành viên 1'
      },
      {
        id: 2,
        fullName: 'Thành viên 2'
      },
      {
        id: 3,
        fullName: 'Thành viên 3'
      }
    ]
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSuccessResponse);
    }, 1000);
  });
};

export const fetchGetRoomsByGroupId = async () => {
  const mockSuccessResponse = {
    code: 200,
    status: 'success',
    data: [
      {
        id: 1,
        name: 'Chat 1'
      },
      {
        id: 2,
        name: 'Chat 2'
      },
      {
        id: 3,
        name: 'Chat 3'
      }
    ]
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSuccessResponse);
    }, 1000);
  });
};

export default {
  fetchAddNewGroup,
  fetchGetMembersByGroupId,
  fetchGetRoomsByGroupId
};
