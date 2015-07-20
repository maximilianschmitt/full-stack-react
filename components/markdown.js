'use strict';

const React = require('react');
const axios = require('axios');
const serialize = require('form-serialize');

class Markdown extends React.Component {
  constructor() {
    super();
    this.state = { markdown: '', rendered: '' };
  }

  componentWillMount() {
    if (!this.props.initialState || !this.props.initialState.self) {
      return;
    }

    this.setState(this.props.initialState.self);
  }

  onSubmit(e) {
    e.preventDefault();

    Markdown
      .postData(serialize(e.target, { hash: true }))
      .then(markdown => this.setState({ rendered: markdown }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)} method="post" action="/markdown">
          <textarea name="markdown" defaultValue={this.state.markdown} />
          <button type="submit">Render</button>
        </form>

        <div dangerouslySetInnerHTML={{ __html: this.state.rendered }} />
      </div>
    );
  }
}

Markdown.postData = function(data) {
  return axios
    .post('https://api.github.com/markdown', { text: data.markdown })
    .then(res => res.data);
};

Markdown.prepareForRequest = function(req) {
  if (req.method !== 'POST') {
    return;
  }

  return Markdown
    .postData(req.body)
    .then(res => {
      return { markdown: req.body.markdown, rendered: res };
    });
};

module.exports = Markdown;
