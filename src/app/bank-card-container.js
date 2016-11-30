import React, {Component} from 'react';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardSelector from './card-selector.js';
import ConfirmOperationTextField from './confirm-operation-textfield.js';
import InfoChip from './info-chip.js';

const style = {

  width: '50%',
  display: 'inline-block'
};

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
    this.props.buttonClicked();
  }

  render() {
    return (
      <Card>
        <div className="card-wrapper">
        <CardTitle style={ style } title="Cards" />
        <InfoChip chipState={ this.props.chipState } />
        </div>
        <CardActions>
          <CardSelector cards={this.props.cards} onChange={ this.props.selectorOnChange } />
          {this.state.showPasswordField ?  <ConfirmOperationTextField /> : null}
          <br />
          <FlatButton
            label={ this.props.step == "blockOrUnblockCard" ? "Continue" : "Firmar" }
            primary={true}
            onTouchTap={this.handleTouchTap} />
        </CardActions>
      </Card>
    );
  }
}

export default BankCardContainer;
