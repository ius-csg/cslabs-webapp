import React from 'react';
import {Layout} from '../Layout/Layout';
import {getEditorsModules} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {Message} from '../../util/Message';
import {PageTitle} from '../../components/util/PageTitle';
import {Col, Row} from 'react-bootstrap';
import {UserModule} from '../../types/UserModule';
import {CreatorsModuleCard} from '../../components/CreatorsModuleCard/CreatorsModuleCard';
import {RoutePaths} from '../../router/RoutePaths';
import {ButtonLink} from '../../components/util/ButtonLink';
import ModulesFilter from 'components/ModulesSearch/ModulesFilter';
import ModulesSearch from 'components/ModulesSearch/ModulesSearch';

interface ModulesState {
  modules: UserModule[];
  state: 'loading' | 'error' | 'success';
}

class ModulesEditor extends React.Component<{}, ModulesState> {

  state: ModulesState = {
    modules: [],
    state: 'loading'
  };

  componentDidMount(): void {
    this.loadModules();
  }

  loadModules = async () => {
    try {
      const modules = await getEditorsModules();
      this.setState({modules: modules, state: 'success'});
    } catch (_) {
      this.setState({state: 'error'});
    }
  };

  updateUserModules = (modules: UserModule[]) => {
    this.setState({modules: modules, state: 'success'});
  }

  render() {
    const cards = this.state.modules.map((m, i) => 
      <Col key={i} sm={12} md={6} lg={3}>
        <CreatorsModuleCard module={m} key={i} />
      </Col>
    );
    return (
      <Layout>
        {this.state.state === 'loading' ? <HorizontallyCenteredSpinner/> :
          this.state.state === 'error' ?
            <Message state={{message: 'An error occurred, please try again later', variant: 'danger'}}/> :
            <>

              <Row>
                <Col className='d-flex justify-content-start align-items-center'>
                  <PageTitle>My Existing Modules</PageTitle>
                </Col>
                <Col className='d-flex justify-content-end align-items-center'>
                  <ButtonLink to={RoutePaths.NewModule} className='btn btn-primary'>New Module</ButtonLink>
                </Col>
              </Row>
              <hr/>
              <Row className='d-flex justify-content-between mb-4'>
                <Col className='d-flex justify-content-end p-0'>
                  <ModulesFilter modules={this.state.modules} loadModules={this.loadModules} showSortedModules={this.updateUserModules} />
                  <ModulesSearch loadModules={this.loadModules} showSearchedModules={this.updateUserModules} />
                </Col>
              </Row>
              {cards.length === 0 ?
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>No modules published at this time, please come back later.</p> :
                <Row>{cards}</Row>
              }
            </>
        }
      </Layout>
    );
  }
}

export default ModulesEditor;
