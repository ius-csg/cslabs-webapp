import {Card} from 'react-bootstrap';
import React, {Component} from 'react';
import styles from './CreatorsModuleCard.module.scss';
import {getModuleShareLink, Module} from '../../types/Module';
import {WebState} from '../../redux/types/WebState';
import {connect} from 'react-redux';
import {isAuthenticated} from '../../redux/selectors/entities';
import {UserModule} from '../../types/UserModule';
import {getLocalDateTimeString} from '../../util';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import {IconButton} from '../util/IconButton/IconButton';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {RoutePaths} from '../../router/RoutePaths';
import {ButtonLink} from '../util/ButtonLink';

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
            <Link style={{marginRight: '0.5rem'}} to={`/module/${module.specialCode}`}>Share Link</Link>
            {<CopyToClipboard text={getModuleShareLink(module.specialCode)}>
              <IconButton icon={faCopy} />
            </CopyToClipboard>}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <small className='text-muted'>{getLocalDateTimeString(module.updatedAt)}</small>
            <ButtonLink to={RoutePaths.EditModule.replace(':uuid', module.specialCode)} style={{width: 100}}>View</ButtonLink>
        </Card.Footer>
      </Card>
    );
  }
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const CreatorsModuleCard = connect(mapStateToProps)(CreatorsModuleCardComponent);
