// @ts-nocheck

import { ContactlessOutlined } from "@material-ui/icons";
import {
    getRandomInt,
    applyCard,
    getNextTurn
} from "../multiplayer/game"

export const getCardForBot = (r, wild_playable, normal_playable) => {
    var cardplayed = {};

    if (wild_playable.length !== 0 && normal_playable.length !== 0) {
        if (r < 0.75) {
            cardplayed = wild_playable[Math.floor(Math.random() * wild_playable.length)];
        } else {
            cardplayed = normal_playable[Math.floor(Math.random() * normal_playable.length)];
        }
    } else if (wild_playable.length !== 0) {
        cardplayed = wild_playable[Math.floor(Math.random() * wild_playable.length)];
    } else if (normal_playable.length !== 0) {
        cardplayed = normal_playable[Math.floor(Math.random() * normal_playable.length)];
    } else {
        // console.log("Bot has no card to play");
        // players["player" + order[turn]].push(mainDeck[0]);
        // setMainDeck(mainDeck.slice(1, mainDeck.length));
        // setTurn(nextTurn(turn));
        // setAction(["No Cards to Play", order[turn]])
        // setTimeout(() => {
        //     setAction([])
        // }, 5000);

    }
    return cardplayed
}

export const boyPlayCard = (gameState) => {
    console.log("Bot is choosing card ----------");

    // console.log(gameState);
    var arr = gameState.playerdeck["player" + gameState.turn]
    var normal_playable = arr.filter(
        (item) => item.color === gameState.current.color || item.values === gameState.current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");
    var r = Math.random();
    var cardplayed = getCardForBot(r, wild_playable, normal_playable)
    console.log(wild_playable);
    console.log(normal_playable);
    console.log("Bot has chosen");
    console.log(cardplayed);
    // console.log(cardplayed)
    // console.log(cardplayed === {})
    // console.log(cardplayed.length)

    if (cardplayed.id === undefined) {
        // console.log("Bot card is empty");
        // console.log(gameState);
        gameState.toDrawCard = true
    } else {
        // console.log("THE BOT HAS CHOSEN ")
        // console.log(cardplayed)
        gameState.playerdeck["player" + gameState.turn].map((bcards) => {
            if (bcards === cardplayed) {
                bcards["botPlayCard"] = true;
            } else {
                bcards["botPlayCard"] = false;
            }
        })
        gameState.botPlayingCard = true
    }

    // console.log(gameState)


    return gameState

};

export const drawACard = (game_state) => {
    var drawnCard = game_state.mainDeck[0]
    game_state.mainDeck = game_state.mainDeck.slice(1);
    game_state.playerdeck["player" + game_state.turn].push(drawnCard)
    game_state.turn = getNextTurn(game_state.turn, game_state.order)
    return game_state
}
