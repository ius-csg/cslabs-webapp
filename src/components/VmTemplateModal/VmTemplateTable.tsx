import {Table} from 'react-bootstrap';
import * as React from 'react';
import {VmTemplate} from '../../types/editorTypes';

interface Props {
  templates: VmTemplate[];
  onSelect: (vmTemplateId: number) => void;
}

export function VmTemplateTable({templates, onSelect}: Props) {
  return (
    <Table striped={true} bordered={true} hover={true}>
      <thead>
      <tr>
        <th>Name</th>
        <th>Published</th>
      </tr>
      </thead>
      <tbody>
      {templates.map((template, index) => (
        <tr key={index} onClick={() => onSelect(template.id)} style={{cursor: 'pointer'}}>
          <td>{template.name}</td>
          <td>{template.published ? 'Yes' : 'No'}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
