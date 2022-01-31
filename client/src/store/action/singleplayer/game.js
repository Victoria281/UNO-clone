// @ts-nocheck
import {
    getAllCards,
    dealCards,
    getRandomInt,
    filterPlayableCards,
    getOrderArray,
    checkOneCardLeft,
    runPlayerToDrawCard,
    applyUnoPenalty,
    checkGameEnd
} from "../../features/multiplayer/game"
import {
    drawACard,
    boyPlayCard,
    applyCard,
    saveScore
} from "../../features/singleplayer/game"


export const SINGLEPLAYER_PREPARE_GAME = "SINGLEPLAYER_PREPARE_GAME"
export const SINGLEPLAYER_UPDATE_GAME = "SINGLEPLAYER_UPDATE_GAME"
export const UPDATE_UNO_PRESSED = "UPDATE_UNO_PRESSED"

export const endGame = (uid, token) => async (dispatch, getState) => {
    if (uid !== undefined && token !== undefined){
        const game_state = getState().singleplayer_game;
        var score = 10;
        var status = 0;
        if (game_state.playerdeck["player0"].length === 0) {
            status = 1;
            for (var card in game_state.playerdeck) {
                game_state.playerdeck[card].map((single)=>{
                    if (single.color === "wild"){
                        score += 5;
                    } else {
                        score += 5;
                    }
                })
            }
        }
        console.log("Saving score...")
        saveScore(uid, score, status, token)
    }
}

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
                playerTurn: 0,
                unoPressed: {
                    player: false,
                    pressed: false
                },
                unoPenalty: null,
                toDrawCard: false,
                getDrawnCard: false,
                botPlayingCard: false,
                end: false
            }
            gameState = applyCard(null, gameState, arr[1][0], true)
            gameState.playerdeck["player0"] = filterPlayableCards(gameState.current, gameState.playerdeck["player0"], gameState.turn == gameState.playerTurn)

            console.log("uno has been prepared")
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
    const playerWhoPlayedCard = game_state.turn
    var new_game_state = applyCard(color, game_state, card, null)

    if (checkGameEnd(new_game_state) === true){
        new_game_state.end = true;
    }

    if (!new_game_state.end && new_game_state.playerdeck["player" + playerWhoPlayedCard].length === 1) {
        new_game_state.unoPressed = {
            player: playerWhoPlayedCard,
            pressed: false
        }
    }
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });

}

export const checkCard = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = checkOneCardLeft(game_state)
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}

export const playBotCard = (card) => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const playerWhoPlayedCard = game_state.turn

    console.log("The Bots card is being played")
    var color = null;
    if (card.color === "wild") {
        var unoColors = ["red", "green", "blue", "yellow"]
        color = unoColors[getRandomInt(4)]
    }

    const new_game_state = applyCard(color, game_state, card, null)

    new_game_state.botPlayingCard = false

    if (checkGameEnd(new_game_state) === true){
        new_game_state.end = true;
    }

    if (!new_game_state.end && new_game_state.playerdeck["player" + playerWhoPlayedCard].length === 1) {
        var r = Math.random();
        if (r > 0.75) {
            new_game_state.unoPressed = {
                player: playerWhoPlayedCard,
                pressed: false
            }
        }
    }

    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)

    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
    // console.log("i ended")
    return;
}



export const botTurn = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = boyPlayCard(game_state)
    // // console.log(card)
    // // console.log(game_state)
    // // console.log(new_game_state)
    // if (game_state.playerdeck["player0"].length ===new_game_state 1) {
    //     // console.log("Times start")
    //     setTimeout(() => {
    //         // console.log("Times up")
    //         const timeout_game_state = getState().multiplayer_game;
    //         checkOneCardLeft(timeout_game_state)
    //     }, 5000);
    // }
    // console.log("check thisss")
    // console.log(new_game_state)
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}



export const sortCards = (sortby) => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game
    console.log(game_state.playerdeck["player"+game_state.playerTurn])
    if (sortby === "color") {
        game_state.playerdeck["player"+game_state.playerTurn].sort(function(a, b) {
          var keyA = a.color, keyB = b.color;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        console.log(game_state.playerdeck["player"+game_state.playerTurn])
    } else {
        game_state.playerdeck["player"+game_state.playerTurn].sort(function(a, b) {
          var keyA = parseInt(a.values), keyB = parseInt(b.values);
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        console.log(game_state.playerdeck["player"+game_state.playerTurn])
    }
    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        game_state
    });
}

export const callUNO = () => async (dispatch, getState) => {
    // console.log("uno button pressed")
    dispatch({
        type: UPDATE_UNO_PRESSED,
        unoPressed: {
            player: false,
            pressed: false
        }
    });
}

export const drawCard = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = drawACard(game_state);
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    new_game_state.toDrawCard = false

    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}


export const playerToDrawCard = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = runPlayerToDrawCard(game_state);
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    new_game_state.getDrawnCard = false;

    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}

export const unoPenalty = () => async (dispatch, getState) => {
    const game_state = getState().singleplayer_game;
    const new_game_state = applyUnoPenalty(game_state);
    new_game_state.playerdeck["player0"] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player0"], new_game_state.turn == new_game_state.playerTurn)
    new_game_state.unoPenalty = null;

    dispatch({
        type: SINGLEPLAYER_UPDATE_GAME,
        new_game_state
    });
}
