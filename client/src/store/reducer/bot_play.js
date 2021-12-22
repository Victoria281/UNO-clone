// import { BpActions } from "../interfaces";
// import { CurrentCard } from "../interfaces";

// const /** @type CurrentCard */ initialCurrentState = {
//     id: 0,
//     values: 0,
//     color: "",
//     image_files: ""
// }

// export const BotPlayReducer = (state = initialCurrentState, /** @type BpActions */ bpActions) => {
//     if (bpActions.type === "bot_play") {
//         let { normal_playable, wild_playable, r, cardplayed } = bpActions.payload;

//         if (wild_playable.length !== 0 && normal_playable.length !== 0) {
//             if (r < 0.75) {
//               cardplayed =
//                 wild_playable[Math.floor(Math.random() * wild_playable.length)];
//             } else {
//               cardplayed =
//                 normal_playable[Math.floor(Math.random() * normal_playable.length)];
//             }
//             // console.log(cardplayed);
      
//             playCard(cardplayed, arr, true);
//           } else if (wild_playable.length !== 0) {
//             cardplayed =
//               wild_playable[Math.floor(Math.random() * wild_playable.length)];
//             // console.log(cardplayed);
//             playCard(cardplayed, arr, true);
//           }
//     }
// };