import './App.css';
import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from './components/forumList';
import Contributions from './components/contributions';
import './contributions.css';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <FavBar/>
      <ForumList />
      <Contributions ></Contributions>
    </div>
  );
}

export default App;
