'use strict';

const React = require('react');
const Router = require('react-router')
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;

class App extends React.Component {
  render() {
    const currentRoutes = this.context.router.getCurrentRoutes();
    const routeName = currentRoutes[currentRoutes.length - 1].name;
    const routeProps = this.props.data[routeName];

    return (
      <div className="app">
        <ul>
          <li><Link to="home">Home</Link></li>
          <li><Link to="ip">Ip</Link></li>
          <li><Link to="markdown">Markdown</Link></li>
        </ul>
        <RouteHandler initialState={routeProps} />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = App;
