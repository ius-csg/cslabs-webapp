import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Module} from '../../types/Module';
import {getPublicModules} from '../../api';

interface ExploreState {
  modules: Module[];
}

class Explore extends React.Component<{}, ExploreState> {

  state: ExploreState = {
    modules: []
  };

  constructor(props: {}) {
    super(props);
    this.loadModules();
  }

  async loadModules() {
    const modules = await getPublicModules();
    this.setState({ modules: modules});
  }

  render() {
      const cards = this.state.modules.map((m, i) => <ModuleCard module={m} key={i}/>);
      return (
        <div>
          <h1>Welcome</h1>
          <CardColumns>{cards}</CardColumns>
        </div>
      );
  }
}

export default Explore;
