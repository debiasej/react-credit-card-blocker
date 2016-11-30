import React from 'react';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {green300, indigo900} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
};

class InfoChip extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <Chip
          backgroundColor={green300}
          style={styles.chip}
        >
          Unblocked!
        </Chip>
      </div>
    );
  }
}

export default InfoChip;
