import {
  CREATE_NEW_ROOM,
  JOIN_A_ROOM
} from '../../action/multiplayer/rooms';

const initialState = {
  room: "",
  username: "",
  roomcode: "",
  test: "get me",
  owner: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_ROOM:
      console.log("updateing")
      console.log(action.roomcode)
      return {
        ...state,
        roomcode: action.roomcode,
        owner: action.owner,
      };
    case JOIN_A_ROOM:
      return {
        ...state,
        roomcode: action.roomcode,
        owner: action.owner,
      };
    default:
      return state;
  }
};

export default reducer;
