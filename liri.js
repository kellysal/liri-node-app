// require the dotenv package
require("dotenv").config();

// require that a request is made - didnt need
// let request = require("request");

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
    let queryUrl = "https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl).then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                //Name of the venue
                //Venue location
                console.log(`Venue Name: ${response.data[i].venue.name} Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`)

                //Date of the Event(use moment to format this as "MM/DD/YYYY")
                var eventDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A");
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
    if (userQuery === undefined) {
        userQuery = "Mr. Nobody";
    };
    //request omdb api
    let queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=trilogy";
    //use axios npm to request
    axios
        .get(queryUrl).then(function (response) {
            //Title of the movie
            //Year the movie came out
            //IMDB Rating of the movie
            //Rotten Tomatoes Rating of the movie
            //Country where the movie was produced
            //Language of the movie
            //Plot of the movie
            //Actors in the movie
            console.log(`Title: ${response.data.Title} Released: ${response.data.Year} IMDB Rating: ${response.data.Rated} Rotten Tomatoes: ${response.data.Ratings[1].Value} Produced: ${response.data.Country} Language: ${response.data.Language} Plot: ${response.data.Plot} Actors: ${response.data.Actors}`)
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


