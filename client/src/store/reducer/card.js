// // 
// import { CurrentCard, Player } from '../interfaces';
// import { useState } from 'react';

// /** 
//  * @description 
//  * This declaration contains all the player's hand
//  * 
//  * @type Player
//  */
// const allPlayers = {
//     "player1": [],
//     "player2": [],
//     "player3": [],
//     "player4": []
// };

// /** 
//  * @description
//  * This declaration contains the defaults for the uno card
//  * 
//  * @type CurrentCard
//  */
// const currentCardDetails = {
//     id: 0,
//     values: 0,
//     color: "",
//     image_files: ""
// };

// const [mainDeck, setMainDeck] = useState([]);
// const [used, setUsed] = useState([]);
// const [current, setCurrent] = useState(currentCardDetails);
// const [players, setPlayers] = useState(allPlayers);
// const [selectColor, setSelectColor] = useState("");
// const [drawCard, setDrawCard] = useState(false);
// const [ifShow, setIfShow] = useState(false);
// const [ifDraw, setIfDraw] = useState(false);
// const [playedDraw, setPlayedDraw] = useState(false);
// const [order, setOrder] = useState([1, 2, 3, 4]);
// const [turn, setTurn] = useState(0);
// const [playable, setPlayable] = useState([]);
// const [action, setAction] = useState(["",]);

// const nextTurn = (turn) => {
//     var nextPlyer = turn + 1;
//     if (nextPlyer === 4) {
//         nextPlyer = 0;
//     }
//     return nextPlyer;
// };

// const previousTurn = (turn) => {
//     var previousPlyer = turn - 1;
//     if (previousPlyer === -1) {
//         previousPlyer = 3;
//     }
//     return previousPlyer;
// };


// const goThruCards = (cardInfo) => {
//     switch (cardInfo.values) {
//         //skip is 10
//         case "10":
//             // console.log("skipped played----");
//             var skippedPlayer = nextTurn(turn);
//             // console.log("Player " + order[skippedPlayer] + " got skipped");
//             setAction(["Skipped", order[skippedPlayer]])
//             setTimeout(() => {
//                 setAction([])
//             }, 5000);
//             setTurn(nextTurn(skippedPlayer));
//             break;

//         //reverse is 11
//         case "11":
//             // console.log("reverse is played----");
//             var newOrder = [order[2], order[1], order[0], order[3]];
//             var reverseplayerIndex = newOrder.indexOf(order[turn]);
//             // console.log("New Order" + newOrder);
//             // console.log("Old Order" + order);
//             // console.log("This is the old order " + order);
//             // console.log( "The player who played reverse is " + order[turn] + " at turn is " +  turn );
//             // console.log( "The same player should be " +  newOrder[reverseplayerIndex] + " at this turn is " + reverseplayerIndex );
//             // console.log( "The next player should be " + newOrder[nextTurn(reverseplayerIndex)] + " at new turn is " + nextTurn(reverseplayerIndex) );

//             setOrder(newOrder);
//             setTurn(nextTurn(reverseplayerIndex));
//             // console.log("why handddd");
//             break;

//         //+2 draw is 12
//         case "12":
//             // console.log("draw 2 played----");
//             var drawCardPlayer = nextTurn(turn);
//             for (var draw2 = 0; draw2 < 2; draw2++) {
//                 players["player" + order[drawCardPlayer]].push(mainDeck[draw2]);
//             }
//             setAction(["+ 2", order[drawCardPlayer]])
//             setTimeout(() => {
//                 setAction([])
//             }, 5000);
//             setMainDeck(mainDeck.slice(2, mainDeck.length));
//             setPlayers(players);

//             setPlayedDraw(true);
//             setTimeout(() => {
//                 setPlayedDraw(false);
//                 setTurn(nextTurn(drawCardPlayer));
//             }, 1500);
//             break;

//         //wild is 13
//         case "13":
//             // console.log("select color played----");
//             // To Choose Colour
//             if (order[turn] === 1) {
//                 setSelectColor(true);
//             } else {
//                 var color = ["red", "blue", "yellow", "green"];
//                 var num = Math.floor(Math.random() * 4);
//                 current.color = color[num];
//                 current.values = 15;
//                 current.image_file = './cards/Wild.png';

//                 setCurrent(current);
//                 // console.log("bot select")
//                 // console.log(current)
//                 setTurn(nextTurn(turn));
//             }

//             break;

//         //+4 is 14
//         case "14":
//             // console.log("draw 4 played----");
//             var draw4CardPlayer = nextTurn(turn);
//             for (var draw4 = 0; draw4 < 4; draw4++) {
//                 players["player" + order[draw4CardPlayer]].push(mainDeck[draw4]);
//             }
//             setAction(["+ 4", order[draw4CardPlayer]])
//             setTimeout(() => {
//                 setAction([])
//             }, 5000);
//             setMainDeck(mainDeck.slice(4, mainDeck.length));
//             setPlayers(players);
//             // To Choose Colour

//             if (order[turn] === 1) {
//                 setPlayedDraw(true);
//                 setDrawCard(true);
//                 setTimeout(() => {
//                     setPlayedDraw(false);
//                     setSelectColor(true);
//                 }, 1500);
//             } else {
//                 var color4 = ["red", "blue", "yellow", "green"];
//                 var n4um = Math.floor(Math.random() * 4);
//                 current.color = color4[n4um];
//                 current.values = 15;
//                 current.image_file = './cards/Wild_Draw.png';
//                 setCurrent(current);
//                 // console.log("bot select")
//                 // console.log(current)
//                 setPlayedDraw(true);
//                 setTimeout(() => {
//                     setPlayedDraw(false);
//                     setTurn(nextTurn(draw4CardPlayer));
//                 }, 1500);
//             }
//             break;

//         default:
//             // console.log("normal card played----");
//             setTurn(nextTurn(turn));
//             break;
//     }
// };

// const playCard = (state = {}, action) => {
//     // console.log("A card was played by Player " + order[turn]);
//     // console.log("Current card is " + current.color + " " + current.values);
//     // console.log("Card played is " + cardInfo.color + " " + cardInfo.values);
//     let cardInfo = action.payload.cardInfo;
//     let player = action.payload.player;
//     let bot = action.payload.bot;

//     setIfShow(false);
//     setIfDraw(false);
//     // console.log(used)
//     if (used.length === 0) {
//         used.push(current)
//         setUsed(used)
//     }
//     else if (current.id !== used[used.length - 1].id) {
//         used.push(current)
//         setUsed(used)
//     }

//     setCurrent(cardInfo);

//     var player_new = player.filter((item) => item !== cardInfo);
//     let nextPlayer = "player" + order[turn];
//     players[nextPlayer] = player_new;
//     setPlayers(players);

//     // To add 2 cards if player does not press "NUO"
//     // Only for player1 as bot is not dumb
//     if (players.player1.length === 0 && !isUnoButtonPressed) {
//         for (var penalty2 = 0; penalty2 < 2; penalty2++) {
//             players["player1"].push(mainDeck[penalty2]);
//         }
//         alert("You forgot to press NUO. 2 cards are drawn as penalty");
//     }

//     if (order[turn] !== 1 && players["player" + order[turn]].length === 1) {
//         var random = Math.random();
//         if (random < 0.8) {
//             setAction(["NOU Pressed", order[turn]])
//             setTimeout(() => {
//                 setAction([])
//             }, 3000);

//             alert("PlayerBot " + order[turn] + "pressed NOU");
//         } else {
//             for (var botpenalty = 0; botpenalty < 2; botpenalty++) {
//                 players["player" + order[turn]].push(mainDeck[botpenalty]);
//             }
//             setMainDeck(mainDeck.slice(2, mainDeck.length));
//             setPlayers(players);
//             setAction(["NOU not Pressed. +2", order[turn]])
//             setTimeout(() => {
//                 setAction([])
//             }, 3000);
//         }
//     }
//     if (bot) {
//         setTimeout(() => {
//             goThruCards(cardInfo)
//         }, 4000);
//     } else {
//         goThruCards(cardInfo)
//     }
//     // switch ("14") {

//     // console.log("here");
//     return;
// };