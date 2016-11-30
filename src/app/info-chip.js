import React from 'react';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {green500, red500, white} from 'material-ui/styles/colors';

const styles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'inline-block',
    float: 'right',
    margin: '12px 15px 0px 0px'
  },
};

class InfoChip extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {

    const cardState = this.props.chipState == "unblocked" ? green500 : red500;

    return (
      <div style={styles.wrapper}>
        <Chip
          labelColor={ white }
          backgroundColor={ cardState }
          style={styles.chip}
        >
        {this.props.chipState }
        </Chip>
      </div>
    );
  }
}

export default InfoChip;
