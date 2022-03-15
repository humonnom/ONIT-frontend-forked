import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HandleKakaoLogin } from './components';
import {
  MainPage,
  SplashPage,
  JoinPage,
  FeedbackPage,
  EditModePage,
  TermPage,
  NormalModePage,
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/main' component={MainPage} />
        <Route exact path='/terms' component={TermPage} />
        <Route exact path='/join' component={JoinPage} />
        <Route exact path='/feedback' component={FeedbackPage} />
        <Route exact path='/callback/kakao' component={HandleKakaoLogin} />
        <Route exact path='/:id/' component={NormalModePage} />
        <Route exact path='/:id/edit' component={EditModePage} />
        <Route path='/'>
          <div> 존재하지 않는 페이지입니다. </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
