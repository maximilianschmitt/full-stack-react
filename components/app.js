'use strict';

const React = require('react');
const Router = require('react-router')
const Link = Router.Link;
const RouteHandler = Router.RouteHandler;

class App extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Isomorphic React</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="about">About</Link></li>
          </ul>
          <RouteHandler />
        </body>
      </html>
    );
  }
}

module.exports = App;
