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
      isCurrentCardBlocked: null,
      showPasswordField: false,
      typedPassword: ""
    }
  }

  componentDidMount() {

    appHttp.getCards( data => {
      let initCurrentCard = data.cuentasOrigen.length > 0 ? 0 : -1;
      this.setState({ cards: data.cuentasOrigen, currentCard: initCurrentCard });
      this.selectorOnChangeHandler(initCurrentCard);
    });
  }

  render() {

    const isPasswordEmpty = (this.state.typedPassword).length == 0 ? true : false;

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
      <div>
        <AppBar title="Block or unblock" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <BankCardContainer
          step={ this.state.step }
          cards={ this.state.cards }
          showPasswordField ={ this.state.showPasswordField }
          isCurrentCardBlocked= { this.state.isCurrentCardBlocked }
          selectorOnChange={ this.selectorOnChangeHandler }
          buttonClicked={ this.buttonClickedHandler }
          backButtonClicked={ this.backButtonClickedHandler }
          onInputChange={ this.onInputChangeHandler }
          isPasswordEmpty={ isPasswordEmpty } />
      </div>
      </MuiThemeProvider>
    );
  }

  // TODO: Change eval in producction
  selectorOnChangeHandler = (selectorValue) => {
    let cardId = {identificadorTarjeta: this.state.cards[selectorValue].identificador};

    this.setState({ step: appStep.INIT });
    appHttp.postCheckIfCardIsBlockedOrUnBlocked( JSON.stringify( cardId ), (data) => {
      this.setState({
        step: appStep.READY,
        currentCard: selectorValue,
        isCurrentCardBlocked: eval(data.isBlocked)
      });
    });
  }

  buttonClickedHandler = () => {
    switch ( this.state.step ) {
      case appStep.READY:
        this.setState({ step: appStep.SIGNATURE }, () => {
          this._blockOrUnblockCard();
        });
        break;

      default:
        console.err("The operation is not allowed");
    }
  }

  _blockOrUnblockCard() {

    let cardRequestData = {
      identificadorTarjeta: this.state.cards[this.state.currentCard].identificador,
      tipoAccionBloque: ""
    };

    let setShowPasswordField = () => {
      this.setState({ showPasswordField: true });
    }

    if (this.state.isCurrentCardBlocked) {
      cardRequestData.tipoAccionBloque = "ENCENDER";

      appHttp.postUnblockCard( cardRequestData, cardRequestData => {
        console.log(cardRequestData);
        setShowPasswordField();
      });

    } else {
      cardRequestData.tipoAccionBloque = "APAGAR";

      appHttp.postBlockCard( cardRequestData, cardRequestData => {
        console.log(cardRequestData);
        setShowPasswordField();
      });
    }
  }

  backButtonClickedHandler = () => {
    this.setState({
      step: appStep.INIT,
      cards: [],
      currentCard: -1,
      isCurrentCardBlocked: null,
      typedPassword: ""
    });
  }

  onInputChangeHandler = (event) => {
      this.setState({ typedPassword: event.target.value });
  }
}

export default Main;
