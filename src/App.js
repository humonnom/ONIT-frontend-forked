import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageWrapper } from './components';
import { NormalMode, EditMode } from './pages';

function App() {
  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <NormalMode />
          </Route>
          <Route exact path='/edit'>
            <EditMode />
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
