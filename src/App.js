import './App.css';
import NavBar from "./components/navBar";
import FavBar from "./components/favBar";
import ForumList from './components/forumList';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <FavBar/>
      <ForumList />
    </div>
  );
}

export default App;
