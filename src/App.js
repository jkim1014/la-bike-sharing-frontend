import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import config from './config'
import Home from './containers/Home/'

// creates new client
const client = new ApolloClient({
  uri: config.graphqlUrl
})

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <div className="App">
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App
