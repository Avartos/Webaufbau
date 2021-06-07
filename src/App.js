import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import './App.css';
import './contributions.css';
import './signinlogin.css';

import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from './components/forumList';
import Contributions from './components/contributions';
import ThreadList from './components/threadList';
import Login from "./components/login";
import Signin from './components/signin';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <FavBar/>
        <Switch>
          <Route exact path="/">
            <ForumList />
          </Route>
          <Route exact path="/threads/:id">
            <ThreadList/>
          </Route>
          <Route excact path="/login">
            <Login />
          </Route>
          <Route exact path="/registration">
            <Signin />
          </Route>
          <Route exact path="/contributions/:id">
            <Contributions ></Contributions>
          </Route>
        </Switch>
      </div>
    </Router>
    
    
  );
}

export default App;
