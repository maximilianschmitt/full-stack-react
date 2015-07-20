'use strict';

const React = require('react');
const Router = require('react-router')
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;

class App extends React.Component {
  render() {
    const initialState = this.props.initialState
      ? this.props.initialState.child
      : {};

    return (
      <div className="app">
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="ip">Ip</Link></li>
          <li><Link to="markdown">Markdown</Link></li>
        </ul>

        <RouteHandler initialState={initialState} />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = App;
