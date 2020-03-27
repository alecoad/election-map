// Create new candidate factory function
var newCandidate = function(name, color) {
    // Candidate object and properties
    var candidate = {};
    candidate.name = name;
    candidate.results = null;
    candidate.votes = 0;
    candidate.color = color;

    // Method to tally votes
    candidate.tally = function () {

        this.votes = 0;

        for (var i = 0; i < this.results.length; i++) {
            this.votes += this.results[i];
        }
    }

    return candidate;
};

// Create two candidates
var candidate1 = newCandidate("Donald Trump", [132, 17, 11]);
var candidate2 = newCandidate("Joe Biden", [245, 141, 136]);

// Update results from each state
candidate1.results = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];
candidate2.results = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

candidate1.results[9] = 1;
candidate2.results[9] = 28;

candidate1.results[4] = 17;
candidate2.results[4] = 38;

candidate1.results[43] = 11;
candidate2.results[43] = 27;

// Get results for each state
var setStateResults = function(state) {
    // Find and assign the state's winner
    if (candidate1.results[state] < candidate2.results[state]) {
        theStates[state].winner = candidate2;
    }
    else if (candidate1.results[state] > candidate2.results[state]) {
        theStates[state].winner = candidate1;
    }
    var stateWinner = theStates[state].winner;

    // Set the color based on the winner
    if (stateWinner !== null) {
        theStates[state].rgbColor = stateWinner.color;
    }
    else {
        theStates[state].rgbColor = [11, 32, 57];
    }

    // Populate the state results table
    var stateTable = document.getElementById("stateResults");

    // State name and abbreviation
    var header = stateTable.children[0].children[0];
    var stateName = header.children[0];
    var stateAbbrev = header.children[1];
    stateName.innerText = theStates[state].nameFull;
    stateAbbrev.innerText = theStates[state].nameAbbrev;

    // Fill out first row
    var row1 = stateTable.children[1].children[0];
    var name1 = row1.children[0];
    var results1 = row1.children[1];
    name1.innerText = candidate1.name;
    results1.innerText = candidate1.results[state];

    // Fill out second row
    var row2 = stateTable.children[1].children[1];
    var name2 = row2.children[0];
    var results2 = row2.children[1];
    name2.innerText = candidate2.name;
    results2.innerText = candidate2.results[state];

    // Fill out third row
    var row3 = stateTable.children[1].children[2];
    var stateResult = row3.children[1];
    // Handle a tie
    if (stateWinner !== null) {
        stateResult.innerText = stateWinner.name;
    }
    else {
        stateResult.innerText = "OMG A TIE!";
    }
}

// Tally vote totals (updates votes property)
candidate1.tally();
candidate2.tally();

// Find the winner
var winner = "OMG A TIE!";

if (candidate1.votes != candidate2.votes) {
    if (candidate1.votes < candidate2.votes) {
        winner = candidate2.name;
    }
    else {
        winner = candidate1.name;
    }
}

// Populate top table with final results
var countryTable = document.getElementById("countryResults");
var row = countryTable.children[0].children[0];

row.children[0].innerText = candidate1.name;
row.children[1].innerText = candidate1.votes;
row.children[2].innerText = candidate2.name;
row.children[3].innerText = candidate2.votes;
row.children[5].innerText = winner;
