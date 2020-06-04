import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import TournamentList from './pages/tournamentList/tournamentList';
import TournamentDetails from './pages/tournamentDetails/tournamentDetails';
import MatchDetails from './pages/matchDetails/matchDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' >
            <Redirect to='/tournaments' />
          </Route>
          <Route path='/tournaments/:id' component={ TournamentDetails } />
          <Route path='/match/:id' component={ MatchDetails } />
          <Route path='/tournaments' component={ TournamentList } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
