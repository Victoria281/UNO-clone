//@ts-nocheck

//Set variable for Q Learning algo
export const setBotSettings = (user_input) => {

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

    var state_current = current_card.color.charAt(0).toUpperCase();

    console.log("Get State Player Hand------------------------")
    console.log(player_hand[0].values);
    console.log(player_hand.length);
    console.log("---------------------------------------")
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

    player_hand.map((card) => {
        //console.log("Did u go throuogh?")
        var card_value = card.values;
        var card_color = card.color;

        switch (card_value) {
            case "10":
                //console.log("Added")
                actionc_count.SKI += 1;
                break;
            case "11":
                //console.log("Added")
                actionc_count.REV += 1;
                break;
            case "12":
                //console.log("Added")
                actionc_count.PL2 += 1;
                break;
            case "13":
                //console.log("Added")
                actionc_count.COL += 1;
                break;
            case "14":
                //console.log("Added")
                actionc_count.PL4 += 1;
                break;
            default:
                switch (card_color) {
                    case 'red':
                        // console.log("Added")
                        normalc_count.R += 1;
                        break;
                    case 'blue':
                        //  console.log("Added")
                        normalc_count.B += 1;
                        break;
                    case 'yellow':
                        //  console.log("Added")
                        normalc_count.Y += 1;
                        break;
                    case 'green':
                        //console.log("Added")
                        normalc_count.G += 1;
                        break;
                }
        }
    })

    var state_playable = "" + normalc_count.R + normalc_count.B + normalc_count.Y + normalc_count.G + actionc_count.SKI + actionc_count.REV + actionc_count.PL2 + actionc_count.COL + actionc_count.PL4;
    var state = "" + state_current + state_playable;

    console.log("State ------------------------------------")
    console.log(state)
    console.log("------------------------------------")

    return state;
}

//get action values
export const getActionValue = async (actionname) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/action/${actionname}`, {
            method: "GET",
        })
        var result = await response.json();
        console.log("Data from get action value------------------------------------")
        console.log(result.action_value[0])
        console.log("------------------------------------")

        return result.action_value[0];
    } catch (err) {

        console.log("err")
        console.log(err)
        // const data = {
        //     error: err
        // };

        // return data;
    }
}

//Get Q value of the state and action if any
export const getQValue = async (state, action) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/findq/${state}/${action}`, {
            method: "GET",
        });

        //console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from get stateaction ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        console.log(err)
    }
}

//Get all possible actions and qvalues for state
export const listStateActions = async (state) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/find/${state}`, {
            method: "GET",
        });

        //console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from get states ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        console.log(err)
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
        action_value: action_value,
        action_taken: cardplayed
    }

    console.log("Action from Choose Action ------------------------------------")
    console.log("Card Chosen: " + cardplayed)
    console.log(action.action_taken + " --- " + action_value)
    console.log("------------------------------------")
    return action;
}

//Choose random action for the bot
export const getCardForBot = async (r, wild_playable, normal_playable) => {
    var cardplayed = {};
    var actions = {
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
    }

    if (cardplayed.values === undefined) {
        return "draw"
    } else {
        var actionname;
        console.log("THE CARD PLAYED")
        console.log(cardplayed)
        switch (cardplayed.values) {
            // switch ("1") {
            //skip is 10
            case "10":
                actionname = "SKI"
                break;

            //reverse is 11
            case "11":
                actionname = "REV"
                break;

            //+2 draw is 12
            case "12":
                actionname = "PL2"
                break;

            //wild is 13
            case "13":
                actionname = "COL"
                break;

            //+4 is 14
            case "14":
                actionname = "PL4"
                break;
            default:
                actionname = cardplayed.color.toUpperCase()
        }

        console.log("DO YOU SEE ME:  " + actionname)
        var results;
        var actionvalue = await getActionValue(actionname);
        actions.action_value = actionvalue.action
        actions.action_taken = cardplayed
        console.log("Actions gotten")
        console.log(actions)

        return actions
    }
}


// Insert a new state and action
export const insertQStateAction = async (state, action) => {

    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/insert/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: state,
                action: action
            })
        });

        const data = await response.json();

        console.log("Data from insert ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        console.log(err)
    }
}

// Plays the card itself
export const botPlayCard = async (gameState) => {
    console.log("Bot is choosing card ----------");

    // console.log(gameState);
    var arr = gameState.playerdeck["player" + gameState.turn]
    var normal_playable = arr.filter(
        (item) => item.color === gameState.current.color || item.values === gameState.current.values
    );
    var wild_playable = arr.filter((item) => item.color === "wild");
    var r = Math.random();


    console.log("getting states")
    var list_of_actions = listStateActions(gameState.botcurrentstate).actions;


    var epsilon = 5

    console.log("Error Message For list of actions: ---------------------------------")
    console.log(list_of_actions);

    // if ((r * 10) > epsilon && list_of_actions !== undefined) {
    //     console.log("im herere")
    //     action = chooseAction(list_of_actions, normal_playable.concat(wild_playable))
    // } else {
        var action = await getCardForBot(r, wild_playable, normal_playable)
        if (action === "draw") {
            gameState.toDrawCard = true
            return gameState
        }
        console.log("What is the action")
        console.log(action)
        var cardplayed = action.action_taken
        console.log("cardplayed")
        console.log(cardplayed)
        console.log("inserting action")

        await insertQStateAction(gameState.botcurrentstate, action.action_value)
            .then((result) => {
                console.log(result)
                console.log("Insert completed")

            })



        gameState.playerdeck["player" + gameState.turn].map((bcards) => {
            if (bcards === cardplayed) {
                bcards["botPlayCard"] = true;
            } else {
                bcards["botPlayCard"] = false;
            }
        })
        gameState.botPlayingCard = true

        return gameState

        // })
    // }

    // .then

    // console.log(wild_playable);
    // console.log(normal_playable);
    // console.log("Bot has chosen");



    // // console.log(gameState)
    // return gameState
};

// Get reward for action
export const rewardFn = (current_card, cardplayed) => {
    var reward = 0.0;

    console.log("Reward card played values------------------------------------")
    console.log(cardplayed.values)
    console.log("------------------------------------")

    if (cardplayed.values >= 10) {
        reward = (-1 / (5 / cardplayed.values) + 1.1) + 1.1
    } else if (current_card.color !== cardplayed) {
        reward = (-1 / cardplayed.values + 1.1) + 1.1
    } else {
        reward = (1 / 1 + Math.pow(Math.E, -cardplayed.values / 5)) - 0.5
    }

    if (reward < 0) {
        reward = 0
    }

    console.log("Reward ------------------------------------")
    console.log(reward)
    console.log("------------------------------------")
    return reward;
}

// Get the max q value for the next state and its actions
export const getMaxQValue = async (current_card, player_hand) => {
    var possible_actions = [0.0]

    var new_state = getCurrentState(current_card, player_hand);
    possible_actions = await listStateActions(new_state);

    var highestQ = 0;
    var index = 0;

    console.log("going through possible actions")
    console.log(possible_actions)

    possible_actions.actions.map((action) => {
        if (action.qvalue > highestQ) {
            highestQ = list_of_actions[i].qvalue;
            index = i;
        }
    })

    var max_qvalue = possible_actions.actions[index].qvalue;

    console.log("Max Q Value ------------------------------------")
    console.log(max_qvalue)
    console.log("------------------------------------")
    return max_qvalue;
}

// Update the Q table
export const updateQ = async (qvalue, state, action, bot_settings, reward, max_qvalue) => {
    qvalue = qvalue + bot_settings.learning_rate * (reward + bot_settings.discount_factor * (max_qvalue - qvalue));
    var qdata = {
        state: state,
        action: action,
        qvalue: Math.round(qvalue * 100) / 100
    }
    console.log(qdata)
    console.log(JSON.stringify(qdata))
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/game/update/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(qdata)
        });

        console.log("response: " + response.statusText);

        const data = await response.json();

        console.log("Data from update q value ------------------------------------")
        console.log(data)
        console.log("------------------------------------")

        return data;
    } catch (err) {

        console.log(err)
    }
}
