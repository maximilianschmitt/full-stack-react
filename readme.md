# full-stack-react

A minimal sample full-stack React app using [express](http://expressjs.com/), [iso](https://github.com/goatslacker/iso) and [react-router](http://rackt.github.io/react-router/).

## Preface

I made this app to understand how full-stack React works while doing my best to keep the code easy-to-follow. The real work happens in `server.js` when `react-router` runs. The system isn't perfect yet, but I think it works alright for a simple app. I'm very interested in suggestions how I could make this better, so feel free to contact me or open an issue if you have any feedback!

## Todo

Allow `<RouteHandler />` nesting to be arbitrarily deep by generating props like this:

```
{
  initialState: {
    self: fetchedData || null,
    child: {
      self: fetchedData || null,
      child: '...'
    }
  }
}
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
