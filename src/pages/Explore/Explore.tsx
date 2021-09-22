import {CardColumns, Row} from 'react-bootstrap';
import React from 'react';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {Module} from '../../types/Module';
import {getPublicModules} from '../../api';
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

  loadSearchModules = (arr : Module[]) => {
    console.log(this.state.modules);
    if (arr.length != 0) {
        this.setState({modules: arr, state: 'success'});
    }
  }

  render() {
    const cards = this.state.modules.map((m, i) => <ModuleCard buttonLink={'/module/' + m.id} module={m} key={i}/>);
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
                <CardColumns>{cards}</CardColumns>}
            </>
        }
      </Layout>
    );
  }
}

export default Explore;
