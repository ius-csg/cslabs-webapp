import React, {Component} from 'react';
import {Module} from '../../types/Module';
import {getPrivateModule, getPublicModule, startUserModule} from '../../api';
import {ModuleCard} from '../../components/ModuleCard/ModuleCard';
import {RouteComponentProps} from 'react-router';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {Layout} from '../Layout/Layout';

interface MyModuleState {
  module?: Module;
  message?: string;
  redirectUrl?: string;
  starting?: boolean;
}

type PublicModuleProps = RouteComponentProps<{id: string}> & ReturnType<typeof mapStateToProps>;

class PublicModule extends Component<PublicModuleProps, MyModuleState > {

  state: MyModuleState = {};

  constructor(props: PublicModuleProps) {
    super(props);

  }
  async componentDidMount() {
    try {
      if (isNaN(Number(this.props.match.params.id))) {
        console.log("getting private module");
        this.setState({ module: await getPrivateModule(this.props.match.params.id)});
      } else {
        this.setState({ module: await getPublicModule(Number(this.props.match.params.id))});
      }
    } catch (e) {
      this.setState({message: 'Could not load module'});
    }

  }

  startModule = async () => {
    if (this.state.module !== undefined) {
      this.setState({starting: true});
      await startUserModule(this.state.module.specialCode);
      // this.setState({redirectUrl: RoutePaths.userModule.replace(':id', String(userModule.id))});
    }
  };

  render() {
    if (this.state.redirectUrl) {
      return <Link to={this.state.redirectUrl} />;
    }
    if (!this.props.authenticated) {
      return <Link to={RoutePaths.login} />;
    }
    return (
      <Layout>
        <h5 style={{textAlign: 'center'}}>{this.state.message ? this.state.message : null}</h5>
        { this.state.starting ? <h5>Your lab is starting, please check back in 5 minutes. and got to the my modules page.</h5> :
          (
            this.state.module ? <ModuleCard buttonAction={this.startModule} module={this.state.module} /> : null
          )}
      </Layout>
    );
  }
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(PublicModule);
