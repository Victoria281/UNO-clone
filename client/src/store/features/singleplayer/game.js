// @ts-nocheck

import { ContactlessOutlined } from "@material-ui/icons";
import {
    getRandomInt,
    applyCard
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
        console.log("Bot has no card to play");
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
    console.log("Bot is playing card ----------");
    console.log(gameState);
    var arr = gameState.playerdeck["player" + gameState.turn]
    var normal_playable = arr.filter(
        (item) => item.color === gameState.current.color || item.values === gameState.current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");
    var r = Math.random();
    var cardplayed = getCardForBot(r, wild_playable, normal_playable)
    console.log(cardplayed)

    if (cardplayed === {}) {
        console.log("Bot card is empty");
        console.log(gameState);
    } else {
        console.log("THE BOT HAS CHOSEN ")
        console.log(cardplayed)
        
    }

    gameState.playerdeck["player" + gameState.turn].map((bcards) => {
        if (bcards === cardplayed) {
            bcards["botPlayCard"] = true;
        } else {
            bcards["botPlayCard"] = false;
        }
    })
    console.log(gameState)


    return gameState

};
