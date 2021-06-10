import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import "./assets/css/app.scss";
// import './contributions.css';
// import './signinlogin.css';

import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from "./components/forumList";
import Contributions from "./components/contributions";
import ThreadList from "./components/threadList";
import Login from "./components/login";
import Signin from "./components/signin";

function App() {
  return (

    <Router>
      <div className="App">
        <NavBar />
        <FavBar />
        <div className="rightSideBar"></div>
        <div className="content">
          <Switch>
            {/* Forum Routes */}
            <Route exact path="/"><ForumList/></Route>
            <Route exact path="/threads/:id"><ThreadList/></Route>
            <Route exact path="/contributions/:id"><Contributions/></Route>
            {/* Login Routes */}
            <Route exact path="/registration"><Signin/></Route>
            <Route excact path="/login"><Login/></Route>

            {/* profile */}
            <Route exact path="/my_profile"></Route>

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
