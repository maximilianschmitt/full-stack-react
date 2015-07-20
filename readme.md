# full-stack-react

A minimal sample full-stack React app using [express](http://expressjs.com/), [iso](https://github.com/goatslacker/iso) and [react-router](http://rackt.github.io/react-router/).

## Preface

I made this app to understand how full-stack React works while doing my best to keep the code easy-to-follow. The real work happens in `server.js` when `react-router` runs. The system isn't perfect yet, but I think it works alright for a simple app. I'm very interested in suggestions how I could make this better, so feel free to contact me or open an issue if you have any feedback!

## Async data fetching

One of the biggest challenges with full-stack react for me was/is asynchronous data fetching before rendering on the server while keeping components as pure as possible. Let me try and explain how I approached it:

For this little app, the tree of `RouteHandler`s goes like this:

```jsx
<Route handler={App}>
  <Route name="home" path="/" handler={Home} />
  <Route name="markdown" path="/markdown" handler={Markdown} />
  <Route name="ip" path="/ip" handler={Ip} />
</Route>
```

Every `RouteHandler` can optionally implement a `static` method called `prepareForRequest(req)` where `req` is the request object coming from the express middleware. Here is how the `Ip` component implements this method to fetch the server's ip address before a render (I stripped out all the client-side code for the readme here):

```javascript
class Ip extends React.Component {
  componentWillMount() {
    if (!this.props.initialState || !this.props.initialState.self) {
      return;
    }

    this.setState(this.props.initialState.self);
  }

  render() {
    return <div>Your ip is: {this.state.ip}</div>;
  }
}

Ip.prepareForRequest = function() {
  return axios.get('http://ip.jsontest.com').then(res => res.data);
};
```

In `server.js` there are a few lines of code that make this possible. If the `Ip` component had a child `RouteHandler` with its own `prepareForRequest` method, it could pass through the child state through props:

```jsx
<RouteHandler initialState={this.props.initialState.child} />
```

## Installation

```
$ npm install
```

## Starting the server

```
$ npm start
```

The server will listen on port `3000` or the one specified in the environment variable `PORT`.

## Todo

1. Add ability for parent `RouteHandler`s to pass params to the `prepareForRequest` of a child `RouteHandler`, maybe like this:
    ```javascript
    Component.prepareChildForRequest(initialState, childRoute) : opts
    Component.prepareForRequest(req, opts) : initialState
    ```

2. Find a simple solution so that (1) can optionally run `prepareForRequest`-calls in parallel if `opts` for the child's preparation are not dependent on the parent's `prepareForRequest`
