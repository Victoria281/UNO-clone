// @ts-nocheck
import {
    getAllCards,
    dealCards,
    getRandomInt,
    filterPlayableCards,
    applyCard,
    getOrderArray
} from "../../../features/multiplayer/game"

export const UPDATE_PLAYER_LIST = "UPDATE_PLAYER_LIST"
export const PREPARE_GAME = "PREPARE_GAME"
export const UPDATE_GAME = "UPDATE_GAME"


export const updatePlayerList = (player_list, id) => async dispatch => {
    var myTurnIs = player_list.findIndex(item => item.id == id)
    dispatch({
        type: UPDATE_PLAYER_LIST,
        player_list,
        myTurnIs
    });
}

export const prepareGameMaterials = (socket) => async (dispatch, getState) => {
    var playerdeck, mainDeck, current, turn, order;
    getAllCards()
        .then(result => {
            const playerCount = getState().multiplayer_game.player_list.length;
            const roomcode = getState().multiplayer_rooms.roomcode;

            var arr = dealCards(result, playerCount);
            playerdeck = arr[0]
            current = arr[1][0]
            mainDeck = arr[1].slice(1)
            turn = getRandomInt(playerCount)
            order = getOrderArray(playerCount)

            socket.emit('sendStartGame', {
                mainDeck: mainDeck,
                used: [],
                current: current,
                playerdeck: playerdeck,
                turn: turn,
                order: order,
                roomcode: roomcode
            })
        })
}

export const startGameDetected = (data) => async (dispatch, getState) => {
    const player = getState().multiplayer_game.myTurnIs;
    data.playerdeck["player"+player] = filterPlayableCards(data.current, data.playerdeck["player"+player])
    dispatch({
        type: PREPARE_GAME,
        data
    });
    console.log(data.order)
    return data.order.filter((p)=>p!==player)
}

export const updateGameDetected = (data) => async (dispatch, getState) => {
    const player = getState().multiplayer_game.myTurnIs;
    console.log(data)
    data.playerdeck["player"+player] = filterPlayableCards(data.current, data.playerdeck["player"+player])
    dispatch({
        type: UPDATE_GAME,
        data
    });
}

export const playCard = (card, socket) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_game;
    const new_game_state = applyCard(game_state, card)
    const roomcode = getState().multiplayer_rooms.roomcode;

    socket.emit('sendGameUpdate', {
        ...new_game_state,
        roomcode: roomcode
    })
}


