export const fetchCheckLogin = async () => {
  const mockSuccessResponse = {
    code: 200,
    status: 'success',
    data: {
      username: 'mockuser',
      email: 'example@mail.com',
      phone: '01234123412',
      fullName: 'Mock Name',
      role: {},
      groups: [
        {
          id: 1,
          name: 'Nhóm A'
        },
        {
          id: 2,
          name: 'Nhóm B'
        }
      ],
      otherGroups: [
        {
          id: 3,
          name: 'Nhóm Khác 1'
        },
        {
          id: 4,
          name: 'Nhóm Khác 2'
        }
      ]
    }
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSuccessResponse);
    }, 1000);
  });
};

export default {
  fetchCheckLogin
};
