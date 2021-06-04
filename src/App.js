import './App.css';
import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from './components/forumList';
import Contributions from './components/contributions';
import './contributions.css';
import './signinlogin.css';
import ThreadList from './components/threadList';
import Login from "./components/Login";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Signin from './components/Signin';

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
