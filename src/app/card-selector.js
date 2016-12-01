import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 250,
  },
};

class CardSelector extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  handleChange = (event, index, value) => {
    this.setState({value});
    this.props.onChange(value);
  };

  render() {

    const jsxCards = this.props.cards.map( (card, index) => {
      return (
        <MenuItem
          key={index}
          value={index}
          primaryText= {`${card.alias != "" ? card.alias : card.identificador}`} />
      );
    })

    const jsxNoCards =
      <MenuItem
        value={0}
        primaryText= {'No cards'} />;

    return (
      <div>
        <SelectField
          floatingLabelText="Select a cards"
          style={ styles.customWidth }
          value={ this.state.value }
          onChange={ this.handleChange }
          disabled={ this.props.disabled }
        >
          {jsxCards.length > 0 ? jsxCards : jsxNoCards }
        </SelectField>
      </div>
    );
  }
}

export default CardSelector;
