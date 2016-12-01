import {appStep} from '../config/index'
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BankCardContainer from './bank-card-container';
import appHttp from '../requests/http-requests';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: appStep.INIT,
      cards: [],
      currentCard: -1,
      isCurrentCardBlocked: null
    }
  }

  componentDidMount() {

    appHttp.getCards( data => {

      let initCurrentCard = data.cuentasOrigen.length > 0 ? 0 : -1;
      this.setState({ cards: data.cuentasOrigen, currentCard: initCurrentCard });
      this.selectorOnChangeHandler(initCurrentCard);
    });
  }

  buttonClickedHandler = () => {

    if (this.state.step == appStep.READY) {

      this.setState({ step: appStep.SIGNATURE }, () => {
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

    this.setState({ step: appStep.INIT });

    appHttp.postCheckIfCardIsBlockedOrUnBlocked( cardId, (data) => {
      this.setState({
        step: appStep.READY,
        currentCard: selectorValue,
        isCurrentCardBlocked: eval(data.isBlocked)
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
          isCurrentCardBlocked= { this.state.isCurrentCardBlocked }
          buttonClicked={ this.buttonClickedHandler }
          selectorOnChange={ this.selectorOnChangeHandler } />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
