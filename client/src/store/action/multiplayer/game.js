import { ContactSupportOutlined } from "@material-ui/icons"
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
    game_state.myTurnIs = data.players.findIndex((u)=>u.username === user.username)

    console.log(game_state.myTurnIs)
    console.log(data.players)
    game_state.playerdeck["player" + game_state.myTurnIs] = filterPlayableCards(game_state.current, game_state.playerdeck["player" + game_state.myTurnIs], game_state.turn === game_state.myTurnIs)
    
    dispatch({
        type: PREPARE_GAME,
        game_state,
        status: data.status
    });
    return game_state.order.slice(game_state.myTurnIs+1).concat(game_state.order.slice(0, game_state.myTurnIs))
}

export const updateGameDetected = (data) => async (dispatch, getState) => {
    data.playerdeck["player" + data.myTurnIs] = filterPlayableCards(data.current, data.playerdeck["player" + data.myTurnIs], data.turn === data.myTurnIs)

    dispatch({
        type: UPDATE_GAME,
        data
    });
}

export const playCard = (card, socket, color) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_rooms.game_state;
    const new_game_state = applyCard(color, game_state, card, null)
    const playerWhoPlayedCard = game_state.turn

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

export const callUNO = (state) => async (dispatch, getState) => {
    // console.log("uno button pressed")
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


