import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';

class Explore extends React.Component {
  render() {
      const rows = [];
      for (let i = 0; i < 6; i++ ) {
        rows.push(<ModuleCard key={i}/>);
      }
      return <CardColumns>{rows}</CardColumns>;
  }
}
export default Explore;
