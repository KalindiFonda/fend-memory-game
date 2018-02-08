// List that holds all cards and list of pairs
var cards = ['cube', 'leaf', 'paper-plane-o', 'diamond', 'bolt', 'bicycle', 'anchor', 'bomb']
var cardPairs =  (cards + "," + cards).split(",")

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
  var randomPairArray = shuffle(array)
  return randomPairArray
}

// creating card HTML
function createCardHTML(cardList) {
  // console.log("running createCardHTML")
  console.log(cardList.length)
  console.log(cardList)
  var cardsHtml = ""
  for (card in cardList) {
    var cardHtml =`
    <li class="` + cardList[card] + ` card" onclick="cardClicked('` + card + `')">
         <i class="fa fa-` + cardList[card] + `"></i>
      </li>`
    cardsHtml += cardHtml
  }
  return cardsHtml
}

// Creating and adding card HTML to page
function addCardHTML(cardList) {
  var shuffledDeckHTML = createCardHTML(cardList)
  deck.innerHTML = shuffledDeckHTML;
}

// calling functions to create random pairs and adding randomised cards HTML into HTML
var randomPairs = makeRandomPairs(cardPairs)
addCardHTML(randomPairs)

// getting all cards
var HTMLcards = document.getElementsByClassName("card");

// shows image on Click
var showImgOnClick = function(cardNum) {
  HTMLcards[cardNum].classList.add("open", "show");
  HTMLcards[cardNum].removeAttribute("onclick");
  console.log("running showImgOnClic", HTMLcards[cardNum])
};

var openCards = []
var currentMoves = 0
var donePairs = 0

// add card to list of open cards
var addToOpenCards = function(cardNum) {
  var card = HTMLcards[cardNum].classList[0]
  openCards.push([cardNum, card])
  // console.log("running addToOpenCards, ", "cardNum: ",cardNum, " card: ", card, "openCards: ", openCards)
}

// check if the cards in a pair match
var checkPair = function(cardPair) {
  return cardPair[0][1] == cardPair[1][1]
}

//  keep the cards open because they are a match
var keepOpen = function(cardPair) {
  HTMLcards[cardPair[0][0]].classList.add("match");
  HTMLcards[cardPair[1][0]].classList.add("match");
}

// close cards because they don't match, and remove them from open cards
var closeCards = function(cardPair) {
  if (openCards.length > 1) {
  HTMLcards[cardPair[0][0]].classList.remove("open","show");
  }
  if (openCards.length > 1) {
    HTMLcards[cardPair[1][0]].classList.remove("open","show");
  }
  openCards.splice(0, 2)
}

// give back click to unmatched pair
var giveBackClick = function(cardPair) {
  console.log("running give back click")
  HTMLcards[cardPair[0][0]].setAttribute("onclick", "cardClicked('" + cardPair[0][0] + "')");
  HTMLcards[cardPair[1][0]].setAttribute("onclick", "cardClicked('" + cardPair[1][0] + "')");
}


// actions taken after card is Clicked
var cardClicked = function(cardNum) {
  addToOpenCards(cardNum)
  showImgOnClick(cardNum)
  if (openCards.length == 3) {
    closeCards(openCards)
    showImgOnClick(cardNum)
  } else if (openCards.length == 2) {
    currentMoves += 1
    moves.innerHTML = currentMoves;
    // cool if it is ID one doesn't need to look for it with document.getElementsByClassName("moves");
    getStars()
    if (checkPair(openCards)) {
      keepOpen(openCards)
      donePairs += 1
      checkVictory()
    } else {
      giveBackClick(openCards)
    }
  }
  // console.log(openCards, "open card end of clicked, moves: ", currentMoves)
}

// code to check if the game is victory
var checkVictory = function() {
  if (donePairs == 16) {
    checkRecord()
    if (window.confirm("You won! You finished the game in " + timeCounter + " seconds, " + currentMoves +" moves and earned " + starsCount + " star/s! Do you want to play another game?")) {
      restart();
    } else {
      clearInterval(gameTimer)
    }
  }
}

// timer code
function incrementSeconds() {
  timeCounter += 1;
  timer.innerText = timeCounter;
}

var timeCounter = 0
var gameTimer = setInterval(incrementSeconds, 1000)

// star related code
var starsCount = 3
var starsHTML = `
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>
                <li><i class="fa fa-star"></i></li>`

// code to remove stars
var getStars = function() {
  var movesList = [2,4,6]
  if (movesList.includes(currentMoves)) {
    starsCount -= 1
    stars.children[starsCount].classList.add("inactive")
  }
}


// function to restart game.
var restart = function () {
  console.log("running restart")
  closeCards(openCards)
  timeCounter = 0
  currentMoves = 0
  donePairs = 0
  starsCount = 3
  stars.innerHTML = starsHTML
  moves.innerHTML = currentMoves
  randomPairs = makeRandomPairs(cardPairs)
  addCardHTML(randomPairs)
}


var localTime = localStorage.getItem('timeNeededRecord')
var localMoves = localStorage.getItem('movesNeededRecord')

// check if there is any record stored in storage
var checkLocalRecord = function() {
  if (localTime) {
    recordtime.innerText = "Time record: " + localTime + " seconds!!"
    recordmoves.innerText = "Moves record: " + localMoves + " moves!!"
  } else {
    // set random numbers so that I can compare to current moves
      localTime = 1000
      localMoves = 1000
  }
}

checkLocalRecord()

// check if new time and moves make for a record and if yes put into local storage
var checkRecord = function() {

  if (localTime > timeCounter) {
      localStorage.setItem('timeNeededRecord', timeCounter);
      recordtime.innerText = "Time record: " + timeCounter + " seconds!!"
  }
    if (localMoves > currentMoves) {
      localStorage.setItem('movesNeededRecord', currentMoves);
      recordmoves.innerText = "Moves record: " + currentMoves + " moves!!"
    }
}




