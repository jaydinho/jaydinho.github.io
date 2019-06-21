
//Card variables
let suits = [
    "Hearts", "Diamonds", "Clubs", "Spades"
];

let values = [
    "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"
];

//Variables used to calculate generic scores
let nonAceScore;
let aceScore;

//Player variables
let playerCards;
let playerCardString = '';
let aceScorePlayer;
let nonAceScorePlayer;
let playerScore;

//dealer variables
let dealerCards;
let dealerCardString = '';
let aceScoreDealer;
let nonAceScoreDealer;
let dealerScore;

//Stay status
let stay = false;

//HTML elements
let topSection = document.getElementById("top-section");
let versus = document.getElementById("vs");
let startButton = document.getElementById("start-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

//Player HTML elements
let playerContainer = document.getElementById("player-container");
let playerCardsContainer = document.getElementById("player-cards");
let playerScoreContainer = document.getElementById("player-score");

//Dealer HTML elements
let dealerContainer = document.getElementById("dealer-container");
let dealerCardOneContainer = document.getElementById("dealer-card-one");
let dealerCardTwoContainer = document.getElementById("dealer-card-two");
let dealerScoreContainer = document.getElementById("dealer-score");

//Hidden elements on page load
playerContainer.style.display = "none";
versus.style.display = "none";
dealerContainer.style.display = "none";
hitButton.style.display = "none";
stayButton.style.display = "none";

//Creates the deck
function createDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            let card = {
                value: values[j],
                suit: suits[i] 
            };
            deck.push(card);
        }
    }
    return deck;
}

//Shuffles the deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let swap = Math.trunc(Math.random() * deck.length);
        let temp = deck[swap];
        deck[swap] = deck[i];
        deck[i] = temp;
    }
    return deck;
}

//Deck creation and shuffle on page load
let deck = createDeck();
let shuffledDeck = shuffleDeck();

//Takes first card from the deck
function getNextCard() {
    return shuffledDeck.shift();
}

//Changes card objects into strings
function getCardString(card) {
    return card.value + ' of ' + card.suit;
} 

//Displays all players cards as a string
function playerCardDisplay() {
    playerCardString = '';
    for (i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }
    return playerCardString;
}

//Displays all dealer cards as a string
function dealerCardDisplay() {
    dealerCardString = '';
    for (i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    return dealerCardString;
}

//New game button click
startButton.addEventListener("click", function() {
    stay = false;
    deck = createDeck();
    shuffledDeck = shuffleDeck();
    playerCards = [getNextCard(), getNextCard()];
    nonAceScorePlayer = getScore(playerCards);
    aceScorePlayer = getAceScore(playerCards);
    playerScoreDisplay();
    dealerCards = [getNextCard(), getNextCard()];
    nonAceScoreDealer = getScore(dealerCards);
    aceScoreDealer = getAceScore(dealerCards);
    dealerScoreDisplay();
    newGamePageDisplay();
    updateCardsAndScores();
});

//Changes display on game start
function newGamePageDisplay() {
    startButton.style.display = "none";
    topSection.style.display = "none";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    playerContainer.style.display = "block";
    versus.style.display = "block";
    dealerContainer.style.display = "block";
}

//Updates cards and scores
function updateCardsAndScores() {
    playerCardsContainer.innerText = playerCardDisplay();
    playerScoreContainer.innerText = 'Player Score: ' + playerScore;
    dealerCardOneContainer.innerText = getCardString(dealerCards[0]);
    dealerCardTwoContainer.innerText = '???'
    dealerScoreContainer.innerText = 'Dealer Score: ???';
}

//Calculates player score
function playerScoreDisplay() {
        if (nonAceScorePlayer + aceScorePlayer == 21) {
            playerScore = 21;
        }
            else if (aceScorePlayer == 10 && (nonAceScorePlayer + aceScorePlayer <= 21) && stay == false) {
                playerScore = nonAceScorePlayer + ' / ' + (nonAceScorePlayer + aceScorePlayer);
            }
            else if (aceScorePlayer == 20 && (nonAceScorePlayer + (aceScorePlayer / 2) <= 21) && stay == false) {
                playerScore = nonAceScorePlayer + ' / ' + (nonAceScorePlayer + (aceScorePlayer / 2));
            }
            else if (aceScorePlayer == 30 && (nonAceScorePlayer + (aceScorePlayer / 3) <= 21) && stay == false) {
                playerScore = nonAceScorePlayer + ' / ' + (nonAceScorePlayer + (aceScorePlayer / 3));
            }
            else if (aceScorePlayer == 40 && (nonAceScorePlayer + (aceScorePlayer / 4) <= 21) && stay == false) {
                playerScore = nonAceScorePlayer + ' / ' + (nonAceScorePlayer + (aceScorePlayer / 4));
            }
            else if ((nonAceScorePlayer + aceScorePlayer) > nonAceScorePlayer && (aceScorePlayer + nonAceScorePlayer) < 21 && stay == true) {
                playerScore = nonAceScorePlayer + aceScorePlayer;
            }
            else {
                playerScore = nonAceScorePlayer;
            }
}

//Calculates dealer score
function dealerScoreDisplay() {
    if (nonAceScoreDealer + aceScoreDealer == 21) {
        dealerScore = 21;
    }
        else if (nonAceScoreDealer + aceScoreDealer < 21) {
            dealerScore = nonAceScoreDealer + aceScoreDealer;
        }
        else {
            dealerScore = nonAceScoreDealer;
        }
}

//Calculates a score
 function getScore(cards) {
    nonAceScore = 0;
            for (i = 0; i < cards.length; i++) {
                if (cards[i].value == "Ace") {
                    nonAceScore += 1;
                }
                    else if (cards[i].value == "Two") {
                        nonAceScore += 2;
                    }   
                    else if (cards[i].value == "Three") {
                        nonAceScore += 3;
                    }
                    else if (cards[i].value == "Four") {
                        nonAceScore += 4;
                    }
                    else if (cards[i].value == "Five") {
                        nonAceScore += 5;
                    }
                    else if (cards[i].value == "Six") {
                        nonAceScore += 6;
                    }
                    else if (cards[i].value == "Seven") {
                        nonAceScore += 7;
                    }
                    else if (cards[i].value == "Eight") {
                        nonAceScore += 8;
                    }
                    else if (cards[i].value == "Nine") {
                        nonAceScore += 9;
                    }
                    else {
                        nonAceScore += 10;
                    } 
            }
            return nonAceScore;
}

//Calculates an ace score
function getAceScore(cards) {
    aceScore = 0;
            for (i = 0; i < cards.length; i++) {
                if (cards[i].value == "Ace") {
                    aceScore += 10;
                }
            }
            return aceScore;
}

//Hit button
hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());
    nonAceScorePlayer = getScore(playerCards);
    aceScorePlayer = getAceScore(playerCards);
    playerScoreDisplay();
    updateCardsAndScores();
    gameOver();
});

//Stay button
stayButton.addEventListener("click", function() {
        stay = true;
        nonAceScorePlayer = getScore(playerCards);
        aceScorePlayer = getAceScore(playerCards);
        playerScoreDisplay();
        addDealerCard();
        dealerScoreDisplay();    
        updateCardsAndScores();
        dealerScoreContainer.innerText = 'Dealer Score: ' + dealerScore;
        dealerCardOneContainer.innerText = dealerCardDisplay();
        dealerCardTwoContainer.style.display = "none";
        gameWinner();
});

//Checks if dealer needs another card
function addDealerCard() {
    while (dealerScore < 17) {
        dealerCards.push(getNextCard());
        nonAceScoreDealer = getScore(dealerCards);
        aceScoreDealer = getAceScore(dealerCards);
        dealerScoreDisplay();
    }
}

//Game over
function gameOver() {
    if (playerScore > 21) {
        endGamePageDisplay();
        topSection.innerText = "Bust - Game Over";
    }
}

//Game winner evaluation
function gameWinner() {
    if (dealerScore > 21) {
        topSection.innerText = "Dealer bust - You win!";
        endGamePageDisplay();
    }
        else if (dealerScore > playerScore) {
            topSection.innerText = "Dealer wins";
            endGamePageDisplay();
        }

        else if (playerScore > dealerScore) {
            topSection.innerText = "You win!";
            endGamePageDisplay();
        }
        else {
            topSection.innerText = "Push";
            endGamePageDisplay(); 
        }
}

//Resets display on game over
function endGamePageDisplay() {
    startButton.style.display = "inline";
    topSection.style.display = "block";
    hitButton.style.display = "none";
    stayButton.style.display = "none";
}