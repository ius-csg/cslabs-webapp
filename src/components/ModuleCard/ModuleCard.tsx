import {Card} from 'react-bootstrap';
import React from 'react';
import TestImage from '../../assets/images/TestImage.jpg';
import Styles from './ModuleCard.module.scss';
import {Module} from '../../types/Module';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard = (props: ModuleCardProps) => (
    <Card className={Styles.card}>
      <Card.Img variant='top' src={TestImage} />
      <Card.Body>
        <Card.Title>{props.module.name}</Card.Title>
        <Card.Text style={{height: 105, textOverflow: 'ellipsis', overflow: 'hidden'}}>
          <p>{props.module.description.substring(0, 150)}</p>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>{props.module.updatedAt}</small>
      </Card.Footer>
    </Card>
);
