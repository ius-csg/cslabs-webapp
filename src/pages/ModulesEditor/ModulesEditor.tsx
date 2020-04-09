import React from 'react';
import {Layout} from '../Layout/Layout';
import {getEditorsModules} from '../../api';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {Message} from '../../util/Message';
import {PageTitle} from '../../components/util/PageTitle';
import {CardColumns} from 'react-bootstrap';
import {UserModule} from '../../types/UserModule';
import {CreatorsModuleCard} from '../../components/CreatorsModuleCard/CreatorsModuleCard';

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
              <PageTitle>My Existing Modules</PageTitle>
              <button className='btn btn-primary'>New Module</button>
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
