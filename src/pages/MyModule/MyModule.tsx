import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';

class MyModule extends React.Component {
  render() {
    const rows = [];
    for (let i = 0; i < 3; i++ ) {
      rows.push(<ModuleCard key={i}/>);
    }
    return <CardColumns>{rows}</CardColumns>;
  }
}
export default MyModule;
