import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import PostingBuy from './Components/PostingBuy';
import Posts from './Components/Posts';
import PostingSell from './Components/PostingSell';
import PostingTrade from './Components/PostingTrade';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import { UserProvider } from './Context/UserContext';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import PostList from './Components/PostList';

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <div className="wrapper">
          <Switch>
            <Route path="/" exact>
              <div className="flex-homepage">
                <PostList />
                <PostingBuy />
              </div>
            </Route>
            <Route path="/sell">
              <div className="flex-homepage">
                <PostList />
                <PostingSell />
              </div>
            </Route>
            <Route path="/trade">
              <div className="flex-homepage">
                <PostList />
                <PostingTrade />
              </div>
            </Route>
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/signup" component={SignUp} />
            <PrivateRoute path="/login" component={Login} />
          </Switch>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
