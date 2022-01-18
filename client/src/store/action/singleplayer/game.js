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
import {
    boyPlayCard
} from "../../features/singleplayer/game"


export const SINGLEPLAYER_PREPARE_GAME = "SINGLEPLAYER_PREPARE_GAME"
export const SINGLEPLAYER_UPDATE_GAME = "SINGLEPLAYER_UPDATE_GAME"
export const UPDATE_UNO_PRESSED = "UPDATE_UNO_PRESSED"

export const prepareGameMaterials = () => async (dispatch, getState) => {
    return getAllCards()
        .then(result => {
            const playerCount = 4;
            var arr = dealCards(result, playerCount);
            var gameState = {
                mainDeck: arr[1].slice(1),
                used: [],
                current: {},
                // turn: getRandomInt(playerCount),
                turn: 0,
                order: getOrderArray(playerCount),
                playerdeck: arr[0],
                playerTurn: 0
            }
            gameState = applyCard(null, gameState, arr[1][0], true)
            gameState.playerdeck["player0"] = filterPlayableCards(gameState.current, gameState.playerdeck["player0"], gameState.turn == gameState.playerTurn)

            dispatch({
                type: SINGLEPLAYER_PREPARE_GAME,
                gameState
            });
            const indexOfPlayer = gameState.order.findIndex((i) => i === gameState.playerTurn)
            return gameState.order.slice(indexOfPlayer + 1).concat(gameState.order.slice(0, indexOfPlayer))
        })
}

export const playCard = (card, color) => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = applyCard(color, game_state, card, null)
    // console.log(card)
    // console.log(game_state)
    // console.log(new_game_state)
    // if (game_state.playerdeck["player0"].length ===new_game_state 1) {
    //     console.log("Times start")
    //     setTimeout(() => {
    //         console.log("Times up")
    //         const timeout_game_state = getState().multiplayer_game;
    //         checkOneCardLeft(timeout_game_state)
    //     }, 5000);
    // }

    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}

export const playBotCard = (card) => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;

    var color = null;
    if (card.color === "wild") {
        var unoColors = ["red", "green", "blue", "yellow"]
        color = unoColors[getRandomInt(4)]
    }

    const new_game_state = applyCard(color, game_state, card, null)
    // console.log(card)
    // console.log(game_state)
    // console.log(new_game_state)
    // if (game_state.playerdeck["player0"].length ===new_game_state 1) {
    //     console.log("Times start")
    //     setTimeout(() => {
    //         console.log("Times up")
    //         const timeout_game_state = getState().multiplayer_game;
    //         checkOneCardLeft(timeout_game_state)
    //     }, 5000);
    // }

    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}



export const botTurn = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = boyPlayCard(game_state)
    // console.log(card)
    // console.log(game_state)
    // console.log(new_game_state)
    // if (game_state.playerdeck["player0"].length ===new_game_state 1) {
    //     console.log("Times start")
    //     setTimeout(() => {
    //         console.log("Times up")
    //         const timeout_game_state = getState().multiplayer_game;
    //         checkOneCardLeft(timeout_game_state)
    //     }, 5000);
    // }
    console.log("check thisss")
    console.log(new_game_state)
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
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
    if (new_drawn_game_state.color === "wild") {
        return new_drawn_game_state
    } else {
        const roomcode = getState().multiplayer_rooms.roomcode;

        socket.emit('sendGameUpdate', {
            ...new_drawn_game_state,
            roomcode: roomcode
        })
    }
}


