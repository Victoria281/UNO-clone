import { RoomServiceOutlined } from '@material-ui/icons';
import {
  UPDATE_FRIENDS,
  CREATE_NEW_ROOM,
  JOIN_A_ROOM,
  UPDATE_ROOM,
  UPDATE_FRIEND_REQUESTS
} from '../../action/multiplayer/rooms';

const initialState = {
  roomcode: "",
  status: "",
  players: [],
  owner: "",
  private: null,
  friends: [],
  friendRequests: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case CREATE_NEW_ROOM:
      return {
        ...state,
        roomcode: action.roomcode,
      };
    case JOIN_A_ROOM:
      return {
        ...state,
        roomcode: action.roomcode,
      };
    case UPDATE_ROOM:
      return {
        ...state,
        status: action.roomState.status,
        players: action.roomState.players,
        owner: action.roomState.owner,
        private: action.roomState.private,
      };
    case UPDATE_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.friendRequests,
      };
    default:
      return state;
  }
};

export default reducer;
