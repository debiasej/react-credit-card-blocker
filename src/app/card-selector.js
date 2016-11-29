import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 150,
  },
};

class CardSelector extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: 0,
      cards: []
    };

    this.state.cards =  this.props.cards.map( (card, index) => {
      debugger;
      return (
        <MenuItem key={index} value={index} primaryText= {`Card ${card.alias}`} />
      );
    });
  }

  handleChange = (event, index, value) => {
    this.setState({value});
  };

  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Cards"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {this.state.cards}
        </SelectField>
      </div>
    );
  }
}

export default CardSelector;
