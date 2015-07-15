'use strict';

const express = require('express');
const React = require('react');
const Router = require('react-router');
const routes = require('./routes');
const app = express();

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    res.send(React.renderToString(<Handler path={req.path} />));
  });
});

app.listen(process.env.PORT || 3000);
