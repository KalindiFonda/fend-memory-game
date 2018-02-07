// List that holds all cards
var cards = ['cube', 'leaf', 'paper-plane-o', 'diamond', 'bolt', 'bicycle', 'anchor', 'bomb']

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
	var pairList = (array + "," + array).split(",")
	var randomPairArray = shuffle(pairList)
	return randomPairArray
}

// creating card HTML
function createCardHtml(cardList) {
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

// Adding card HTML to page
function addCardHTML(cardList) {
	var shuffledDeckHTML = createCardHtml(cardList)
	deck.innerHTML = shuffledDeckHTML;
	return shuffledDeckHTML
}

// calling functions to create random pairs and adding randomised cards HTML into HTML
var randomPairs = makeRandomPairs(cards)
var shuffledDeck = addCardHTML(randomPairs)




// https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class

var HTMLcards = document.getElementsByClassName("card");
var deckHTML = document.getElementsByClassName("deck");




var showImgOnClick = function(cardNum) {
	HTMLcards[cardNum].classList.add("open");
	HTMLcards[cardNum].classList.add("show");
	HTMLcards[cardNum].removeAttribute("onclick");
};

var openCards = []
var currentMoves = 0
var donePairs = 0

var addToOpenCards = function(cardNum) {
	var card = HTMLcards[cardNum].classList[0]
	console.log(cardNum)
	console.log(card)

	openCards.push([cardNum, card])
	console.log(1, openCards)
}

var checkPair = function(cardPair) {
	return cardPair[0][1] == cardPair[1][1]
}

var keepOpen = function(cardPair) {
	HTMLcards[cardPair[0][0]].classList.add("match");
	HTMLcards[cardPair[1][0]].classList.add("match");
}

var closeCards = function(cardPair) {
	currentMoves += 1
	moves.innerHTML = currentMoves;
	// cool if it is ID one doesn't need to look for it with document.getElementsByClassName("moves");
	HTMLcards[cardPair[0][0]].classList.remove("open","show");
	HTMLcards[cardPair[1][0]].classList.remove("open","show");
	openCards.splice(0, 2)
}

var giveBackClick = function(cardPair) {
	HTMLcards[cardPair[0][0]].setAttribute("onclick", "cardClicked('" + cardPair[0][0] + "')");
	HTMLcards[cardPair[1][0]].setAttribute("onclick", "cardClicked('" + cardPair[1][0] + "')" );
}

var cardClicked = function(cardNum) {
	addToOpenCards(cardNum)
	showImgOnClick(cardNum)
	console.log(openCards.length, "length")
	if (openCards.length == 3) {
		closeCards(openCards)
	}
	else if (openCards.length == 2) {
		if (checkPair(openCards)) {
			keepOpen(openCards)
			donePairs += 1
			if (donePairs == 2) {
				setTimeout(function(){ alert(
					"Congrats! You won in " + currentMoves + " moves."
					); }, 1000);
			}
		} else {
			giveBackClick(openCards)
		}
	}
	console.log(openCards, "open card end of clicked, moves: ", currentMoves)
}




