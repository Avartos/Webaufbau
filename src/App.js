import './App.css';
import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from './components/forumList';
import Contributions from './components/contributions';
import './contributions.css';
import './signinlogin.css';
import Login from "./components/Login";
import {Router} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <FavBar/>
      <ForumList />
      <Contributions ></Contributions>
      <Login />
    </div>
  );
}

export default App;
