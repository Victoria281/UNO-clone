//@ts-nocheck
import {
    getAllCards,
    dealCards,
    getRandomInt,
    filterPlayableCards,
    applyCard,
    getOrderArray,
    checkOneCardLeft,
    applyDrawCard,
    pauseGame,
    continueGame,
    applyUnoPenalty
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
                pauseTurn: "",
                order: getOrderArray(playerCount),
                playerdeck: arr[0],
                roomcode: roomcode,
                reverse: 0,
                unoPressed: {
                    player: false,
                    pressed: false
                },
                unoPenalty: null,
                toDrawCard: {
                    player: false,
                    number: false,
                },
                getDrawnCard: {
                    player: false,
                    num: false,
                },
                otherPlayerPlayingCard: {
                    player: false,
                    card: false,
                },
            }
            gameState = applyCard(null, gameState, arr[1][0], true)
            console.log(gameState)
            socket.emit('sendStartGame', gameState)
        })
}

export const startGameDetected = (data) => async (dispatch, getState) => {
    console.log("starting game herer")
    console.log(data)
    const user = getState().multiplayer_rooms.user;
    const game_state = data.gameState;
    data.myTurnIs = data.players.findIndex((u) => u.username === user.username)

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

const playCard = (game_state, card, color) => {
    console.log("running thisss")
    var new_game_state = applyCard(color, game_state, card, null)
    console.log(new_game_state)
    if (new_game_state.getDrawnCard.player !== false) {
        new_game_state.toDrawCard = {
            player: new_game_state.getDrawnCard.player,
            number: new_game_state.getDrawnCard.num,
        };
        new_game_state.getDrawnCard = {
            player: false,
            number: false,
        };
        new_game_state = pauseGame(game_state, null)
    }


    var playerWhoPlayedCard = game_state.turn
    if (new_game_state.playerdeck["player" + playerWhoPlayedCard].length === 1) {
        new_game_state.unoPressed = {
            player: playerWhoPlayedCard,
            pressed: false
        }
        if (new_game_state.pauseTurn === null) {
            new_game_state = pauseGame(game_state, null)
        }
    }
    return new_game_state
}

export const sendPlayerAction = (actions, socket, other) => async (dispatch, getState) => {
    console.log("Action to do: " + actions)
    const game_state = getState().multiplayer_rooms.game_state;
    switch (actions) {
        case "play": {
            game_state.otherPlayerPlayingCard = {
                player: game_state.turn,
                card: other.card,
            };
            if (other.card.color === "wild") {
                game_state.otherPlayerPlayingCard["color"] = other.color
            }
            break;
        }
        case "draw": {
            game_state.toDrawCard = {
                player: game_state.turn,
                number: 1,
            };
            break;
        }
        default:
            break;
    }
    const new_game_state = pauseGame(game_state, null)

    socket.emit('sendGameUpdate', {
        new_game_state
    })
}

export const startPlayerAction = (actions, socket) => (dispatch, getState) => {
    console.log("Time to do the action")
    console.log("Action to do: " + actions)
    const game_state = getState().multiplayer_rooms.game_state;
    var new_game_state = continueGame(game_state, null)
    switch (actions) {
        case "play": {
            new_game_state = playCard(new_game_state, new_game_state.otherPlayerPlayingCard.card, new_game_state.otherPlayerPlayingCard.color)
            new_game_state.otherPlayerPlayingCard = {
                player: false,
                card: false,
            }
            break;
        }
        case "draw": {
            new_game_state = applyDrawCard(new_game_state, game_state.toDrawCard.number, game_state.toDrawCard.player)
            game_state.toDrawCard = {
                player: false,
                number: false,
            };
            break;
        }
        default:
            break;
    }

    console.log("Action finished")
    console.log(new_game_state)
    socket.emit('sendGameUpdate', {
        new_game_state
    })
}

export const checkCard = (socket) => async (dispatch, getState) => {
    const game_state = getState().multiplayer_rooms.game_state;
    const new_game_state = checkOneCardLeft(game_state)
    const myTurnIs = getState().multiplayer_rooms.myTurnIs;
    if (myTurnIs != -1) {
        game_state.playerdeck["player" + myTurnIs] = filterPlayableCards(game_state.current, game_state.playerdeck["player" + myTurnIs], game_state.turn === myTurnIs)
    }    
    socket.emit('sendGameUpdate', {
        new_game_state
    })
}

export const unoPenalty = () => async (dispatch, getState) => {
    const game_state = getState().multiplayer_rooms.game_state;
    var new_game_state = applyUnoPenalty(game_state);
    const myTurnIs = getState().multiplayer_rooms.myTurnIs;
    if (myTurnIs != -1) {
        new_game_state.playerdeck["player" + myTurnIs] = filterPlayableCards(new_game_state.current, new_game_state.playerdeck["player" + myTurnIs], new_game_state.turn === myTurnIs)
    }      
    new_game_state.unoPenalty = null;

    new_game_state = continueGame(game_state, null)

    socket.emit('sendGameUpdate', {
        new_game_state
    })
}


