// Created by Luna

var i = 0;
var cardRank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Creating player objects
var north = { 
    position: "n",
    hand: []
};

var south = {
    position: "s",
    hand: []
};

var east = { 
    position: "e",
    hand: []
};

var west = { 
    position: "w",
    hand: []
};

// Determines which suit the card belongs to: 
// (C)lovers | (D)iamonds | (H)earts | (S)pades
function suit(cardId) {

    var fl = Math.floor(cardId / 13);
    
    if (fl == 0) {
        return 'C';
    } 
    else if (fl == 1) {
        return 'D';
    }
    else if (fl == 2) {
        return 'H';
    }
    else {
        return 'S';
    }

    return false;
}

// Returns the rank of the card
function rank(cardId) {

    var mod = cardId % 13;

    return cardRank[mod];
}

// Takes in an array and swaps items in two random indicies of the array
function swap(arr) {

    var ind1 = 0;
    var ind2 = 0;
    var temp = 0;
    var leng = arr.length;

    ind1 = Math.floor(Math.random() * leng);
    ind2 = Math.floor(Math.random() * leng);
                    
    temp = arr[ind1];
    arr[ind1] = arr[ind2];
    arr[ind2] = temp;
}

function dealHands() {

    var j = 0;
    var deal = new Array();

    for (i = 0; i <= 51; i++) {

        deal[i] = i;
    }

    // Shuffles the card 1000 times
    while (i < 1000) {

        swap(deal);
        i++;
    }
    
    // Deals 13 cards per player
    for (i = 0; i < 13; i++) {

        north.hand[i] = deal[i];
    }

    for (i = 13; i < 26; i++) {
    
        south.hand[j] = deal[i];
        j++;
    }

    j = 0;

    for (i = 26; i < 39; i++) {
        
        east.hand[j] = deal[i];
        j++
    }

    j = 0;

    for (i = 39; i < 52; i++) {

        west.hand[j] = deal[i];
        j++
    }

}

// Groups players' hands by suits for display purpose
function suitPlacement(player) {

    player.spades = new Array();
    player.diamonds = new Array();
    player.clovers = new Array();
    player.hearts = new Array();

    for (i = 0; i < 13; i++) {
        
        if (suit(player.hand[i]) === 'S') {
            player.spades.push(rank(player.hand[i]));
        }
        else if (suit(player.hand[i]) === 'D') {
            player.diamonds.push(rank(player.hand[i]));
        }
        else if (suit(player.hand[i]) === 'C') {
            player.clovers.push(rank(player.hand[i]));
        }
        else {
            player.hearts.push(rank(player.hand[i]));
        }

    }

}

function testDeal() {
    
    dealHands();
 
    suitPlacement(north);
    suitPlacement(south);
    suitPlacement(east);
    suitPlacement(west);

    displayHand(north);
    displayHand(south);
    displayHand(east);
    displayHand(west);
}

// Displays each player's hand
function displayHand(player) {

    fillRow(player.spades, player.position + "spades");
    fillRow(player.diamonds, player.position + "diamonds");
    fillRow(player.clovers, player.position + "clovers");
    fillRow(player.hearts, player.position + "hearts");
}

// Fills out each row (suit)
function fillRow(rowSuit, destin) {

    for (i = 0; i < rowSuit.length; i++) {

        // If the row is empty (suit), then put an empty space in the row
        if (rowSuit.length === 0) {
            document.getElementById(destin).innerHTML += "<br />";
        }
        else {
            var node = document.createElement("span"); // Each card is a span element
            var txtNode = document.createTextNode(rowSuit[i] + " "); // Display
            
            // Appends the current node as a child of the destination
            document.getElementById(destin).appendChild(node);

            node.appendChild(txtNode); // Appending txtNode as a child of node
            node.addEventListener("click", del(node)); // Sets up the delete event for the node
        }

    }

}

function redeal() {

    document.location.reload(true);
}

// Contructs a function that removes the given node to del function
function del(target) {
    
    return function() { target.parentNode.removeChild(target); }
}
