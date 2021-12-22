// @ts-nocheck
const shuffleCards = (cardarray) => {
    for (var i = cardarray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = cardarray[i];
      cardarray[i] = cardarray[j];
      cardarray[j] = temp;
    }
    return cardarray;
  };
  
  export default shuffleCards;
  