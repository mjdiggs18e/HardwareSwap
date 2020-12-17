import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';
import Header from './Components/Header';
import PostingBuy from './Components/PostingBuy';
import PostingSell from './Components/PostingSell';
import PostingTrade from './Components/PostingTrade';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <div className='wrapper'>
          <Switch>
            <Route path='/' exact component={PostingBuy} />
            <Route path='/sell' component={PostingSell} />
            <Route path='/trade' component={PostingTrade} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
