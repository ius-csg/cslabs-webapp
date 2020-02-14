import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Module} from '../../types/Module';
import {getPublicModules} from '../../api';
import {Layout} from '../Layout/Layout';

interface ExploreState {
  modules: Module[];
}

class Explore extends React.Component<{}, ExploreState> {

  state: ExploreState = {
    modules: []
  };

  componentDidMount(): void {
    this.loadModules();
  }

  async loadModules() {
    const modules = await getPublicModules();
    this.setState({ modules: modules});
  }

  render() {
      const cards = this.state.modules.map((m, i) => <ModuleCard buttonLink={'/module/' + m.id} module={m} key={i}/>);
      return (
        <Layout>
          <h1>Welcome To CSG LABS</h1>
          <CardColumns>{cards}</CardColumns>
        </Layout>
      );
  }
}

export default Explore;
