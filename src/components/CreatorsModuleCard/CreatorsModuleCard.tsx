import {Button, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import styles from './CreatorsModuleCard.module.scss';
import {Module} from '../../types/Module';
import {WebState} from '../../redux/types/WebState';
import {connect} from 'react-redux';
import {isAuthenticated} from '../../redux/selectors/entities';
import {UserModule} from '../../types/UserModule';
import {getLocalDateTimeString} from '../../util';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';

const url = 'https://iuscsg.org';

interface CreatorsModuleCardProps extends ReturnType<typeof mapStateToProps> {
  module: Module|UserModule;
  buttonLink?: string;
}

class CreatorsModuleCardComponent extends Component<CreatorsModuleCardProps > {

  render() {
    let module: Module = this.props.module as Module;
    if (this.props.module['module'] !== undefined) {
      module = (this.props.module as UserModule).module;
    }
    return (
      <Card border={'primary'} className={styles.card}>
        <Card.Header>
          <Card.Title>{module.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className={styles['card-body']}>
            <div style={{marginBottom: '1rem'}}>
              <b>Published: </b> {`${module.published}`} <br/>
              <b>Module type: </b> {`${module.type}`} <br/>
            </div>
            <Link to={`/module/${module.specialCode}`}>Share Link</Link>
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <small className='text-muted'>{getLocalDateTimeString(module.updatedAt)}</small>
          {<CopyToClipboard text={`Url: ${url}/module/${module.specialCode}`}>
            <button className='btn btn-primary'>copy url</button>
          </CopyToClipboard>}
          {<Button className=''  style={{width: 100}}>Edit</Button>}
        </Card.Footer>
      </Card>
    );
  }


  /*getStartButton() {
    if (this.props.buttonLink) {
      return (
        <Link to={this.props.buttonLink}>
          <Button className='btn btn-primary' style={{width: 200}}>View</Button>
        </Link>
      );
    } else if (this.props.buttonAction) {
      return (<Button onClick={this.props.buttonAction} className='btn btn-primary' style={{width: 200}}>View</Button>);
    } else {
      return null;
    }
  }*/
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const CreatorsModuleCard = connect(mapStateToProps)(CreatorsModuleCardComponent);
