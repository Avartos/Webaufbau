import React, { useEffect, useState } from "react";

const GifApi = (prop) => {
  // set words to search for
  const searchWords = prop.searchList;
  // set the apikey and limit
  const apikey = "OUXM9BQB1TTQ";

  const limit = 10;

  const [isPending, setIsPending] = useState(true);

  const [gif, setGif] = useState("");

  // url Async requesting function
  const httpGetAsync = (theUrl, callback) => {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        callback(xmlHttp.responseText);
      }
    };

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
  };

  // get a random number between 0 and max-1
  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  // callback for the top 8 GIFs of search
  const tenorCallback_search = (responsetext) => {
    // parse the json response
    let response_objects = JSON.parse(responsetext);

    let randomNumber = getRandomNumber(limit);
    console.log("Array " + randomNumber);

    var top_10_gifs = response_objects["results"];

    // load the GIF into the img

    setGif(top_10_gifs[randomNumber]["media"][0]["gif"]["url"]);

    return;
  };

  // function to call the trending and category endpoints
  const grab_data = () => {
    if (isPending) {
      setIsPending(false);
      let randomNumber = getRandomNumber(searchWords.length);
      console.log("Wordlenght " + randomNumber);

      // test search term
      let search_term = searchWords[randomNumber];
      console.log(searchWords[randomNumber]);

      // using default locale of en_US
      let search_url =
        "https://g.tenor.com/v1/search?q=" +
        search_term +
        "&key=" +
        apikey +
        "&limit=" +
        limit;

      httpGetAsync(search_url, tenorCallback_search);

      // data will be loaded by each call's callback
      return;
    }
  };

  useEffect(grab_data);

  return (
    <React.Fragment>
      <div className="gifApi">
        <img id="preview_gif" src={gif} alt="" />
      </div>
    </React.Fragment>
  );
};

export default GifApi;
