import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/css/app.scss";

import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from "./components/forumList";
import Contributions from "./components/contributions";
import ThreadList from "./components/threads/threadList";
import Login from "./components/accountHandling/login";
import SignUp from "./components/accountHandling//signUp";
import Account from "./components/profile";
import ApiTokenForm from "./components/apiTokenForm";
import SearchBar from "./components/searchBar";
import MyProfile from "./components/accountHandling/myProfile";
import UserList from "./components/accountHandling/administration/userList";

import AlertList from "./components/userAlerts/alertList";

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

  const handleRemoveAlert = (alertId) => {
    const filteredAlerts = alerts.filter((alert) => {
      return alert.id !== alertId;
    });
    setAlerts([...filteredAlerts]);
  };

  const handleUpdateProfilePicture = () => {
    setCurrentProfilePicture(sessionStorage.getItem('profilePicture'));
  } 

  return (
    <Router>
      <div className="App">
        <NavBar profilePicturePath={currentProfilePicture}/>
        
        <FavBar />
        <div className="content">
        <SearchBar isMobile={true}/>
          <AlertList
            messages={alerts}
            handleRemoveAlert={handleRemoveAlert}
          ></AlertList>
          <Switch>
            {/* Forum Routes */}
            <Route exact path="/"><ForumList /></Route>
            <Route exact path="/threads/:forumId"><ThreadList handleAddAlert={handleAddAlert} /></Route>
            <Route exact path="/contributions/:id"><Contributions /></Route>
            
            {/* Login Routes */}
            {!sessionStorage.getItem('accessToken') &&
            <Route exact path="/registration"><SignUp handleAddAlert={handleAddAlert} /></Route>}
            
            {!sessionStorage.getItem('accessToken') &&
            <Route excact path="/login"><Login handleAddAlert={handleAddAlert} /></Route>}
            
            {/* account */}
            {sessionStorage.getItem('accessToken') &&
            <Route exact path="/my_profile"><MyProfile handleUpdateProfilePicture={handleUpdateProfilePicture} handleAddAlert={handleAddAlert}/></Route>}
            {sessionStorage.getItem('accessToken') && (sessionStorage.getItem('isAdmin') === true) &&
            <Route exact path="/administration"><UserList/></Route>}
            {sessionStorage.getItem('accessToken') && 
            <Route exact path="/token_request"><ApiTokenForm handleAddAlert={handleAddAlert}/></Route>}
            
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
