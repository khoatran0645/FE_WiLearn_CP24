import {
  ADD_PEER_NAME,
  ADD_PEER_STREAM,
  REMOVE_PEER_STREAM,
  ADD_ALL_PEERS,
  REMOVE_ALL_PEERS,
} from "./peersActions";

export const initialState = {};
export const peersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PEER_STREAM:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          stream: action.payload.stream,
          id: action.payload.peerId
        },
      };
    case ADD_PEER_NAME:
      return {
        ...state,
        [action.payload.peerId]: {
          ...state[action.payload.peerId],
          userName: action.payload.userName,
          id: action.payload.peerId,
        },
      };
    // case REMOVE_PEER_STREAM:
    //   return {
    //     ...state,
    //     [action.payload.peerId]: {
    //       ...state[action.payload.peerId],
    //       stream: undefined,
    //     },
    //   };
    case REMOVE_PEER_STREAM:{
      const { [action.payload.peerId]: removed, ...newState } = state;
      return newState;
    }
    case ADD_ALL_PEERS:
      return {
        ...state,
        ...action.payload.peers,
      };
    case REMOVE_ALL_PEERS:
      return initialState;
    default:
      return { ...state };
  }
};
export default peersReducer;
