import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


import "./assets/css/app.scss";
import config from'./core/config';

// #region custom component imports
//general components
import NavBar from "./components/navBar/navBar";
import FavBar from "./components/favBar/favBar";
import SearchBar from "./components/navBar/searchBar";
import AlertList from "./components/userAlerts/alertList";
import GifApi from "./components/gifApi/gifApi";

//forum components
import ForumList from "./components/forums/forumList";
import Contributions from "./components/contributions/contributions.jsx";
import ThreadList from "./components/threads/threadList";

//account components
import Login from "./components/accountHandling/login";
import SignUp from "./components/accountHandling/signUp";
import ApiTokenForm from "./components/apiTokenForm";
import SearchList from "./components/navBar/searchList";
import MyProfile from "./components/accountHandling/myProfile";
import UserList from "./components/accountHandling/administration/userList";
import helper from "./core/helperFunctions";
// #endregion

function App() {
  // contains all alerts that can be added by different components.
  const [alerts, setAlerts] = useState([]);

  //used to update the navbar profile picture icon when selecting a new one in "my profile"
  const [currentProfilePicture, setCurrentProfilePicture] = useState(sessionStorage.getItem('profilePicture'));

  /**
   * Adds an alert to the alert list
   * @param {*} severity The type of alert (error, success, info)
   * @param {*} title  The title of the alert, can be empty
   * @param {*} body The main text of the alert
   */
  const handleAddAlert = (severity, title, body) => {
    const newAlert = {
      id: new Date().getUTCMilliseconds(),
      severity: severity,
      title: title,
      body: body,
    };
    setAlerts([...alerts, newAlert]);
  };

  /**
   * Removes an alert by the given id
   * @param {*} alertId the id of the alert that should be removed
   */
  const handleRemoveAlert = (alertId) => {
    const filteredAlerts = alerts.filter((alert) => {
      return alert.id !== alertId;
    });
    setAlerts([...filteredAlerts]);
  };

  //used to update the profile picture within the navbar, when the session storage gets changed
  const handleUpdateProfilePicture = () => {
    setCurrentProfilePicture(sessionStorage.getItem('profilePicture'));
  }

  const [favouriteThreads, setFavouriteThreads] = useState([]);
  const [popularThreads, setPopularThreads] = useState([]);
  const [latestThreads, setLatestThreads] = useState([]);
  const [searchThreadResults, setSearchThreadResults] = useState([]);
  const [searchForumResults, setSearchForumResults] = useState([]);

  //used to prevent endless search loop when opening search list with prefilles search query
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  
  //fetches threads and forums for search list
  const handleSearch = (query) => {
      setIsFirstSearch(false);
      const encodedQuery= encodeURIComponent(query);
      fetchContent(`${config.serverPath}/api/threads/search?q=${encodedQuery}`, setSearchThreadResults)
      fetchContent(`${config.serverPath}/api/forums/search?q=${encodedQuery}`, setSearchForumResults)
  }

  const fetchContent = (targetUrl, targetSetter) => {
      //used to stop fetching when forcing reload
      const abortController = new AbortController();
      fetch(targetUrl, {
          signal: abortController.signal,
          headers: {
              "Content-Type": "application/json",
              // undefined, if the user is not looged in
              accessToken: sessionStorage.getItem("accessToken"),
          },
      })
      .then((res) => {
            if (!res.ok) {
              throw Error(
                  "Der Server konnte nicht kontaktiert werden"
              );
          }
          return res.json();
      })
      .then((data) => {
          targetSetter(data);
      })
      .catch((error) => {
          if (error.name === "AbortError") {
              console.log("fetch abortet");
          } else {
              handleAddAlert("error", "Fehler", error.message);
          }
      });
      return () => console.log(abortController.abort());
  };

  //used to update the favbar when subscribing a new thread or logging in
  const handleUpdateFavbar = () => {
    if(helper.isLoggedIn()) {
      fetchContent(`${config.serverPath}/api/favBar/favorites`, setFavouriteThreads);
    }
    fetchContent(`${config.serverPath}/api/favBar/latest?limit=5`, setLatestThreads);
    fetchContent(`${config.serverPath}/api/favBar/popular?limit=5`, setPopularThreads);
  }

  //loads all information into the favbar when website has been opened
  //eslint-disable-next-line
  useEffect(handleUpdateFavbar, []);


  return (
    <Router>
      <div className="App">
        <NavBar profilePicturePath={currentProfilePicture} handleSearch={handleSearch}/>
        
        <FavBar favouriteThreads={favouriteThreads} latestThreads={latestThreads} popularThreads={popularThreads}/>
        <div className="content">
        <SearchBar isMobile={true} handleSearch={handleSearch}/>
          <AlertList messages={alerts} handleRemoveAlert={handleRemoveAlert} />
          <Switch>
            {/* Forum Routes */}
            {/* redirect to start page if user is logged in */}
            {helper.isLoggedIn() && <Route exact path="(/login|/registration)"><ForumList handleAddAlert={handleAddAlert}/></Route>}
            <Route exact path="/"><ForumList handleAddAlert={handleAddAlert}/></Route>
            <Route exact path="/threads/:forumId"><ThreadList handleAddAlert={handleAddAlert} handleUpdateFavbar={handleUpdateFavbar} /></Route>
            <Route exact path="/contributions/:threadId"><Contributions handleAddAlert={handleAddAlert} handleUpdateFavbar={handleUpdateFavbar}/></Route>
            
            {/* Login Routes */}
            {!helper.isLoggedIn() &&
            <Route exact path="/registration"><SignUp handleAddAlert={handleAddAlert} /></Route>}

            {!helper.isLoggedIn() && <Route excact path="/login"><Login handleAddAlert={handleAddAlert} handleUpdateProfilePicture={handleUpdateProfilePicture} handleUpdateFavbar={handleUpdateFavbar}/></Route>}
            
            {/* account */}
            {helper.isLoggedIn() &&
            <Route exact path="/my_profile"><MyProfile handleUpdateProfilePicture={handleUpdateProfilePicture} handleAddAlert={handleAddAlert}/></Route>}
            {helper.isAdmin() &&
            <Route exact path="/administration"><UserList/></Route>}
            {helper.isLoggedIn() &&
            <Route exact path="/token_request"><ApiTokenForm handleAddAlert={handleAddAlert}/></Route>}

            <Route exact path="/search"><SearchList searchForumResults={searchForumResults} searchThreadResults={searchThreadResults} handleSearch={handleSearch} isFirstSearch={isFirstSearch}/></Route>
            {/* 404 */}
            <Route path="/">
              <h1>Error 404: Page not found</h1>
              <GifApi searchList={['404', 'technical difficulties', 'cry', 'anger', 'explosion']}/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
