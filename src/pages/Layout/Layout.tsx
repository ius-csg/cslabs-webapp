import React from 'react';
import {Container} from 'react-bootstrap';

export const Layout = (props: any) => (
  <Container style={{marginTop: 20}}>
    {props.children}
  </Container>
);
