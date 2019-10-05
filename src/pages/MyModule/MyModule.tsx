import {CardColumns} from 'react-bootstrap';
import React from 'react';
import {getPrivateModules} from '../../api';
import {Module} from '../../types/Module';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';

interface MyModuleState {
  myModules: Module[];
}

class MyModule extends React.Component {

  state: MyModuleState = {
    myModules: []
  };

  constructor(props: {}) {
    super(props);
    this.loadModules();
  }

  async loadModules() {
    const modules = await getPrivateModules();
    this.setState({ myModules: modules});
  }

  render() {
    // const rows = [];
    // for (let i = 0; i < 3; i++ ) {
    //   rows.push(<ModuleCard module={ key={i}/>);
    // }
    const cards = this.state.myModules.map((m, i) => <ModuleCard module={m} key={i}/>);
    return (
      <div>
        <h1>My Modules</h1>
        <CardColumns>{cards}</CardColumns>
      </div>
    );
  }
}
export default MyModule;
