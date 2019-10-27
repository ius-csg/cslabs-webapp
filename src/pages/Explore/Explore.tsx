import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Layout} from '../Layout/Layout';

class Explore extends React.Component {
  render() {
      const rows = [];
      for (let i = 0; i < 9; i++ ) {
        rows.push(<ModuleCard key={i}/>);
      }
      return (
        <Layout>
          <CardColumns>{rows}</CardColumns>
        </Layout>
      );
  }
}
export default Explore;
