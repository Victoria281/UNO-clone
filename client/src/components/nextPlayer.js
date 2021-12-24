// @ts-nocheck
export const nextTurn = (turn) => {
  var nextPlyer = turn + 1;
  if (nextPlyer === 4) {
    nextPlyer = 0;
  }
  return nextPlyer;
};
export const previousTurn = (turn) => {
  var previousPlyer = turn - 1;
  if (previousPlyer === -1) {
    previousPlyer = 3;
  }
  return previousPlyer;
};

  