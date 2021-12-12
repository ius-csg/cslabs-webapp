import {Row, Col} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Module} from '../../types/Module';
import {getPublicModules, searchModules} from '../../api';
import {Layout} from '../Layout/Layout';
import {HorizontallyCenteredSpinner} from '../../components/util/HorizonallyCenteredSpinner';
import {Message} from '../../util/Message';
import {PageTitle} from '../../components/util/PageTitle';
import SearchBar from '../../components/SearchBar/SearchBar';

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
      this.setState({modules: modules, state: 'success'});
    } catch (_) {
      this.setState({state: 'error'});
    }

  }

  loadSearchModules = async (searchValue: string) => {
    try {
      let response = searchValue.length !== 0 ? await searchModules(searchValue) : await getPublicModules();
      this.setState({modules: response, state: 'success'});
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
              <Row className='d-flex justify-content-between mb-4'>
                <PageTitle >Explore</PageTitle>
                <SearchBar showModules={this.loadSearchModules}/>
              </Row>
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
