import {appStep} from '../config/index.js'
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
      showPasswordField: false
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
    const blockOrUnBlockButtonText = this.props.isCurrentCardBlocked ? 'unblock card' : 'block card';
    const buttonText = (this.props.step == appStep.READY || this.props.step == appStep.INIT) ?
     blockOrUnBlockButtonText : "Firmar";

    const stepIsInit= this.props.step == appStep.INIT ? true  : false;
    const isPasswordEmpty = (this.props.step == appStep.SIGNATURE && this.props.isPasswordEmpty);

    return (
      <Card>
        <div className="card-wrapper">
        <CardTitle style={ style } title="Cards" />
        <InfoChip chipState={ this.props.isCurrentCardBlocked ? 'blocked' : 'unblocked' } />
        </div>
        <CardActions>
          <CardSelector
            cards={ this.props.cards }
            onChange={ this.props.selectorOnChange }
            disabled={ this.props.step == appStep.SIGNATURE } />
          { this.state.showPasswordField ?
            <ConfirmOperationTextField onInputChange={ this.props.onInputChange } /> : null }
          <br />
          <FlatButton
            label={ buttonText }
            primary={ true }
            onTouchTap={ this.handleTouchTap }
            disabled={ stepIsInit || isPasswordEmpty } />
        </CardActions>
      </Card>
    );
  }
}

export default BankCardContainer;
