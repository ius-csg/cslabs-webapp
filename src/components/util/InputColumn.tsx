import { CSSProperties, FunctionComponent } from 'react';
import {Col, Form} from 'react-bootstrap';

interface Props {
  label: string;
  columnSize?: number;
  hidden?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const InputColumn: FunctionComponent<Props> = ({columnSize, className, hidden, label, children, style}) => {
  return (
    <Form.Group as={Col} sm={columnSize} hidden={hidden} className={className} style={style}>
      <Form.Label column={false} style={{fontSize: 14}}>{label}</Form.Label>
      {children}
    </Form.Group>
  );
};
