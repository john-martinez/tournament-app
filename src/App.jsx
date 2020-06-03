import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TournamentList from './components/tournamentList/tournamentList';
import TournamentDetails from './pages/tournamentDetails/tournamentDetails';
import MatchDetails from './pages/matchDetails/matchDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path='/tournaments' component={ TournamentList } />
          <Route path='/match/:id' component={ MatchDetails } />
          <Route path='/tournaments/:id' component={ TournamentDetails } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
