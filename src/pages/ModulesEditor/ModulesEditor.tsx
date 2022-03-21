import { Component } from 'react';
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

interface ModulesState {
  modules: UserModule[];
  state: 'loading' | 'error' | 'success';
}

class ModulesEditor extends Component<{}, ModulesState> {

  state: ModulesState = {
    modules: [],
    state: 'loading'
  };

  componentDidMount(): void {
    this.loadModules();
  }

  async loadModules() {
    try {
      const modules = await getEditorsModules();
      this.setState({modules: modules, state: 'success'});
    } catch (_) {
      this.setState({state: 'error'});
    }
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
              {cards.length === 0 ?
                <p style={{textAlign: 'center', marginTop: '1rem'}}>You currently have no modules</p> :
                <Row className='g-4'>{cards}</Row>
              }
            </>
        }
      </Layout>
    );
  }
}

export default ModulesEditor;
