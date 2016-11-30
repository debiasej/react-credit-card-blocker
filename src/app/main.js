import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BankCardContainer from './bank-card-container.js';

//import fetch from 'fetch';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const baseUrl = "http://demo9087061.mockable.io/";

function fetchUrl(url, callback) {

  fetch(url)
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(data) {
    callback(data);
  });
}

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: "blockOrUnblockCard",
      cards: [],
      url:  `${baseUrl}tarjetas`
    }
  }

  componentDidMount() {

    fetchUrl(this.state.url, data => {
      this.setState({ cards: data.cuentasOrigen });
    });
  }

  buttonClickedHandler = () => {

    if (this.state.step == "blockOrUnblockCard") {
      this.setState({ step: "signOperation", url: `${baseUrl}blockcard` }, () => {
        fetchUrl(this.state.url, data => {
          console.log(data.result);
        });
      });

    } else {
      this.setState({ step: "blockOrUnblockCard", url: `${baseUrl}tarjetas` }, () => {
          fetchUrl(`${baseUrl}tarjetas`, data => {
            this.setState({ cards: data.cuentasOrigen });
          });
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <AppBar title="Block or unblock" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <BankCardContainer
          step={ this.state.step }
          cards={ this.state.cards }
          buttonClicked={ this.buttonClickedHandler } />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
