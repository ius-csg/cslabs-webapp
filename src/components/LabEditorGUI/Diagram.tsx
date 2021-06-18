import React, {useEffect} from 'react';
import Diagram, {createSchema, useSchema } from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';

// initial diagram model
const initialSchema = createSchema({
  nodes: [
    {
      id: 'wan-node',
      coordinates: [250, 60],
      render: WanNode,
      disableDrag: true
    },
    {
      id: 'switch-node',
      coordinates: [250, 170],
      render: SwitchNode,
      inputs: [{ id: 'port-2', alignment: 'right' }]
    }
  ],
  links: [
    { input: 'wan-node', output: 'switch-node', readonly: true }
  ]
});

const UncontrolledDiagram = () => {
  // create diagram schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const addNewVM = () => {
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ],
      render: VmNode,
      data: {onClick: deleteNodeFromSchema},
      inputs: [{ id: `${schema.nodes.length}`, alignment: 'left' }], // id must be unique each time for connection to be made
      outputs: [{ id: `${schema.nodes.length}`, alignment: 'left' }]
    });
  };

  const addNewSwitch = () => {
    // @ts-ignore
    schema.links.push({ input: 'wan-node', output: `node-${schema.nodes.length + 1}`, readonly: true })
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ],
      render: SwitchNode,
      inputs: [{ id: `${schema.nodes.length}`, alignment: 'left' }], // id must be unique each time for connection to be made
    });
  };

  const deleteNodeFromSchema = (id: string) => {
    const nodeToRemove: any = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
  };

  // This use effect hook can be used to get information from the GUI
  useEffect(() => {
    // console.log(schema);
    // console.log(schema.nodes.length);
  }, [schema]);

  return (
    <>
      <div>
        <button onClick={addNewSwitch}>Add Switch</button>
        <button onClick={addNewVM}>Add VM</button>
      </div>
      <div style={{ height: '22.5rem' }}>
        <Diagram schema={schema} onChange={onChange} />
      </div>
    </>
  );
};

export default UncontrolledDiagram;
