import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/css/app.scss";

// #region custom component imports
//general components
import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import SearchBar from "./components/searchBar";
import AlertList from "./components/userAlerts/alertList";

//forum components
import ForumList from "./components/forumList";
import Contributions from "./components/contributions";
import ThreadList from "./components/threads/threadList";

//account components
import Login from "./components/accountHandling/login";
import SignUp from "./components/accountHandling//signUp";
import ApiTokenForm from "./components/apiTokenForm";
import SearchBar from "./components/searchBar";
import SearchList from "./components/searchList"
import MyProfile from "./components/accountHandling/myProfile";
import UserList from "./components/accountHandling/administration/userList";
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

  //used to determine, if the current user is logged in
  const isLoggedIn = () => {
    return sessionStorage.getItem('accessToken') !== null
  }

  const isAdmin = () => {
    return (sessionStorage.getItem('accessToken') !== null && (sessionStorage.getItem('isAdmin') === '1'));
  }

  return (
    <Router>
      <div className="App">
        <NavBar profilePicturePath={currentProfilePicture}/>
        
        <FavBar handleAddAlert = {handleAddAlert} />
        <div className="content">
        <SearchBar isMobile={true}/>
          <AlertList messages={alerts} handleRemoveAlert={handleRemoveAlert} />
          <Switch>
            {/* Forum Routes */}
            <Route exact path="/"><ForumList /></Route>
            <Route exact path="/threads/:forumId"><ThreadList handleAddAlert={handleAddAlert} /></Route>
            <Route exact path="/contributions/:id"><Contributions /></Route>
            
            {/* Login Routes */}
            {!isLoggedIn() &&
            <Route exact path="/registration"><SignUp handleAddAlert={handleAddAlert} /></Route>}
            
            {!isLoggedIn() &&
            <Route excact path="/login"><Login handleAddAlert={handleAddAlert} handleUpdateProfilePicture={handleUpdateProfilePicture}/></Route>}
            
            {/* account */}
            {isLoggedIn() &&
            <Route exact path="/my_profile"><MyProfile handleUpdateProfilePicture={handleUpdateProfilePicture} handleAddAlert={handleAddAlert}/></Route>}
            {isAdmin() &&
            <Route exact path="/administration"><UserList/></Route>}
            {isLoggedIn() &&
            <Route exact path="/token_request"><ApiTokenForm handleAddAlert={handleAddAlert}/></Route>}

            <Route exact path="/search"><SearchList/></Route>
            {/* 404 */}
            <Route path="/">
              <h1> 404 - Page not Found </h1>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
