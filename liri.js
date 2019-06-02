// require the dotenv package
require("dotenv").config();

// require that a request is made
let request = require("request");

//require axios for api
const axios = require("axios");

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
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);

//user input-command line
let userInput = process.argv[2];
let userQuery = process.argv[3];

//function user
function user(userInput, userQuery) {
    //decision from input
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}

user(userInput, userQuery);

//function concertThis node liri.js concert-this <artist/band name here>
function concertThis() {
    console.log(`SEARCHING`);
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp").then(function (data) {
        for (var i = 0; i < data.data.length; i++) {
            //Name of the venue
            //Venue location
            console.log(`Venue: ${data.data[i].venue.name} Venue Location: ${$data.data[i].venue.latitude},${data.data[i].venue.longitude} Venue City: ${data.data[i].venue.city}, ${data.data[i].venue.country}`)

            //Date of the Event(use moment to format this as "MM/DD/YYYY")
            var eventDate = moment(data.data[i].datetime).format("MM/DD/YYYY hh:00 A");
            console.log(`Date and Time: ${eventDate}`);
        }
    })

};

//function spotify-this-song `node liri.js spotify-this-song '<song name here>'`
function spotifyThisSong() {
    //If no song is provided then default to "The Sign" by Ace of Base
    if (userQuery === undefined) {
        console.log("the sign by ace of base");
    }
    //search spotify
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let song = data.tracks.items[0];
        //Artist(s)
        //The song's name
        //A preview link of the song from Spotify
        //The album that the song is from
        console.log(`Artist: ${song.artists[0].name} Song: ${song.name} Album: ${song.album.name} Spotify link: ${song.preview_url}`);
    });

};

//function for movieThis `node liri.js movie-this '<movie name here>'`
function movieThis() {
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (!userQuery) {
        userQuery = "Mr. Nobody";
    };
    //request omdb api
    axios.get("http://www.omdbapi.com/?i=tt3896198" + userQuery + "&apikey=b478df2e").then(function (data) {
        console.log(`Title: ${data.data.Title}`)
    })
};

//function do-what-it-says `node liri.js do-what-it-says`
function doWhatItSays() {
    //read the file random.txt
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(error);
        }
        //catch data and split to separate objects in new array
        var dataArr = data.split(",");

        //take objects from random.txt to pass in as parameters
        userInput = dataArr[0];
        userQuery = dataArr[1];
        user(userInput, userQuery);
    });
};


