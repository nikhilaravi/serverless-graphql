import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

const apiURL = 'https://f0uih51vu0.execute-api.eu-west-1.amazonaws.com';

require('../node_modules/graphiql/graphiql.css');

class GraphiQLIDE extends Component {
  graphQLFetcher (graphQLParams) {
    return fetch(`${apiURL}/graphql`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  }

  render () {
    return (
      <GraphiQL fetcher={this.graphQLFetcher.bind(this)}/>
    );
  }
}

ReactDOM.render(<GraphiQLIDE />, document.body);
