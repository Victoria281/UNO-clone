//@ts-nocheck

//Set variable for Q Learning algo
export const setBotSettings = (user_input) => {
    user_input = 20;

    var x = user_input / 100

    var learning_rate = x;
    var discount_factor = x;

    var bot_settings = {
        learning_rate,
        discount_factor
    }
    console.log("Bot Settings ------------------------------------")
    console.log(bot_settings)
    console.log("------------------------------------")
    return bot_settings;
}

//Get current state of bot
export const getCurrentState = (current_card, player_hand) => {

    var state_current = current_card.color;
    var normalc_count = {
        R: 0,
        B: 0,
        Y: 0,
        G: 0
    }

    var actionc_count = {
        SKI: 0,
        REV: 0,
        PL2: 0,
        COL: 0,
        PL4: 0
    }

    for (var i; i < player_hand.length; i++) {
        var card_value = player_hand[i].values;
        var card_color = player_hand[i].color;

        switch (card_value) {
            case "10":
                actionc_count.SKI++;
                break;
            case "11":
                actionc_count.REV++;
                break;
            case "12":
                actionc_count.PL2++;
                break;
            case "13":
                actionc_count.COL++;
                break;
            case "14":
                actionc_count.PL4++;
                break;
            default:
                switch (card_color) {
                    case 'red':
                        normalc_count.R++;
                        break;
                    case 'blue':
                        normalc_count.B++;
                        break;
                    case 'yellow':
                        normalc_count.Y++;
                        break;
                    case 'green':
                        normalc_count.G++;
                        break;
                }
        }
    }

    var state_playable = "" + normalc_count.R + normalc_count.B + normalc_count.Y + normalc_count.G + actionc_count.SKI + actionc_count.REV + actionc_count.PL2 + actionc_count.COL + actionc_count.PL4;
    var state = + state_current + state_playable;

    console.log("State ------------------------------------")
    console.log(state)
    console.log("------------------------------------")

    return state;
}

//Get Q value of the state and action if any
export const getQValue  = async (state, action) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/${state}/${action}`, {
            method: "GET",
        });

        console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from get stateaction ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data.qvalue;
    } catch (err) {

        const data = {
            error: err
        };

        return data;
    }
}

//Get all possible actions and qvalues for state
export const listStateActions = async (state) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/${state}` , {
            method: "GET",
        });

        console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from get states ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        const data = {
            error: err
        };

        return data;
    }
}

// Choose an action based on the highest q value action for that state
export const chooseAction = (list_of_actions, player_hand) => {
    var highestQ = 0;
    var index = 0;
    var action = {
        action_value: 0,
        action_taken: {}
    };
    var cardplayed = {};

    list_of_actions.map((action) => {
        if (action.qvalue > highestQ) {
            highestQ = list_of_actions[i].qvalue;
            index = i;
        }
    })

    var action_value = list_of_actions[index].action;

    switch (action_value) {
        case "SKI":
            cardplayed = player_hand.find(card => {
                card.values === 10
            });
            break;
        case "REV":
            cardplayed = player_hand.find(card => {
                card.values === 11
            });
            break;
        case "PL2":
            cardplayed = player_hand.find(card => {
                card.values === 12
            });
            break;
        case "COL":
            cardplayed = player_hand.find(card => {
                card.values === 13
            });
            break;
        case "PL4":
            cardplayed = player_hand.find(card => {
                card.values === 14
            });
            break;
        case "RED":
            cardplayed = player_hand.find(card => {
                card.color === action_value.toLowerCase()
            });
            break;
        case "YELLOW":
            cardplayed = player_hand.find(card => {
                card.color === action_value.toLowerCase()
            });
            break;
        case "BLUE":
            cardplayed = player_hand.find(card => {
                card.color === action_value.toLowerCase()
            });
            break;
        case "GREEN":
            cardplayed = player_hand.find(card => {
                card.color === action_value.toLowerCase()
            });
            break;
    }

    action = {
        action_value : action_value,
        action_taken : cardplayed
    }

    console.log("Action from Choose Action ------------------------------------")
    console.log("Card Chosen: " + cardplayed)
    console.log(action.action_taken + " --- " + action_value)
    console.log("------------------------------------")
    return action;
}

//Choose random action for the bot
export const getCardForBot = (r, wild_playable, normal_playable) => {
    var cardplayed = {};
    var action = {
        action_value: 0,
        action_taken: {}
    };

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

    switch (cardplayed.values) {
        // switch ("1") {
            //skip is 10
            case "10":
                action_value = "SKI"
                break;
    
            //reverse is 11
            case "11":
                action_value = "REV"
                break;
    
            //+2 draw is 12
            case "12":
                action_value = "PL2"
                break;
    
            //wild is 13
            case "13":
                action_value = "COL"
                break;
    
            //+4 is 14
            case "14":
                action_value = "PL4"
                break;
            default: 
                action_value = cardplayed.color.toUpperCase()
    }

    action = {
        action_value: action_value,
        action_taken: cardplayed
    }

    return action
}

//The epsilon greedy algo and the getting the card to be played by bot
export const setCardPlay = (r, state, wild_playable, normal_playable) => {

    //var player_hand = normal_playable.concat(wild_playable);

    //var state = getCurrentState(current_card, playable_hand);
    var list_of_actions = listStateActions(state);

    var epsilon = 5

    var action;

    if ((r * 10) > epsilon && list_of_actions.err !== undefined) {
        action = chooseAction(list_of_actions, player_hand)
    } else {
        action = getCardForBot(r, wild_playable, normal_playable);
    }
    var cardplayed = action.action_taken

    insertQStateAction(state,action.action_value)

    console.log("Card Played ------------------------------------")
    console.log(cardplayed)
    console.log("------------------------------------")

    return cardplayed;
}

// Insert a new state and action
export const insertQStateAction = async (state, action) => {
    
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/`, {
            method: "POST",
            body: {
                state: state,
                action: action
            }
        });

        console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from insert ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        const data = {
            error: err
        };

        return data;
    }
}

// Plays the card itself
export const boyPlayCard = (gameState) => {
    console.log("Bot is choosing card ----------");

    // console.log(gameState);
    var arr = gameState.playerdeck["player" + gameState.turn]
    var normal_playable = arr.filter(
        (item) => item.color === gameState.current.color || item.values === gameState.current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");
    var r = Math.random();
    var cardplayed = setCardPlay(r, gameState.botcurrentstate, normal_playable, wild_playable);


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

// Get reward for action
export const rewardFn = (current_card, cardplayed) => {
    var reward = 0.0;

    if (cardplayed.values >= 10) {
        reward = (-1 / (5 / cardplayed.values) + 1.1) + 1.1
    } else if (current_card.color !== cardplayed) {
        reward = (-1 / cardplayed.values + 1.1) + 1.1
    } else {
        reward = (1 / 1 + Math.pow(Math.E, -cardplayed.values / 5)) - 0.5
    }

    console.log("Reward ------------------------------------")
    console.log(reward)
    console.log("------------------------------------")
    return reward;
}

// Get the max q value for the next state and its actions
export const getMaxQValue = (current_card, player_hand) => {

    var new_state = getCurrentState(current_card, player_hand);
    var possible_actions = listStateActions(new_state);

    var highestQ = 0;
    var index = 0;

    possible_actions.map((action) => {
        if (action.qvalue > highestQ) {
            highestQ = list_of_actions[i].qvalue;
            index = i;
        }
    })

    var max_qvalue = possible_actions[index].qvalue;

    console.log("Max Q Value ------------------------------------")
    console.log(max_qvalue)
    console.log("------------------------------------")
    return max_qvalue;
}

// Update the Q table
export const updateQ = async (qvalue, state, action, bot_settings, reward, max_qvalue) => {

    qvalue = qvalue + bot_settings.learning_rate * (reward + bot_settings.discount_factor * (max_qvalue - qvalue));

    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/update/` + state, {
            method: "PUT",
            body: {
                state: state,
                action: action,
                qvalue: qvalue
            }
        });

        console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from update q value ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        const data = {
            error: err
        };

        return data;
    }
}
