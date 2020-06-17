import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Tournaments from './pages/tournaments/tournaments';
import TournamentDetails from './pages/tournamentDetails/tournamentDetails';
import MatchDetails from './pages/matchDetails/matchDetails';
import Footer from './components/footer/footer';
import './App.scss';

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
          <Route path='/tournaments' component={ Tournaments } />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
