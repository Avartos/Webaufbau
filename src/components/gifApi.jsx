import React, { useState } from 'react';

const GifApi = () => {

    // set words to search for
    const searchWords = ['404', 'technical difficulties', 'cry', 'anger', 'explosion'];
    // set the apikey and limit
    const apikey = "OUXM9BQB1TTQ";
    const lmt = 10;
    var alreadyLoaded = false;

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
        console.log("Array " + randomNumber);

        var top_10_gifs = response_objects["results"];

        // load the GIF into the img

        document.getElementById("preview_gif").src = top_10_gifs[randomNumber]["media"][0]["gif"]["url"];

        return;

    };


    // function to call the trending and category endpoints
    function grab_data()
    {
        if(!alreadyLoaded)
        {
        alreadyLoaded = true;
        let randomNumber = getRandomNumber(searchWords.length);
        console.log("Wordlenght " + randomNumber);

        // test search term
        let search_term = searchWords[randomNumber];
        console.log(searchWords[randomNumber]);

        // using default locale of en_US
        let search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

        httpGetAsync(search_url,tenorCallback_search);

        // data will be loaded by each call's callback
        return;
        }
    };



    return(
        <React.Fragment>

            {grab_data()}
            <img id="preview_gif" src="" alt=""/>

        </React.Fragment>
    )
}

export default GifApi;