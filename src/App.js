import React, { Component } from 'react'
import LoveCanvas from './LoveCanvas'
import About from './About'
import LinkGenerator from './LinkGenerator'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

class App extends Component {
  componentDidMount() {
    // Google Analytics
    ReactGA.initialize('UA-121978101-1')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    return (
      <Switch>
        <Route path="/:name/:year/:month/:date" component={LoveCanvas} />
        <Route
          exact
          path="/"
          render={() => <LoveCanvas overlayComponent={<LinkGenerator />} />}
        />
        <Route
          exact
          path="/about"
          render={() => <LoveCanvas overlayComponent={<About />} />}
        />
        <Route
          path="/"
          render={() => (
            <LoveCanvas
              match={{
                params: { name: 'Katharine', year: 2014, month: 6, date: 13 }
              }}
            />
          )}
        />
      </Switch>
    )
  }
}

export default App
