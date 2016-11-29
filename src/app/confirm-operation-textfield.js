import React from 'react';
import TextField from 'material-ui/TextField';

const styles = {
  customWidth: {
    width: 250,
  },
};

const TextFieldExampleSimple = () => (
  <div>
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      style={styles.customWidth}
    />
  </div>
);

export default TextFieldExampleSimple;
