import React, {Component} from 'react';
import {Module} from '../../types/Module';
import {getPublicModule} from '../../api';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {RouteComponentProps} from 'react-router';

interface MyModuleState {
  module?: Module;
}

interface PublicModuleProps extends RouteComponentProps<{id: string}> {}

class PublicModule extends Component<PublicModuleProps, MyModuleState > {

  state: MyModuleState = {};

  constructor(props: PublicModuleProps) {
    super(props);
    const id = Number(props.match.params.id);
    this.loadModule(id);
  }

  async loadModule(id: number) {
    const module = await getPublicModule(id);
    this.setState({ module: module});
  }

  render() {
    return (
      <div>
        {this.state.module ? <ModuleCard module={this.state.module} /> : null}
      </div>
    );
  }
}

export  default PublicModule;
