# full-stack-react

A minimal sample full-stack React app using [express](http://expressjs.com/), [iso](https://github.com/goatslacker/iso), [react-router](http://rackt.github.io/react-router/) and [iniquest](https://github.com/maximilianschmitt/iniquest).

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
  render() {
    return <div>Your ip is: {this.state.ip}</div>;
  }
}

mixin.onClass(Ip, iniquest.InitialStateFromProps);

Ip.prepareForRequest = function() {
  return axios.get('http://ip.jsontest.com').then(res => res.data);
};
```

In `server.js` there are about 10 lines of code that make this possible. If the `Ip` component had a child `RouteHandler` with its own `prepareForRequest` method, it could pass through the child state through props by mixing in `iniquest.InitialChildState`.

```jsx
<RouteHandler initialState={this.initialChildState} />
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
