import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BankCardContainer from './bank-card-container.js';
import httpRequest, { httpGet, httpPost  } from '../requests/http-requests';

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
      chipStatus: null,
      url:  `${baseUrl}tarjetas`
    }
  }

  componentDidMount() {

    httpGet(this.state.url, data => {
      this.setState({ cards: data.cuentasOrigen });
      this.selectorOnChangeHandler();
    });
  }

  buttonClickedHandler = () => {

    if (this.state.step == "blockOrUnblockCard") {
      this.setState({ step: "signOperation", url: `${baseUrl}blockcard` }, () => {
        httpGet(this.state.url, data => {
          console.log(data.result);
        });
      });

    }
    // else {
    //   this.setState({ step: "blockOrUnblockCard", url: `${baseUrl}tarjetas` }, () => {
    //       fetchUrl(`${baseUrl}tarjetas`, data => {
    //         this.setState({ cards: data.cuentasOrigen });
    //       });
    //   });
    // }
  }

  selectorOnChangeHandler = () => {

    let cardId = JSON.stringify({ cardId: "" });

    httpPost(`${baseUrl}ValidarBloqueoDesbloqueoTarjetas`, cardId, data => {
      this.setState({ chipStatus: eval(data.isBlocked) });
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <AppBar title="Block or unblock" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <BankCardContainer
          step={ this.state.step }
          cards={ this.state.cards }
          chipStatus= { this.state.chipStatus }
          buttonClicked={ this.buttonClickedHandler }
          selectorOnChange={ this.selectorOnChangeHandler } />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
