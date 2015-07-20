'use strict';

const React = require('react');
const mixin = require('react-mixin');
const iniquest = require('iniquest');
const Router = require('react-router')
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="ip">Ip</Link></li>
          <li><Link to="markdown">Markdown</Link></li>
        </ul>

        <RouteHandler initialState={this.initialChildState()} />
      </div>
    );
  }
}

mixin.onClass(App, iniquest.InitialChildState);

module.exports = App;
