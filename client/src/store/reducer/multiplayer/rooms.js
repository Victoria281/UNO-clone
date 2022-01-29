import { LocalConvenienceStoreOutlined, RoomServiceOutlined } from '@material-ui/icons';
import { connectAdvanced } from 'react-redux';
import {
  UPDATE_FRIENDS,
  CREATE_NEW_ROOM,
  JOIN_A_ROOM,
  UPDATE_ROOM,
  UPDATE_FRIEND_REQUESTS,
  INIT_STATE,
  UPDATE_IDENTITY,
  UPDATE_CHAT_MESSAGE
} from '../../action/multiplayer/rooms';
import {
  UPDATE_PLAYER_LIST,
  PREPARE_GAME,
  UPDATE_GAME,
  UPDATE_UNO_PRESSED
} from '../../action/multiplayer/game';

const initialState = {
  user: {},
  roomcode: "",
  status: false,
  players: [],
  audience: [],
  owner: "",
  private: null,
  friends: [],
  friendRequests: [],
  myTurnIs: 0,
  game_state: {
    mainDeck: [],
    used: [],
    current: {},
    playerdeck: [],
    turn: "",
    pauseTurn: "",
    order: [],
    reverse: 0,
    unoPressed: {
      player: false,
      pressed: false
    },
    unoPenalty: null,
    toDrawCard: false,
    getDrawnCard: false,
    otherPlayerPlayingCard: false,
  },
  chat: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STATE:
      return {
        ...state,
        roomcode: action.start.roomcode,
        status: action.start.status,
        players: action.start.players,
        owner: action.start.owner,
        private: action.start.private,
        friends: action.start.friends,
        audience: action.start.audience,
        friendRequests: action.start.friendRequests,
      };
    case UPDATE_IDENTITY:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case CREATE_NEW_ROOM:
      return {
        ...state,
        roomcode: action.roomcode,
        chat: []
      };
    case JOIN_A_ROOM:
      return {
        ...state,
        roomcode: action.start.roomcode,
        status: action.start.status,
      };
    case UPDATE_ROOM:
      return {
        ...state,
        status: action.roomState.status,
        players: action.roomState.players,
        audience: action.roomState.audience,
        owner: action.roomState.owner,
        private: action.roomState.private,
      };
    case UPDATE_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.friendRequests,
      };
    case PREPARE_GAME:
      return {
        ...state,
        game_state: action.game_state,
        status: action.status,
        myTurnIs: action.myTurnIs
      };
    case UPDATE_GAME:
      return {
        ...state,
        game_state: action.data
      };
    case UPDATE_CHAT_MESSAGE:
      return {
        ...state,
        chat: action.roomstate.chat
      };
    default:
      return state;
  }
};

export default reducer;
