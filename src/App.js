import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'

import './App.css'

import GuestRoute from './components/routes/GuestRoute'
import LoggedRoute from './components/routes/LoggedRoute'

import LoginPage from './guestRoutes/LoginPage'
import RegisterPage from './guestRoutes/RegisterPage'
import DashboardPage from './loggedRoutes/DashboardPage'

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Switch>
              <GuestRoute path="/" exact component={ LoginPage } />
              <GuestRoute path="/register"  component={ RegisterPage } />
              <LoggedRoute path="/dashboard" exact component={ DashboardPage } />
            </Switch>
        </div>
        </Router>
      </Provider>
    )
  }
}

export default App