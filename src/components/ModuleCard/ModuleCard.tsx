import {Card} from 'react-bootstrap';
import React from 'react';
import TestImage from '../../assets/images/TestImage.jpg';
import Styles from './ModuleCard.module.scss';

export const ModuleCard = () => (
    <Card className={Styles.card}>
      <Card.Img variant='top' src={TestImage} />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
);
