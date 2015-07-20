'use strict';

const React = require('react');
const axios = require('axios');

class Ip extends React.Component {
  constructor() {
    super();
    this.state = { ip: null };
  }

  componentWillMount() {
    if (!this.props.initialState || !this.props.initialState.self) {
      return;
    }

    this.setState(this.props.initialState.self);
  }

  componentDidMount() {
    if (this.state.ip) {
      return;
    }

    Ip.fetchData().then(data => this.setState(data));
  }

  render() {
    return <div>Your ip is: {this.state.ip}</div>;
  }
}

Ip.fetchData = function() {
  return axios.get('http://ip.jsontest.com').then(res => res.data);
};

Ip.prepareForRequest = function() {
  return Ip.fetchData();
};

module.exports = Ip;
