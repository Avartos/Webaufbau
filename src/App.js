import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./assets/css/app.scss";
// import './contributions.css';
// import './signinlogin.css';

import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from "./components/forumList";
import Contributions from "./components/contributions";
import ThreadList from "./components/threads/threadList";
import Login from "./components/login";
import Signin from "./components/signin";
import Account from "./components/profile"

function App() {
  return (

    <Router>
      <div className="App">
        <NavBar />
        <FavBar />
        <div className="content">
          <Switch>
            {/* Forum Routes */}
            <Route exact path="/"><ForumList/></Route>
            <Route exact path="/threads/:forumId"><ThreadList/></Route>
            <Route exact path="/contributions/:id"><Contributions/></Route>
            {/* Login Routes */}
            <Route exact path="/registration"><Signin/></Route>
            <Route excact path="/login"><Login/></Route>

            {/* account */}
            <Route exact path="/profile1"><Account roll="user"/></Route>
            <Route exact path="/profile2"><Account roll="admin"/></Route>

            {/* 404 */}
            <Route path="/">
              <h1>404-Page not Found</h1>
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
