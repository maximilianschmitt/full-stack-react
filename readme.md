**Update:** I got something simple working, following this little guide: https://github.com/rackt/react-router/wiki/Announcements#whats-the-deal-with-the-new-api

# ipman

A minimal setup for rendering [React](http://reactjs.org/) on the server using [express](http://expressjs.com/) and [react-router](http://rackt.github.io/react-router/).

I want to enhance this sample application by making it fetch the IP from [http://ip.jsontest.com/](http://ip.jsontest.com/). Following [best practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html), I believe the `Ip` component should stay untouched.

## Try it out!

```
git clone https://github.com/maximilianschmitt/ipman
cd ipman
npm install
npm start
```

The server will listen on port `3000` or the one specified in the environment variable `PORT`.
