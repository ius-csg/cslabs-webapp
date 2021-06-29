import React, {useEffect, useState} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import changeSelected, {changeSelectedNode} from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';


// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({nodeToDelete, setNodeToDelete}:any) => {

  const selectedNode = useSelector((state: any) => state.gui.selectedID);
  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (schema.nodes.find(node => node.id === nodeToDelete)){
        deleteNodeFromSchema(nodeToDelete);
      }
    }
  };

  useEffect(() => {
    setNodeToDelete(selectedNode);
  }, [selectedNode]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const dispatch = useDispatch();

  const selectNode = (id: string) => {
    dispatch(changeSelectedNode({selectedID: id}));
  };


  const unSelectNode = () => {
    if (selectedNode.selectedID === 'none') {
      dispatch(changeSelected({selectedID: 'none'}));
    }
  };
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
      data: {onClick: deleteNodeFromSchema, Select: selectNode},
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
    }
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: startingCoords,
      render: SwitchNode,
      data: {onClick: deleteNodeFromSchema},
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
          <input
            type='checkbox'
            id='internet-connection'
            name='internet-connection'
            onChange={() => toggleInternetConnection(!internetConnection)}
          />
        </label>
      </div>
      <div>
        <button onClick={addNewSwitch}>Add Switch</button>
        <button onClick={addNewVM}>Add VM</button>
      </div>
      <div style={{height: '50vh', zIndex:-1}} onClick={unSelectNode}>
        <Diagram schema={schema} onChange={onChange}/>
      </div>
      <button onClick={()=> deleteNodeFromSchema('node-1')}>delete Test</button>
    </>
  );
};

export default UncontrolledDiagram;
