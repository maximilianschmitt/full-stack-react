'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const RSVP = require('rsvp');
const Iso = require('iso');
const React = require('react');
const Router = require('react-router');
const routes = require('./routes');
const app = express();

app.use(function(req, res, next) {
  if (req.path === '/favicon.ico') {
    return res.status(404).end();
  }

  next();
});

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  const iso = new Iso();
  Router.run(routes, req.path, function(Handler, state) {
    const fetches = state.routes
      .filter(route => !!route.handler.prepareForRequest)
      .reduce((requests, route) => {
        requests[route.name] = route.handler.prepareForRequest(req);
        return requests;
      }, {});

    RSVP.hash(fetches).then(data => {
      iso.add(React.renderToString(<Handler data={data} />), data);
      res.send(renderHtml(iso.render()));
    }).catch(next);
  });
});

app.use(function(err, req, res, next) {
  res.status(500).end('An unkown error occurred');
  console.error(err.stack || err);
  process.exit(1);
});

app.listen(process.env.PORT || 3000);

function renderHtml(html) {
  return `
<html>
  <head>
    <title>Server-Side React</title>
    <meta charset="utf-8" />
  </head>
  <body>
  ${html}
  <script src="/app.js"></script>
  </body>
</html>
`;
}
