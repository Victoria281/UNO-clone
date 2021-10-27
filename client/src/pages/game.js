const playCard = (cardInfo, player) => {
    console.log("played card");
    console.log(cardInfo);
    console.log(player);

    used.push(current);
    setUsed(used);
    setCurrent(cardInfo);
    var player_new = player.filter((item) => item !== cardInfo);
    players["player" + (turn + 1)] = player_new;
    // console.log(player_new);
    // console.log(players["player" + turn]);
    setPlayers(players);
    play["player" + (turn + 1)] = cardInfo;
    setPlay(play);

    console.log("current player " + (turn + 1));
    var expectedPlayerInd = order.indexOf(turn);
    expectedPlayerInd += 1;
    if (expectedPlayerInd === 4) {
      expectedPlayerInd = 0;
    } else if (expectedPlayerInd > 4) {
      expectedPlayerInd = Math.trunc(expectedPlayerInd / 4);
    }
    console.log("next player " + (order[expectedPlayerInd] + 1));

    switch (cardInfo.values) {
      //skip is 10
      case "10":
        console.log("skip called");
        // console.log(turn);
        // console.log(order.indexOf(turn));
        var currentplayerIndex = order.indexOf(turn);
        currentplayerIndex += 2;
        if (currentplayerIndex === 4) {
          currentplayerIndex = 0;
        } else if (currentplayerIndex > 4) {
          currentplayerIndex = Math.trunc(currentplayerIndex / 4);
        }

        play["player" + (order[currentplayerIndex] - 2)] = {
          id: 0,
          values: 0,
          color: 0,
          image_file: ""
        };
        setPlay(play);
        setTurn(order[currentplayerIndex]);
        // console.log(turn);
        console.log("skip ended");
        break;

      //reverse is 11
      case "11":
        console.log("reverse called");
        var newOrder = [order[3], order[2], order[1], order[0]];
        var reverseplayerIndex = newOrder.indexOf(turn);
        reverseplayerIndex += 1;
        if (reverseplayerIndex === 4) {
          reverseplayerIndex = 0;
        } else if (reverseplayerIndex > 4) {
          reverseplayerIndex = Math.trunc(reverseplayerIndex / 4);
        }

        console.log(
          "reverse next player " + (newOrder[reverseplayerIndex] + 1)
        );
        setOrder(newOrder);
        setTurn(newOrder[reverseplayerIndex]);
        console.log("reverse ended");

        break;

      //+2 draw is 12
      case "12":
        console.log("draw 2 called");
        for (var draw2 = 0; draw2 < 2; draw2++) {
          players["player" + (order[expectedPlayerInd] + 1)].push(
            mainDeck[draw2]
          );
        }
        setMainDeck(mainDeck.slice(2, mainDeck.length));
        setPlayers(players);
        console.log("draw 2 ended");
        setTurn(order[expectedPlayerInd]);
        break;

      //wild is 13
      case "13":
        console.log("wild called");
        // console.log(selectColor);
        // setSelectColor(true);
        // console.log(selectColor);
        console.log("wild ended");
        setTurn(order[expectedPlayerInd]);
        break;

      //+4 is 14
      case "14":
        console.log("draw 4 called");
        for (var draw4 = 0; draw4 < 4; draw4++) {
          players["player" + (order[expectedPlayerInd] + 1)].push(
            mainDeck[draw4]
          );
        }
        setMainDeck(mainDeck.slice(4, mainDeck.length));
        setPlayers(players);
        console.log("draw 4 ended");
        setTurn(order[expectedPlayerInd]);
        break;

      default:
        console.log("default called");
        // console.log(turn);
        // console.log(expectedPlayerInd);
        setTurn(order[expectedPlayerInd]);
        // console.log(turn);
        console.log("default ended");
        break;
    }

    return player;
  };