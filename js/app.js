// List that holds all cards and list of pairs
var cards = ["cube", "leaf", "paper-plane-o", "diamond", "bolt", "bicycle", "anchor", "bomb"];
var cardPairs =  (cards + "," + cards).split(",");

// Shuffle function from http://stackoverflow.com/a/2450976 given by code template
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Creating random pairs from array
function makeRandomPairs(array) {
  var randomPairArray = shuffle(array);
  return randomPairArray;
}

// creating card HTML
function createCardHTML(cardList) {
  var cardsHtml = "";
  for (var currentCard = 0; currentCard<cardList.length; currentCard++) {
    var cardHtml =`
    <li class="` + cardList[currentCard] + ` card" onclick="cardClicked('` + currentCard + `')">
         <i class="fa fa-` + cardList[currentCard] + `"></i>
      </li>`;
    cardsHtml += cardHtml;
  }
  return cardsHtml;
}

// Creating and adding card HTML to page
function addCardHTML(cardList) {
  var shuffledDeckHTML = createCardHTML(cardList);
  deck.innerHTML = shuffledDeckHTML;
}

// calling functions to create random pairs and adding randomised cards HTML into HTML
var randomPairs = makeRandomPairs(cardPairs);
addCardHTML(randomPairs);

// getting all cards
var HTMLcards = document.getElementsByClassName("card");

// shows image on Click
var showImgOnClick = function(cardNum) {
  HTMLcards[cardNum].classList.add("open", "show");
};

var openCards = [];
var currentMoves = 0;
var donePairs = 0;

// add card to list of open cards
var addToOpenCards = function(cardNum) {
  var card = HTMLcards[cardNum].classList[0];
  openCards.push([cardNum, card]);
};

// check if the cards in a pair match
var checkPair = function(cardPair) {
  return cardPair[0][1] == cardPair[1][1];
};

//  keep the cards open because they are a match
var keepOpen = function(cardPair) {
  HTMLcards[cardPair[0][0]].classList.add("match");
  HTMLcards[cardPair[1][0]].classList.add("match");
};

// close cards because they don't match, and remove them from open cards
var closeCards = function(cardPair) {
  if (openCards.length > 1) {
    HTMLcards[cardPair[0][0]].classList.remove("open","show");
    HTMLcards[cardPair[1][0]].classList.remove("open","show");
  }
  openCards.splice(0, 2);
};
//includes("match")

var gameON = false;
// actions taken after card is Clicked
var cardClicked = function(cardNum) {
  gameON = true;
  if (HTMLcards[cardNum].classList[4] == "match") {
    return;
  } else {
    if (openCards.length == 1) {
      if (HTMLcards[cardNum].classList[2] == "open") {
        return;
      }
    }
    addToOpenCards(cardNum);
    showImgOnClick(cardNum);
    if (openCards.length == 3) {
      closeCards(openCards);
      showImgOnClick(cardNum);
    } else if (openCards.length == 2) {
      currentMoves += 1;
      moves.innerHTML = currentMoves;
      // cool if it is ID one doesn't need to look for it with document.getElementsByClassName("moves");
      getStars();
      if (checkPair(openCards)) {
        keepOpen(openCards);
        donePairs += 1;
        checkVictory();
      }
    }
  }
};

// code to check if the game is victory
var checkVictory = function() {
  if (donePairs == 8) {
    addCurrentGame();
    updateLeaderborad();
    setTimeout(function () {
      if (window.confirm("You won! You finished the game in " + timeCounter + " seconds, " + currentMoves +" moves and earned " + starsCount + " star/s! Do you want to play another game?")
      ) {
        restart();
      } else {
      clearInterval(gameTimer);
    }}, 300);
  }
};

// timer code
function incrementSeconds() {
  if (gameON) {
    timeCounter += 1;
    timer.innerText = timeCounter;
  }
}

var timeCounter = 0;
var gameTimer = setInterval(incrementSeconds, 1000);

// star related code
var starsCount = 3;
var starsHTML = `
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`;

// code to remove stars
var getStars = function() {
  var movesRemoveStarList = [12,16];
  // [12,16, 20]; I'd prefer having 0 stars too
  if (movesRemoveStarList.includes(currentMoves)) {
    starsCount -= 1;
    stars.children[starsCount].classList.add("inactive");
  }
};


// function to restart game.
var restart = function () {
  closeCards(openCards);
  timeCounter = 0;
  gameON = false;
  currentMoves = 0;
  donePairs = 0;
  starsCount = 3;
  stars.innerHTML = starsHTML;
  moves.innerHTML = currentMoves;
  timer.innerText = timeCounter;
  randomPairs = makeRandomPairs(cardPairs);
  addCardHTML(randomPairs);
};

var userName = "user";
// get user name for record as well as hello
var getName = function() {
  userName = prompt("Welcome to this game! Please enter your name! It'll be used for the local leaderboard.", userName);
    if (userName !== null && userName !== "user") {
        hello.innerHTML = "Hello " + userName + "! How are you today?";
    }
};
getName();


// code to allow gmeplay with keyboard
var keyMap = {
  49: 0, 50: 1, 51: 2, 52: 3, // first line of keys
  81: 4, 87: 5, 69: 6, 82: 7, // second line of keys
  65: 8, 83: 9, 68: 10, 70: 11, // third line of keys
  192: 12, 90: 13, 88: 14, 67: 15 // fourth line of keys
};

// map key to card, and run the click function
var mapKey = function(event) {
  if (event.keyCode in keyMap) {
      cardClicked(keyMap[event.keyCode]);
    }
};

// create event listener for keyboard shortcut to play with keys and to restart game

var  keyCommands = function() {
  window.addEventListener('keydown', function(event) {
    if ( event.keyCode == 75 ) {
      if ( check.checked === true ) {
        check.checked = false;
      } else {
        check.checked = true;
      }
      checkCheck();
    }
    if ( event.keyCode == 78 && event.shiftKey ) {
      restart();
    }
  }, false);
};

keyCommands();

// create event listener if user chooses to play with keyboard
var checkCheck = function() {
  if (check.checked === true ) {
    window.addEventListener("keydown", mapKey, true);
  } else {
    window.removeEventListener("keydown", mapKey, true);
  }
};

// leaderboards
var gamesList = JSON.parse(localStorage.getItem('gamesList'));

// add  current game to local Storage
var addCurrentGame = function() {
  gamesList = JSON.parse(localStorage.getItem('gamesList'));
  var currentGame = {
    time: timeCounter,
    moves: currentMoves,
    name: userName
  };
  if (gamesList !== null) {
    gamesList.push(currentGame);
  } else {
    gamesList = [currentGame];
  }
  localStorage.setItem('gamesList', JSON.stringify(gamesList));
  updateLeaderborad();
};


// update Leaderboard
var updateLeaderborad = function() {
  gamesList = JSON.parse(localStorage.getItem('gamesList'));
  if (gamesList !== null) {
    var gamesBestTimes = gamesList.slice();
    getBestTimes(gamesBestTimes);
    var gamesBestMoves = gamesList.slice();
    getBestMoves(gamesBestMoves);
    var leaderboardsHTML = `<table>
        <caption>Best times</caption>
        ` + makeLeaderboardHTML(gamesBestTimes) + `
        </table>
        <table>
        <caption>Best moves</caption>
        ` + makeLeaderboardHTML(gamesBestMoves) + `
        </table>`;
    leaderboards.innerHTML = leaderboardsHTML;
  }
};

// make HTML for leaderbords out of locally stored game data
var makeLeaderboardHTML  = function(gamesListSorted) {
  var leaderboardHTML = `
        <tr>
          <th>Name</th>
          <th>Time</th>
          <th>Moves</th>
        </tr>`;
  for (var game = 0; game < gamesListSorted.length; game++) {
    if (game == 5) {
      break;
    } else {
      var gameHTML = `
        <tr>
          <td>` + gamesListSorted[game].name + `</td>
          <td>` + gamesListSorted[game].time + `</td>
          <td>` + gamesListSorted[game].moves + `</td>
        </tr>`;
      leaderboardHTML += gameHTML;
    }

  }
  return leaderboardHTML;
};

// sort function for best times
// code taken from here https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
var getBestTimes = function(games) {
  games.sort(function(a, b) {
    return parseInt(a.time) - parseInt(b.time);
  });
};

var getBestMoves = function(games) {
  games.sort(function(a, b) {
    return parseInt(a.moves) - parseInt(b.moves);
  });
};

updateLeaderborad();