import {Row, Col} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Module} from '../../types/Module';
import {getPublicModules} from '../../api';
import {Layout} from '../Layout/Layout';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {Message} from '../../util/Message';
import {PageTitle} from '../../components/util/PageTitle';

interface ExploreState {
  modules: Module[];
  state: 'loading' | 'error' | 'success';
}

class Explore extends React.Component<{}, ExploreState> {

  state: ExploreState = {
    modules: [],
    state: 'loading'
  };

  componentDidMount(): void {
    this.loadModules();
  }

  async loadModules() {
    try {
      const modules = await getPublicModules();
      this.setState({modules: modules.filter(m => !m.disabled), state: 'success'});
    } catch (_) {
      this.setState({state: 'error'});
    }
  }

  render() {
    const cards = this.state.modules.map((m, i) => 
      <Col key={i} className='col-md-6 col-lg-4'>
        <ModuleCard buttonLink={'/module/' + m.id} module={m} key={i}/>
      </Col>);
    return (
      <Layout>
        {this.state.state === 'loading' ? <HorizontallyCenteredSpinner/> :
          this.state.state === 'error' ?
            <Message state={{message: 'An error occurred, please try again later', variant: 'danger'}}/> :
            <>
              <PageTitle>Explore</PageTitle>
              {cards.length === 0 ?
                <p style={{textAlign: 'center', marginTop: '1rem'}}>No modules published at this time, please come back later.</p> :
                <Row className='g-4'>{cards}</Row>
              }

            </>
        }
      </Layout>
    );
  }
}

export default Explore;
