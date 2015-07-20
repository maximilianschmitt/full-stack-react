'use strict';

const React = require('react');
const axios = require('axios');
const iniquest = require('iniquest');
const mixin = require('react-mixin');

class Ip extends React.Component {
  constructor() {
    super();
    this.state = { ip: null };
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

mixin.onClass(Ip, iniquest.InitialStateFromProps);

Ip.fetchData = function() {
  return axios.get('http://ip.jsontest.com').then(res => res.data);
};

Ip.prepareForRequest = function() {
  return Ip.fetchData();
};

module.exports = Ip;
