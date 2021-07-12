import React, { useState } from 'react';
import Tenor from "react-tenor";

import "react-tenor/dist/styles.css";

const GifApi = () => {

    // set words to search for
    const searchWords = ['404', 'Rammstein', 'Pizza', 'Ball', 'Schule'];
    // set the apikey and limit
    const apikey = "OUXM9BQB1TTQ";
    const lmt = 10;

    // url Async requesting function
    function httpGetAsync(theUrl, callback)
    {
        // create the request object
        var xmlHttp = new XMLHttpRequest();

        // set the state change callback to capture when the response comes in
        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                callback(xmlHttp.responseText);
            }
        }

        // open as a GET call, pass in the url and set async = True
        xmlHttp.open("GET", theUrl, true);

        // call send with no params as they were passed in on the url string
        xmlHttp.send(null);

        return;
    };

    // get a random number between 0 and max-1
    function getRandomNumber(max)
    {
        return Math.floor(Math.random() * max);
    };

    // callback for the top 8 GIFs of search
    function tenorCallback_search(responsetext)
    {
        // parse the json response
        let response_objects = JSON.parse(responsetext);

        let randomNumber = getRandomNumber(lmt);
        console.log(randomNumber);

        var top_10_gifs = response_objects["results"];

        // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (tinygif)

        document.getElementById("preview_gif").src = top_10_gifs[randomNumber]["media"][0]["nanogif"]["url"];

        document.getElementById("share_gif").src = top_10_gifs[randomNumber]["media"][0]["tinygif"]["url"];

        return;

    };


    // function to call the trending and category endpoints
    function grab_data()
    {
        let randomNumber = getRandomNumber(searchWords.length);
        console.log(randomNumber);

        // test search term
        let search_term = searchWords[randomNumber];
        console.log(searchWords[randomNumber]);

        // using default locale of en_US
        let search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

        httpGetAsync(search_url,tenorCallback_search);

        // data will be loaded by each call's callback
        return;
    };



    return(
        <React.Fragment>

            {grab_data()}
            <img id="preview_gif" src="" alt=""/>
            {/*<Tenor token="OUXM9BQB1TTQ" onSelect={result => console.log(result)} />*/}

        </React.Fragment>
    )
}

export default GifApi;