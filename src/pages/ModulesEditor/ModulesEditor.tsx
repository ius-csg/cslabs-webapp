import React from 'react';
import {Layout} from '../Layout/Layout';
import {getEditorsModules} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {Message} from '../../util/Message';
import {PageTitle} from '../../components/util/PageTitle';
import {CardColumns, Col, Row} from 'react-bootstrap';
import {UserModule} from '../../types/UserModule';
import {CreatorsModuleCard} from '../../components/CreatorsModuleCard/CreatorsModuleCard';
import {RoutePaths} from '../../router/RoutePaths';
import {ButtonLink} from '../../components/util/ButtonLink';

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

  async loadModules() {
    try {
      const modules = await getEditorsModules();
      this.setState({modules: modules, state: 'success'});
    } catch (_) {
      this.setState({state: 'error'});
    }
  }

  render() {
    const cards = this.state.modules.map((m, i) => <CreatorsModuleCard module={m} key={i}/>);
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
                <CardColumns>{cards}</CardColumns>
              }
            </>
        }
      </Layout>
    );
  }
}

export default ModulesEditor;
