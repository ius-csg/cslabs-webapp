import {Button, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import TestImage from '../../assets/images/TestImage.jpg';
import Styles from './ModuleCard.module.scss';
import {Module} from '../../types/Module';
import {WebState} from '../../redux/types/WebState';
import {connect} from 'react-redux';
import {isAuthenticated} from '../../redux/selectors/entities';

interface ModuleCardProps extends ReturnType<typeof mapStateToProps> {
  module: Module;
}

class ModuleCardComponent extends Component<ModuleCardProps > {

  handleClick = () => {
    window.location.assign ('/module/' + this.props.module.id);
  };

  render() {
    return (
      <Card className={Styles.card}>
        <Card.Img variant='top' src={TestImage}/>
        <Card.Body>
          <Card.Title>{this.props.module.name}</Card.Title>
          <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
            {this.props.module.description.substring(0, 150)}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>{this.props.module.updatedAt}</small>
          {this.getStartButton()}
        </Card.Footer>
      </Card>
    );
  }

  getStartButton() {
    if (this.props.authenticated) {
      return ( <Button className='btn btn-primary' onClick={this.handleClick} style={{width: 200}}>Get Started</Button>);
    } else {
      return null;
    }
  }
}
const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});
export const ModuleCard = connect(mapStateToProps)(ModuleCardComponent);
