import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BankCardContainer from './BankCardContainer.js';

// const styles = {
//   container: {
//     textAlign: 'center',
//     paddingTop: 200,
//   },
// };

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   open: false,
    // };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <AppBar title="Block or unblock" iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <BankCardContainer />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
