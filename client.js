'use strict';

const Iso = require('iso');
const React = require('react');
const Router = require('react-router');
const routes = require('./routes');

Iso.bootstrap(function(data, meta, node) {
  Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler initialState={data} />, node, function() {
      data = {};
    });
  });
});
