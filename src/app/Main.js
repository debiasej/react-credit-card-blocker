import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BankCardContainer from './bank-card-container.js';
import HTTPRequest from './http-request.js';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const baseUrl = "http://demo9087061.mockable.io/";

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: "blockOrUnblockCard",
      cards: [],
      url:  `${baseUrl}tarjetas`
    }
  }

  buttonClickedHandler = () => {
    if (this.state.step == "blockOrUnblockCard") {
        this.setState({
          step: "signOperation",
          url: `${baseUrl}blockcard`
        });

    } else {
      this.setState({
        step: "blockOrUnblockCard",
        url: `${baseUrl}tarjetas`
      });
    }
  }

  responseHandler = ( result ) =>  {
    debugger;
    this.setState( {cards: result.body.cuentasOrigen} );
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
        <HTTPRequest url={ this.state.url } data ={ this.responseHandler } />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
