// @ts-nocheck
import {
    getAllCards,
    dealCards,
    getRandomInt,
    filterPlayableCards,
    applyCard,
    getOrderArray,
    checkOneCardLeft,
    drawACard
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
            const playerCount = getState().multiplayer_game.player_list.length;
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
            socket.emit('sendStartGame', gameState)
        })
}

export const startGameDetected = (data) => async (dispatch, getState) => {
    const player = getState().multiplayer_game.myTurnIs;
    data.playerdeck["player" + player] = filterPlayableCards(data.current, data.playerdeck["player" + player], data.turn === player)
    dispatch({
        type: PREPARE_GAME,
        data
    });
    console.log(data.order)
    return data.order.slice(player+1).concat(data.order.slice(0, player))
}

export const updateGameDetected = (data) => async (dispatch, getState) => {
    const player = getState().multiplayer_game.myTurnIs;
    data.playerdeck["player" + player] = filterPlayableCards(data.current, data.playerdeck["player" + player], data.turn === player)
    dispatch({
        type: UPDATE_GAME,
        data
    });
}

export const playCard = (card, socket, color) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_game;
    const new_game_state = applyCard(color, game_state, card, null)
    const roomcode = getState().multiplayer_rooms.roomcode;

    if (game_state.playerdeck["player" + game_state.turn].length === 1) {
        console.log("Times start")
        setTimeout(() => {
            console.log("Times up")
            const timeout_game_state = getState().multiplayer_game;
            checkOneCardLeft(timeout_game_state)
        }, 5000);
    }

    socket.emit('sendGameUpdate', {
        ...new_game_state,
        roomcode: roomcode
    })
}

export const callUNO = (state) => async (dispatch, getState) => {
    console.log("uno button pressed")
    dispatch({
        type: UPDATE_UNO_PRESSED,
        press: true
    });
}

export const drawCard = (socket) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_game;
    const new_drawn_game_state = drawACard(game_state);
    if (new_drawn_game_state.color === "wild"){
        return new_drawn_game_state
    } else {
        const roomcode = getState().multiplayer_rooms.roomcode;
    
        socket.emit('sendGameUpdate', {
            ...new_drawn_game_state,
            roomcode: roomcode
        })
    }
}


