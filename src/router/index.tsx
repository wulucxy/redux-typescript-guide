import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Basic from '../pages/basic'

class CoreRouter extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Basic} />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(CoreRouter)
