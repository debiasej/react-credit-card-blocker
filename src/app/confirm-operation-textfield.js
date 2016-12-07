import React from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  customWidth: {
    width: 250,
  },
};

const TextFieldExampleSimple = (props) => (
  <div>
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      style={ styles.customWidth }
      onChange={ props.onInputChange }
    />
  </div>
);

export default TextFieldExampleSimple;
