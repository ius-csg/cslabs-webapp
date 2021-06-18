import React, {useEffect} from 'react';
import Diagram, {createSchema, useSchema } from 'beautiful-react-diagrams';

// the diagram model
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
      inputs: [{ id: 'port-2', alignment: 'right' }],

    },
    {
      id: 'vm-node',
      coordinates: [300, 250],
      render: VmNode,
      inputs: [{ id: '1', alignment: 'left' }],
    },
  ],
  links: [
    { input: 'wan-node', output: 'switch-node', readonly: true },
    { input: 'switch-node', output: 'vm-node' }
  ]
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange, addNode }] = useSchema(initialSchema);

  // // function to remove nodes
  // const deleteNodeFromSchema = (id) => {
  //   const nodeToRemove = schema.nodes.find(node => node.id === id);
  //   removeNode(nodeToRemove);
  // };

  // function to add nodes
  const addNewVM = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: VmNode,
      inputs: [{ id: `${schema.nodes.length}`, alignment: 'left' }], // id must be unique each time for connection to be made
    };
    addNode(nextNode);
  };

  const addNewSwitch = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: SwitchNode,
      inputs: [{ id: `${schema.nodes.length}`, alignment: 'left' }], // id must be unique each time for connection to be made
    };
    schema.links.push({ input: 'wan-node', output: `node-${schema.nodes.length + 1}`, readonly: true })
    addNode(nextNode);
  };

  useEffect(() => {
    console.log(schema);
    console.log(schema.nodes.length);
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
