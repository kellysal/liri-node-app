// require the dotenv package
require("dotenv").config();

// require that a request is made
const request = require("request");

// require the moment npm package
const moment = require("moment");

// require fs
const fs = require("fs");

// require key.js
const keys = require("./keys.js");

//initialize spotify
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//omdb and bands api
var omdb = (keys.omdb);
var bandsInTown = (keys.bandsInTown);

//user input
var userInput = process.argv[2];
var userQuery = process.argv.slice().join(" ");

//function
function user(userInput, userQuery) {
    //decision from input
    switch (userInput) {
        case "concert-this":
            concertThis();
        case "spotify-this":
            spotifyThisSong();
        case "movie-this":
            movieThis();
        case "do-what-it-says":
            doWhatItSays();
    }
}

user(userInput, userQuery);