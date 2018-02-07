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
		<li class="card">
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
}

// calling functions
var randomPairs = makeRandomPairs(cards)
addCardHTML(randomPairs)


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
