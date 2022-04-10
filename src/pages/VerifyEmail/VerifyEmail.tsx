import {Component, default as React} from 'react';
import {RouteComponentProps} from 'react-router';
import {verifyEmail} from '../../api';
import {Spinner} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';

interface Params {
  code: string;
}

interface VerifyEmailProps extends RouteComponentProps<Params>{

}

interface State {
  loading: boolean;
  verified?: boolean;
}

export class VerifyEmail extends Component<VerifyEmailProps, State> {

  state: State = {
    loading: true
  };

  async componentDidMount() {
    const {code} = this.props.match.params;
    try {
      await verifyEmail(code);
      this.setState({
        loading: false,
        verified: true
      });
    } catch {
      this.setState({
        loading: false,
        verified: false
      });
    }
  }

  renderInner() {
    if (this.state.loading) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3rem'}}>
          <Spinner animation='border'/>
        </div>
      );
    }
    return (
      <p style={{textAlign: 'center', marginTop: '3rem'}}>
        {this.state.verified ? 'Your email has successfully been verified!': 'Sorry, we could not verify your email at this time.'}
      </p>
    );
  }

  render() {
    return <Layout isEmailVerificationPage={true}>
      {this.renderInner()}
    </Layout>;
  }

}
