import {Button, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import Styles from './ModuleCard.module.scss';
import {Module} from '../../types/Module';
import {WebState} from '../../redux/types/WebState';
import {connect} from 'react-redux';
import {isAuthenticated} from '../../redux/selectors/entities';
import {Link} from 'react-router-dom';
import {UserModule} from '../../types/UserModule';
import {getLocalDateTimeString} from '../../util';

interface ModuleCardProps extends ReturnType<typeof mapStateToProps> {
  module: Module|UserModule;
  buttonLink?: string;
  buttonAction?: () => void;
}

class ModuleCardComponent extends Component<ModuleCardProps > {


  render() {
    let module: Module = this.props.module as Module;
    if (this.props.module['module'] !== undefined) {
      module = (this.props.module as UserModule).module;
    }
    return (
      <Card className={Styles.card}>
        {/*<Card.Img variant='top' src={TestImage}/>*/}
        <Card.Body>
          <Card.Title>{module.name} {(module.disabled ? '(disabled)' : '')}</Card.Title>
          <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {module.description.substring(0, 150)}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <small className='text-muted'>{getLocalDateTimeString(module.updatedAt)}</small>
          {this.getStartButton()}
        </Card.Footer>
      </Card>
    );
  }

  getStartButton() {
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
  }
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const ModuleCard = connect(mapStateToProps)(ModuleCardComponent);
