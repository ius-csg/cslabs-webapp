import React from 'react';
import { ExpansionList, ExpansionPanel } from 'react-md';

const Policy = () => (
  <ExpansionList className='test'>
    <ExpansionPanel label='Another label'>
      <p>This is a test</p>
    </ExpansionPanel>
  </ExpansionList>
);

export default Policy;
