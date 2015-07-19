'use strict';

const React = require('react');
const axios = require('axios');

class Ip extends React.Component {
  render() {
    return <div>Your ip is: {this.props.ip || 'undefined'}</div>;
  }
}

Ip.fetchData = function() {
  return axios.get('http://ip.jsontest.com').then(res => res.data);
};

module.exports = Ip;
