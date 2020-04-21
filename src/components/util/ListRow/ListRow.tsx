import {Row} from 'react-bootstrap';
import React from 'react';

export function ListRow(props: { children: any}) {
  return (
    <Row noGutters={true} style={{border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1.25rem'}}>
      {props.children}
    </Row>
  );
}
