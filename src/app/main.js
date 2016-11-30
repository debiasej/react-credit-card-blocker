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
      currentCard: -1,
      chipState: null,
      url:  `${baseUrl}tarjetas`
    }
  }

  componentDidMount() {

    httpGet(this.state.url, data => {

      let initCurrentCard = data.cuentasOrigen.length > 0 ? 0 : -1;
      this.setState({ cards: data.cuentasOrigen, currentCard: initCurrentCard });
      this.selectorOnChangeHandler(initCurrentCard);
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

  // TODO: Change eval in producction
  selectorOnChangeHandler = (selectorValue) => {

    let cardId = JSON.stringify({ cardId: this.state.cards[selectorValue].identificador });

    httpPost(`${baseUrl}ValidarBloqueoDesbloqueoTarjetas`, cardId, data => {
      this.setState({
        chipState: eval(data.isBlocked) ? 'blocked' : 'unblocked',
        currentCard: selectorValue
      });
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
          chipState= { this.state.chipState }
          buttonClicked={ this.buttonClickedHandler }
          selectorOnChange={ this.selectorOnChangeHandler } />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
