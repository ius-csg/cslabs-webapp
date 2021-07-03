import React, {useEffect, useState} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import changeSelected, {changeSelectedNode} from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
import SelectSwitch from './SelectSwitch';


// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({nodeToDelete, setNodeToDelete}:any) => {

  const [selectSwitchVisible, setSelectSwitchVisible] = useState(false);

  const selectedNode = useSelector((state: any) => state.gui.selectedID);
  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (schema.nodes.find(node => node.id === nodeToDelete && e.target.toString() !== '[object HTMLInputElement]')){
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
    if (selectedNode.selectedID !== 'none') {
      dispatch(changeSelected({selectedID: 'none'}));
    }
  };
  // create diagram schema
  const [schema, {onChange, addNode, removeNode}] = useSchema(initialSchema);

  // Handles starting location if this a node is the first in schema to be created
  const handleFirstNode = (schemaSize: number) => {
    let startingCoords: any;
    if (schemaSize === 0) {
      startingCoords = [250, 60];
    } else {
      startingCoords = [
        Number(schema.nodes[schemaSize - 1].coordinates[0] + 100),
        Number(schema.nodes[schemaSize - 1].coordinates[1])
      ];
    }
    return startingCoords;
  };

  const addNewVM = () => {
    const startingCoords = handleFirstNode(schema.nodes.length);

    addNode({
      id: `vm-node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: startingCoords,
      render: VmNode,
      data: {Delete: deleteNodeFromSchema, Duplicate: duplicateNode, Select: selectNode},
      inputs: [{id: `first-${schema.nodes.length}`}, {id: `second-${schema.nodes.length}`}, {id: `third-${schema.nodes.length}`}, {id: `fourth-${schema.nodes.length}`}] // id must be unique each time for connection to be made
    });
  };

  const addNewSwitch = (ports: number) => {
    const totalPortsOut = [];
    const totalPortsIn = [];
    if (ports === 5) {
      totalPortsIn.push({id: `1-${schema.nodes.length}-in`}, {id: `2-${schema.nodes.length}-in`});
      for (let port = 0; port < (ports); port++) {
        totalPortsOut.push({id: `${port}-${schema.nodes.length}-out`});
      }
    }
    else {
      for (let port = 0; port < (ports/2); port++) {
        totalPortsOut.push({id: `${port}-${schema.nodes.length}-out`});
        totalPortsIn.push({id: `${port}-${schema.nodes.length}-in`});
      }
    }

    const startingCoords = handleFirstNode(schema.nodes.length);

    addNode({
      id: `switch-node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: startingCoords,
      render: SwitchNode,
      data: {Delete: deleteNodeFromSchema, Duplicate: duplicateNode},
      inputs: totalPortsIn,
      outputs: totalPortsOut
    });
  };

  const deleteNodeFromSchema = (id: string) => {
    const nodeToRemove: any = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
  };

  const duplicateNode = (id: string) => {
    const nodeToDuplicate: any = schema.nodes.find(node => node.id === id);
    const inputs: any = [];
    if (nodeToDuplicate.inputs) {
      for (const i of nodeToDuplicate.inputs) {
        inputs.push({id: `${i.id}${schema.nodes.length}-in`});
      }
    }

    const outputs: any = [];
    if (nodeToDuplicate.outputs) {
      for (const i of nodeToDuplicate.outputs) {
        outputs.push({id: `${i.id}${schema.nodes.length}-out`});
      }
    }

    addNode({
      id: `${nodeToDuplicate.id}-duplicate${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ],
      render: nodeToDuplicate.render,
      data: nodeToDuplicate.data,
      inputs: inputs,
      outputs: outputs
    });
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

    // Prevents having more than one connection per port
    const portsInUse: any = [];
    let count = 0;
    if (schema.links) {
      for (const port of schema.links) {
        if (portsInUse.includes(port.input) || portsInUse.includes(port.output)) {
          schema.links.splice(count, 1);
        }
        portsInUse.push(port.input);
        portsInUse.push(port.output);
        count ++;
      }
    }

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
        <button onClick={() => setSelectSwitchVisible(true)}>Add Switch</button>
        <button onClick={addNewVM}>Add VM</button>
      </div>
      <div style={{height: '50vh', zIndex:-1}} onClick={unSelectNode}>
        {selectSwitchVisible && <SelectSwitch addSwitch={addNewSwitch} close={() => setSelectSwitchVisible(false)}/>}
        <Diagram schema={schema} onChange={onChange}/>
      </div>
    </>
  );
};

export default UncontrolledDiagram;
