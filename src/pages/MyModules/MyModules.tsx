import {Row, Col} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {getUserModules} from '../../api';
import {Layout} from '../Layout/Layout';
import {RoutePaths} from '../../router/RoutePaths';
import {UserModule} from '../../types/UserModule';
import ModulesSearch from 'components/ModulesSearch/ModulesSearch';
import {PageTitle} from 'components/util/PageTitle';
import ModulesFilter from 'components/ModulesSearch/ModulesFilter';

interface MyModulesState {
  modules: UserModule[];
}

class MyModules extends React.Component<{}, MyModulesState> {

  state: MyModulesState = {
    modules: []
  };

  constructor(props: {}) {
    super(props);
    this.loadModules();
  }

  loadModules = async () => {
    const modules = await getUserModules();
    this.setState({modules: modules});
  };

  renderNoModules() {
    return (
      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <h6>You do not have any modules</h6>
        <p style={{marginTop: '1rem'}}>To get modules, open a link given by your instructor.</p>
      </div>
    );
  }

  updateModules = (modules: UserModule[]) => {
    this.setState({modules: modules});
  }

  render() {
    const cards = this.state.modules.map((m, i) =>
      <Col key={i} sm={12} md={6} lg={4}>
        <ModuleCard buttonLink={RoutePaths.userModule.replace(':id', String(m.id))} module={m} key={i} />
      </Col>
    );
    return (
      <Layout>
        <Row className='d-flex justify-content-between mb-4'>
          <PageTitle >My Modules</PageTitle>
          <Col className='d-flex justify-content-end p-0'>
            <ModulesFilter modules={this.state.modules} loadModules={this.loadModules} showSortedModules={this.updateModules}/>
            <ModulesSearch loadModules={this.loadModules} showSearchedModules={this.updateModules} />
          </Col>
        </Row>
        {cards.length === 0 ? this.renderNoModules() : <Row className='g-4'>{cards}</Row>}
      </Layout>
    );
  }
}

export default MyModules;
