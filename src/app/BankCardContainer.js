import React, {Component} from 'react';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardSelector from './CardSelector.js';
import ConfirmOperationTextField from './ConfirmOperationTextField.js';


class BankCardContainer extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      showPasswordField: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap() {
    this.setState({
      showPasswordField: !this.state.showPasswordField
    });
  }

  render() {
    return (
      <Card>
        <CardTitle title="Select a card" />
        <CardActions>
          <CardSelector />
          {this.state.showPasswordField ?  <ConfirmOperationTextField /> : null}
          <br />
          <FlatButton label="Continue" primary={true} onTouchTap={this.handleTouchTap} />
        </CardActions>
      </Card>
    );
  }
}

export default BankCardContainer;
