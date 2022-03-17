import {Row} from 'react-bootstrap';

export function ListRow(props: { children: any}) {
  return (
    <Row className='g-0' style={{border: '1px solid rgba(0,0,0,.125)', padding: '1rem 1.25rem'}}>
      {props.children}
    </Row>
  );
}
