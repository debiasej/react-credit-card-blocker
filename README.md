# Card blocker/unblocker - Example Project

This is an example app that uses [React](http://facebook.github.io/react/), [Material-UI](http://callemall.github.io/material-ui/) and [fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API).

## Installation

After cloning the repository, install dependencies:
```sh
cd <project folder>/react-material-ui-credit-card-blocker
npm install
```

Now you can run your local server:
```sh
npm start
```
Server is located at http://localhost:3000

Note: To allow external viewing of the demo, change the following value in `webpack-dev-server.config.js`

```
host: 'localhost'  //Change to '0.0.0.0' for external facing server
```
## Aproach

 This example builds a single [root/parent component](http://andrewhfarmer.com/react-ajax-best-practices/) that makes all your AJAX requests. The root component stores the response data in its state, and passes it to its childrens as props.
