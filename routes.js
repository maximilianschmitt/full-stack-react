'use strict';

// include React, although it is not used, to prevent
// ReferenceError: React is not defined

const React = require('react');
const Router = require('react-router');
const App = require('./components/app');
const Home = require('./components/home');
const Markdown = require('./components/markdown');
const Ip = require('./components/ip');
const Route = Router.Route;

const routes = (
  <Route handler={App}>
    <Route name="home" path="/" handler={Home} />
    <Route name="markdown" path="/markdown" handler={Markdown} />
    <Route name="ip" path="/ip" handler={Ip} />
  </Route>
);

module.exports = routes;
