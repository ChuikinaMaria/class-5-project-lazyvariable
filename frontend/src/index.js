import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import SignUp from './components/signUp'
import Nav from './nav/navigation'
import LoginComponent from './components/login'
import LogoutComponent from './components/logout'
import CreateComponent from './components/create'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/signup" component={SignUp} />
      <Route path="/nav" component={Nav} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/logout" component={LogoutComponent} />
      <Route path="/create" component={CreateComponent} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
