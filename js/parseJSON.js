"use strict";

// Initialize obj variable (to be used as a javascript object when converting JSON data into a javascript object)
var obj = {};

// Use XMLHttpRequest to read file data from input.json
var req = new XMLHttpRequest();
req.open('GET', './json/input.json', false);
req.send(null);
if(req.status == 200){ // 200 OK HTTP status
    try {
        obj = JSON.parse(req.responseText);
    }
    catch(e){
        alert(e);
    }
}

// Display input JSON string under HTML element that has the id of "input"
document.getElementById("input").innerHTML += JSON.stringify(obj);

// Loop through team to put each individual team member's details into the table HTML element that has the id of "team-table-body"
Object.keys(obj.team).forEach(function (key){
    document.getElementById("team-table-body").innerHTML += '<tr><td>' + obj.team[key].name +
        '</td><td>' + obj.team[key].attributes.intelligence + '</td>' +
        '</td><td>' + obj.team[key].attributes.strength + '</td>' +
        '</td><td>' + obj.team[key].attributes.endurance + '</td>' +
        '</td><td>' + obj.team[key].attributes.spicyFoodTolerance + '</td></tr>';
});

// Loop through applicants to put each individual applicant's details into the table HTML element that has the id of "applicants"
Object.keys(obj.applicants).forEach(function (key){
    document.getElementById("applicants-table-body").innerHTML += '<tr><td>' + obj.applicants[key].name +
        '</td><td>' + obj.applicants[key].attributes.intelligence + '</td>' +
        '</td><td>' + obj.applicants[key].attributes.strength + '</td>' +
        '</td><td>' + obj.applicants[key].attributes.endurance + '</td>' +
        '</td><td>' + obj.applicants[key].attributes.spicyFoodTolerance + '</td></tr>';
});

// Initialize team stats
var currentTeamIntelligence = 0;
var currentTeamStrength = 0;
var currentTeamEndurance = 0;
var currentTeamSpicyFoodTolerance = 0;

// Sum up current team's stats (intelligence, strength, endurance, and spicy food tolerance respectively)
Object.keys(obj.team).forEach(function (key){
    currentTeamIntelligence += obj.team[key].attributes.intelligence;
});
Object.keys(obj.team).forEach(function (key){
    currentTeamStrength += obj.team[key].attributes.strength;
});
Object.keys(obj.team).forEach(function (key){
    currentTeamEndurance += obj.team[key].attributes.endurance;
});
Object.keys(obj.team).forEach(function (key){
    currentTeamSpicyFoodTolerance += obj.team[key].attributes.spicyFoodTolerance;
});

// Weighing Factors (for compatibility calculation purpose, each factor has different weighing / importance to the team)
const W_Intelligence = 0.4 / 40;
const W_Strength = 0.2 / 40;
const W_Endurance = 0.3 / 40;
const W_SpicyFoodTolerance = 0.1 / 40;

// Overall team Adjustment Factors as a result of applicant joining (synergy, etc. more than 1 means a boost in overall team stats, 0 means team not functioning at all)
const TeamAdjustmentMultiplier_If_First_Joined = 0.8;
const TeamAdjustmentMultiplier_If_Second_Joined = 1.1; // (must remember that compatibility score ranges from 0 to 1)
const TeamAdjustmentMultiplier_If_Third_Joined = 1.2; // (must remember that compatibility score ranges from 0 to 1)

var scoreForFirstApplicant = 0;
var scoreForSecondApplicant = 0;
var scoreForThirdApplicant = 0;

// Behavior-Performance Model Calculation
scoreForFirstApplicant =    ((obj.applicants[0].attributes.intelligence +
    currentTeamIntelligence) * W_Intelligence +

    (obj.applicants[0].attributes.strength +
        currentTeamStrength) * W_Strength +

    (obj.applicants[0].attributes.endurance +
        currentTeamEndurance) * W_Endurance +

    (obj.applicants[0].attributes.spicyFoodTolerance +
        currentTeamSpicyFoodTolerance) * W_SpicyFoodTolerance) * TeamAdjustmentMultiplier_If_First_Joined;

scoreForSecondApplicant =    ((obj.applicants[1].attributes.intelligence +
    currentTeamIntelligence) * W_Intelligence +

    (obj.applicants[1].attributes.strength +
        currentTeamStrength) * W_Strength +

    (obj.applicants[1].attributes.endurance +
        currentTeamEndurance) * W_Endurance +

    (obj.applicants[1].attributes.spicyFoodTolerance +
        currentTeamSpicyFoodTolerance) * W_SpicyFoodTolerance) * TeamAdjustmentMultiplier_If_Second_Joined;

scoreForThirdApplicant =    ((obj.applicants[2].attributes.intelligence +
    currentTeamIntelligence) * W_Intelligence +

    (obj.applicants[2].attributes.strength +
        currentTeamStrength) * W_Strength +

    (obj.applicants[2].attributes.endurance +
        currentTeamEndurance) * W_Endurance +

    (obj.applicants[2].attributes.spicyFoodTolerance +
        currentTeamSpicyFoodTolerance) * W_SpicyFoodTolerance) * TeamAdjustmentMultiplier_If_Third_Joined;

// Make sure compatibility score is capped at 1 maximum, with one decimal place.
scoreForFirstApplicant = Number(Math.min(scoreForFirstApplicant, 1).toFixed(1));
scoreForSecondApplicant = Number(Math.min(scoreForSecondApplicant, 1).toFixed(1));
scoreForThirdApplicant = Number(Math.min(scoreForThirdApplicant, 1).toFixed(1));

// Build HTML content of team stats for each applicant
document.getElementById("compatibility-score").innerHTML +=
    "John" + " : " + scoreForFirstApplicant + "<br>" +
    "Jane" + " : " + scoreForSecondApplicant + "<br>" +
    "Joe" + " : " + scoreForThirdApplicant + "<br>";

var output = {};
var scoredApplicants = []
output.scoredApplicants = scoredApplicants;

var scoredApplicant1 = {
    "name" : "John",
    "score" : scoreForFirstApplicant
}

var scoredApplicant2 = {
    "name" : "Jane",
    "score" : scoreForSecondApplicant
}

var scoredApplicant3 = {
    "name" : "Joe",
    "score" : scoreForThirdApplicant
}

output.scoredApplicants.push(scoredApplicant1, scoredApplicant2, scoredApplicant3);

document.getElementById("output").innerHTML +=JSON.stringify(output);