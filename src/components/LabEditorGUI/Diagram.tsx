import React, { useEffect, useState} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import useKeyPress from '../../hooks/useKeyboardShortcut';

// initial diagram model
const initialSchema = createSchema({});
let activeNode = '';

function setActiveNode(id: string) {
  activeNode = id;
}

const UncontrolledDiagram = () => {

  // const [activeNode, setActiveNode] = useState<string>('none');

  const handleKeyboardShortcut = () => {
    if (activeNode !== '') {
      deleteNodeFromSchema(activeNode);
    }
    activeNode = '';
  };

  const makeNodeActive = (id: string) => {
    setActiveNode(id.toString());
  };

  useKeyPress('Backspace', handleKeyboardShortcut);
  useKeyPress('Delete', handleKeyboardShortcut);

  // useEffect(() => {
  //   console.log(activeNode);
  // }, [activeNode]);

  // create diagram schema
  const [schema, {onChange, addNode, removeNode}] = useSchema(initialSchema);

  const addNewVM = () => {
    // Handles starting location if this is the first node created
    let startingCoords: any;
    if (schema.nodes.length === 0) {
      startingCoords = [250, 60];
    } else {
      startingCoords = [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ];
    }
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: startingCoords,
      render: VmNode,
      data: {onClick: deleteNodeFromSchema, setActiveNode: makeNodeActive},
      inputs: [{id: `${schema.nodes.length}`}, {id: `second${schema.nodes.length}`}] // id must be unique each time for connection to be made
    });
  };

  const addNewSwitch = () => {
    let startingCoords: any;
    if (schema.nodes.length === 0) {
      startingCoords = [250, 60];
    } else {
      startingCoords = [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ];
      // // @ts-ignore
      // schema.links.push({ input: 'wan-node', output: `node-${schema.nodes.length + 1}`, readonly: true });
    }
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: startingCoords,
      render: SwitchNode,
      data: {setActiveNode: setActiveNode},
      inputs: [{id: `${schema.nodes.length}-in`}], // id must be unique each time for connection to be made
      outputs: [{id: `${schema.nodes.length}-out`}, {id: `second${schema.nodes.length}-out`}]
    });
  };

  const deleteNodeFromSchema = (id: string) => {
    const nodeToRemove: any = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
  };

  const [internetConnection, toggleInternetConnection] = useState(false);

  useEffect(() => {
    if (internetConnection === true) {
      addNode({
        id: 'wan-node',
        content: `Node ${schema.nodes.length + 1}`,
        coordinates: [250, 30],
        render: WanNode,
        data: {onClick: deleteNodeFromSchema},
        outputs: [{id: 'wan-output'}],
        disableDrag: true
      });
    } else if (internetConnection === false && schema.nodes.find(node => node.id === 'wan-node') !== undefined) {
      const nodeToRemove: any = schema.nodes.find(node => node.id === 'wan-node');
      removeNode(nodeToRemove);
    }
  }, [internetConnection]);

  // This use effect hook can be used to get information from the GUI
  useEffect(() => {
    // console.log(schema);
    // console.log(schema.nodes.length);
  }, [schema]);

  return (
    <>
      <div>
        <label>
          Should this lab have a connection to the internet?
          <input type="checkbox" id="internet-connection" name="internet-connection"
                 onChange={() => toggleInternetConnection(!internetConnection)}/>
        </label>
      </div>
      <div>
        <button onClick={addNewSwitch}>Add Switch</button>
        <button onClick={addNewVM}>Add VM</button>
      </div>
      <div style={{height: '50vh'}}>
        <Diagram schema={schema} onChange={onChange}/>
      </div>
    </>
  );
};

export default UncontrolledDiagram;
