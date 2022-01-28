import { ContactSupportOutlined } from "@material-ui/icons"
import {
    getAllCards,
    dealCards,
    getRandomInt,
    filterPlayableCards,
    applyCard,
    getOrderArray,
    checkOneCardLeft,
    drawACard,
    runPlayerToDrawCard
} from "../../features/multiplayer/game"

export const UPDATE_PLAYER_LIST = "UPDATE_PLAYER_LIST"
export const PREPARE_GAME = "PREPARE_GAME"
export const UPDATE_GAME = "UPDATE_GAME"
export const UPDATE_UNO_PRESSED = "UPDATE_UNO_PRESSED"


export const updatePlayerList = (player_list, id) => async dispatch => {
    var myTurnIs = player_list.findIndex(item => item.id == id)
    dispatch({
        type: UPDATE_PLAYER_LIST,
        player_list,
        myTurnIs
    });
}

export const prepareGameMaterials = (socket) => async (dispatch, getState) => {
    getAllCards()
        .then(result => {
            const playerCount = getState().multiplayer_rooms.players.length;
            const roomcode = getState().multiplayer_rooms.roomcode;
            var arr = dealCards(result, playerCount);
            var gameState = {
                mainDeck: arr[1].slice(1),
                used: [],
                current: {},
                turn: getRandomInt(playerCount),
                order: getOrderArray(playerCount),
                playerdeck: arr[0],
                roomcode: roomcode
            }
            gameState = applyCard(null, gameState, arr[1][0], true)
            console.log(gameState)
            socket.emit('sendStartGame', gameState)
        })
}

export const startGameDetected = (data) => async (dispatch, getState) => {
    console.log(data)
    const user = getState().multiplayer_rooms.user;
    console.log(user)
    const game_state = data.gameState;
    data.myTurnIs = data.players.findIndex((u) => u.username === user.username)

    console.log(data.myTurnIs)
    console.log(data.players)
    if (data.myTurnIs != -1) {
        game_state.playerdeck["player" + data.myTurnIs] = filterPlayableCards(game_state.current, game_state.playerdeck["player" + data.myTurnIs], game_state.turn === data.myTurnIs)
    }

    dispatch({
        type: PREPARE_GAME,
        game_state,
        myTurnIs: data.myTurnIs,
        status: data.status
    });
    console.log("after dispatch")

}

export const updateGameDetected = (data) => async (dispatch, getState) => {
    const myTurnIs = getState().multiplayer_rooms.myTurnIs;
    if (myTurnIs != -1) {
        data.playerdeck["player" + myTurnIs] = filterPlayableCards(data.current, data.playerdeck["player" + myTurnIs], data.turn === myTurnIs)
    } 
    dispatch({
        type: UPDATE_GAME,
        data
    });
}

export const playCard = (card, socket, color) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_rooms.game_state;
    const new_game_state = applyCard(color, game_state, card, null)
    var playerWhoPlayedCard;
    if (game_state.turn == null) {
        playerWhoPlayedCard = game_state.pauseTurn
    } else {
        playerWhoPlayedCard = game_state.turn
    }

    // console.log(card)
    // console.log(game_state)
    // console.log(new_game_state)
    console.log("fwsujifbverigbvnedrgbvrtdhgrdthdrtyhjr")
    console.log(playerWhoPlayedCard)
    console.log(new_game_state.playerdeck["player" + playerWhoPlayedCard].length)
    if (new_game_state.playerdeck["player" + playerWhoPlayedCard].length === 1) {
        new_game_state.unoPressed = {
            player: playerWhoPlayedCard,
            pressed: false
        }
    }

    socket.emit('sendGameUpdate', {
        new_game_state
    })
}


export const drawCard = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = drawACard(game_state);
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    new_game_state.toDrawCard = false

    dispatch({
        type: UPDATE_GAME,
        new_game_state
    });
}


export const playerToDrawCard = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = runPlayerToDrawCard(game_state);
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    new_game_state.getDrawnCard = false;

    dispatch({
        type: UPDATE_GAME,
        new_game_state
    });
}

