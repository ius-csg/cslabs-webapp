import {Button, Card} from 'react-bootstrap';
import React, {Component} from 'react';
import TestImage from '../../assets/images/TestImage.jpg';
import Styles from './ModuleCard.module.scss';
import {Module} from '../../types/Module';
import {isAuthenticated} from '../../api';

interface ModuleCardProps {
  module: Module;
}

export class ModuleCard extends Component< ModuleCardProps > {

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
    const isAuth = isAuthenticated();
    if (isAuth) {
      return ( <Button className='btn btn-primary' onClick={this.handleClick} style={{width: 200}}> Get Started</Button>);
    } else {
      return null;
    }
  }
}
