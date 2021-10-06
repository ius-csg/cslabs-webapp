import {CardColumns, Row} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {getUserModules} from '../../api';
import {Layout} from '../Layout/Layout';
import {RoutePaths} from '../../router/RoutePaths';
import {UserModule} from '../../types/UserModule';
import SearchBar from 'components/SearchBar/SearchBar';

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

  async loadModules() {
    const modules = await getUserModules();
    this.setState({ modules: modules});
  }

  renderNoModules() {
    return (
      <div style={{textAlign: 'center', marginTop: '2rem'}}>
        <h6>You do not have any modules</h6>
        <p style={{marginTop: '1rem'}}>To get modules, open a link given by your instructor.</p>
      </div>
    );
  }

  loadSearchModules = (arr : UserModule[]) => {
    console.log(this.state.modules);
    if (arr.length != 0) {
        this.setState({modules: arr});
    }
  }

  render() {
      const cards = this.state.modules.map((m, i) => <ModuleCard buttonLink={RoutePaths.userModule.replace(':id', String(m.id))} module={m} key={i}/>);
      return (
        <Layout>
          <Row className='d-flex justify-content-between mb-4'>
            <h1>My Modules</h1>
            <SearchBar showModules={this.loadSearchModules}/>
          </Row>
          {cards.length === 0 ? this.renderNoModules() : <CardColumns>{cards}</CardColumns>}
        </Layout>
      );
  }
}

export default MyModules;
