import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Main } from './pages';
import { PageWrapper } from './components'
// import { EditMode } from './pages';

function App() {
  return (
    <PageWrapper>
    <Router>
      <Switch>
        <Route exact path="/"><Main /></Route>
        {/* <Route exact path="/edit"><EditMode /></Route> */}
      </Switch>
    </Router>
    </PageWrapper>
  );
}

export default App;
