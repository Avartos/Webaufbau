import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import './App.css';
import ThreadList from './components/threadList';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>SQUID!</h1>
        <Switch>
          <Route exact path="/">
            <p>Startseite</p>
            <Link to="/threads/1">
              <p>Threads anzeigen</p>
            </Link>
          </Route>
          <Route exact path="/threads/:id">
            <ThreadList/>
          </Route>
        </Switch>
        
    </div>
    </Router>
  );
}

export default App;
