'use strict';

const express = require('express');
const React = require('react');
const Router = require('react-router');
const routes = require('./routes');
const RSVP = require('rsvp');
const app = express();

app.use(function(req, res, next) {
  if (req.path === '/favicon.ico') {
    return res.status(404).end();
  }

  next();
});

app.use(function(req, res, next) {
  Router.run(routes, req.path, function(Handler, state) {
    const fetches = state.routes
      .filter(route => !!route.handler.fetchData)
      .reduce((requests, route) => {
        requests[route.name] = route.handler.fetchData();
        return requests;
      }, {});

    RSVP.hash(fetches).then(data => {
      res.send(React.renderToString(<Handler data={data} />));
    }).catch(next);
  });
});

app.use(function(err, req, res, next) {
  res.status(500).end('An unkown error occurred');
  console.error(err.stack || err);
  process.exit(1);
});

app.listen(process.env.PORT || 3000);
