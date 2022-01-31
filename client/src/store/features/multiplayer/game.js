// @ts-nocheck

export const shuffleCards = (cardarray) => {
    for (var i = cardarray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardarray[i];
        cardarray[i] = cardarray[j];
        cardarray[j] = temp;
    }
    return cardarray;
};

export const checkGameEnd = (game_state) => {
    var gameEnd = false;

    console.log(game_state)


    for (var key in game_state.playerdeck) {
        if (game_state.playerdeck[key].length === 0) {
            gameEnd = true;
        }
    }

    return gameEnd;
};

export const pauseGame = (game_state, first) => {
    if (first === null) {
        game_state.pauseTurn = game_state.turn
        game_state.turn = null
    }
    return game_state
};

export const continueGame = (game_state, first) => {
    if (first === null) {
        game_state.turn = game_state.pauseTurn
        game_state.pauseTurn = null
    }
    return game_state
};

export const getRandomInt = (num, start) => {
    if (start === undefined) {
        start = 0
    }
    return Math.floor(Math.random() * (num - start) + start);
};

export const checkFirstCardPlayable = (c1, c2) => {
    // // console.log(c1)
    // // console.log(c2)
    if ((c1.color === c2.color ||
        c1.values === c2.values ||
        c1.color === "wild")) {
        // // console.log("true")
        return true
    } else {
        // // console.log("false")
        return false
    }
};

export const getOrderArray = (num) => {
    var order_arr = []
    for (var i = 0; i < num; i++) {
        order_arr.push(i)
    }
    order_arr = shuffleCards(order_arr)
    return order_arr
};

export const getAllCards = async () => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/api/uno/cards");
        const jsonData = await response.json()
        var cards_retrieved = shuffleCards(jsonData.cards);
        return cards_retrieved
    } catch (err) {
        // console.log("error")
        // console.error(err.message);
    }
}

export const dealCards = (cardarray, numOfPlayers) => {
    cardarray.map((card) => {
        card["botPlayCard"] = false
    })
    var dealplayers = {};
    for (var players = 0; players < numOfPlayers; players++) {
        dealplayers["player" + players] = []
        for (var start = 0; start < 7; start++) {
            dealplayers["player" + players].push(cardarray[(start * numOfPlayers) + players]);
        }
    }
    cardarray = cardarray.slice(numOfPlayers * 7);
    return [dealplayers, cardarray];
}

export const filterPlayableCards = (currentCard, playerDeck, myTurn) => {
    playerDeck.map((cards) => {
        if (checkFirstCardPlayable(cards, currentCard) && myTurn) {
            cards.playable = true
        } else {
            cards.playable = false
        }
    })
    return playerDeck;
}

export const getNextTurn = (currentTurn, order) => {

    var playerInOrder = order.findIndex(t => t === currentTurn)
    playerInOrder += 1;
    if (playerInOrder >= order.length) {
        playerInOrder = 0;
    }
    return order[playerInOrder];
}

export const getPrevTurn = (currentTurn, order) => {

    var playerInOrder = order.findIndex(t => t === currentTurn)
    playerInOrder -= 1;
    if (playerInOrder == -1) {
        playerInOrder = order.length - 1;
    }
    return order[playerInOrder];
}

export const runPlayerToDrawCard = (game_state) => {
    for (var amtToDraw = 0; amtToDraw < game_state.getDrawnCard.num; amtToDraw++) {
        game_state.playerdeck["player" + game_state.getDrawnCard.player].push(game_state.mainDeck[amtToDraw]);
    }
    game_state.mainDeck = game_state.mainDeck.slice(game_state.getDrawnCard.num)
    return game_state
}

export const applyUnoPenalty = (game_state) => {
    for (var amtToDraw = 0; amtToDraw < 2; amtToDraw++) {
        game_state.playerdeck["player" + game_state.unoPenalty].push(game_state.mainDeck[amtToDraw]);
    }
    game_state.mainDeck = game_state.mainDeck.slice(2)
    return game_state
}

export const playSkip = (game_state) => {
    var skippedTurn = getNextTurn(game_state.turn, game_state.order)
    game_state.turn = getNextTurn(skippedTurn, game_state.order)
    return game_state
}

export const playReverse = (game_state) => {
    if (game_state.reverse === 0) {
        game_state.reverse = 1
    } else {
        game_state.reverse = 0
    }
    game_state.order = game_state.order.reverse();
    game_state.turn = getNextTurn(game_state.turn, game_state.order)
    return game_state
}

export const playDraw = (game_state, numOfCards, color, first) => {
    // console.log("in DRAW")
    var playerToDrawCard = getNextTurn(game_state.turn, game_state.order)
    game_state.turn = getNextTurn(playerToDrawCard, game_state.order)
    game_state.current.color = color
    game_state.getDrawnCard = {
        player: playerToDrawCard,
        num: numOfCards
    }
    return game_state
}

export const playWild = (game_state, color) => {
    // console.log("in wikde")
    game_state.turn = getNextTurn(game_state.turn, game_state.order)
    game_state.current.color = color
    return game_state
}

export const checkOneCardLeft = (game_state) => {
    if (game_state.unoPressed.player !== false) {
        game_state.unoPenalty = game_state.unoPressed.player
    }
    game_state.unoPressed = {
        player: false,
        pressed: false
    }
    return game_state
}

export const drawACard = (game_state) => {
    var drawnCard = game_state.mainDeck[0]
    game_state.mainDeck = game_state.mainDeck.slice(1);
    if (checkFirstCardPlayable(drawnCard, game_state.current)) {
        if (drawnCard.color !== undefined && drawnCard.color === "wild") {
            return drawnCard
        } else {
            game_state = applyCard(null, game_state, drawnCard, null)
        }
    } else {
        game_state.playerdeck["player" + game_state.turn].push(drawnCard)
    }
    game_state.turn = getNextTurn(game_state.turn, game_state.order)
    return game_state
}

export const applyDrawCard = (game_state, num, player) => {
    for (var amtToDraw = 0; amtToDraw < num; amtToDraw++) {
        game_state.playerdeck["player" + player].push(game_state.mainDeck[amtToDraw]);
    }
    game_state.mainDeck = game_state.mainDeck.slice(num)
    game_state.turn = getNextTurn(game_state.turn, game_state.order)
    return game_state
}

export const checkFirstCard = (game_state, first, card) => {
    if (first === null) {
        game_state.used.push(game_state.current)
        game_state.playerdeck["player" + game_state.turn] = game_state.playerdeck["player" + game_state.turn].filter(player_card => player_card.id !== card.id);
    } else {
        if (card.color === "wild") {
            var unoColors = ["red", "green", "blue", "yellow"]
            var color = unoColors[getRandomInt(4)]
        }
        game_state.turn = getPrevTurn(game_state.turn, game_state.order)
    }
    return [game_state, color]
}

export const applyCard = (color, game_state, card, first) => {
    var result = checkFirstCard(game_state, first, card)
    game_state = result[0]
    if (result[1] != null) {
        color = result[1]
    }

    console.log("------------------------------------------")
    console.log("Card has been played")
    console.log(card)
    console.log(game_state)
    game_state.current = card

    switch (card.values) {
        // switch ("1") {
        //skip is 10
        case "10":
            // // console.log("skipped played")
            // // console.log(game_state)
            game_state = playSkip(game_state)
            break;

        //reverse is 11
        case "11":
            // // console.log("reverse played")
            // // console.log(game_state)
            game_state = playReverse(game_state)
            break;

        //+2 draw is 12
        case "12":
            // // console.log("+2 played")
            // // console.log(game_state)
            game_state = playDraw(game_state, 2, card.color, first)
            break;

        //wild is 13
        case "13":
            // // console.log("wild played")
            // // console.log(game_state)
            // // console.log("i dunno")
            game_state = playWild(game_state, color)
            break;

        //+4 is 14
        case "14":
            // // console.log("+4 played")
            // // console.log(game_state)
            game_state = playDraw(game_state, 4, color, first)
            break;

        default:
            // // console.log("normal card played")
            // // console.log(game_state)
            game_state.turn = getNextTurn(game_state.turn, game_state.order)
            break;
    }
    console.log("new")
    console.log(game_state)
    console.log("-------------------END---------------")
    // // console.log("---------------------------------------------")
    return game_state
}



