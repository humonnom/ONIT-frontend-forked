import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PageWrapper } from './components';
import { NormalModePage, EditModePage } from './pages';

function App() {
  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route exact path='/'>
            <NormalModePage />
          </Route>
          <Route exact path='/edit'>
            <EditModePage />
          </Route>
          <Route path='/'>
            <div>error</div>
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
