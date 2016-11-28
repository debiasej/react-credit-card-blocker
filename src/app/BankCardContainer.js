import React from 'react';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CardSelector from './CardSelector.js';

const BankCardContainer = () => (
  <Card>
    <CardTitle title="Select a card" />
    <CardActions>
      <CardSelector />
      <FlatButton label="Continue" />
    </CardActions>
  </Card>
);

export default BankCardContainer;
