import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {ToggleButton} from 'react-bootstrap';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import changeSelected from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
import SelectSwitch from './SelectSwitch';
import ContextContainer from './ContextContainer';

// tslint:disable-next-line:no-import-side-effect
import './Link.scss';


// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({ menuType, setMenuType, textBoxPosition, setTextBoxPosition, nodeToRename, setNodeToRename}:any) => {

  let rect: any = null;
  useEffect(() => {
    // @ts-ignore
    rect = document.getElementById('diagram').getBoundingClientRect();
  });


  const [selectSwitchVisible, setSelectSwitchVisible] = useState(false);
  const [renameTextBox, toggleRenameTextBox] = useState(false);
  const [newNodeName, setNewNodeName] = useState<any>('');
  const [internetConnection, toggleInternetConnection] = useState(false);
  const [deletingNode, setDeletingNode] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [schemaState, setSchemaState] = useState({
    past: [],
    present: [Object.assign({}, initialSchema)],
    future: []
  });

  const selectedNode = useSelector((state: any) => state.gui.selectedID);

  // For undo redo state
  const updateSchemaState = (operation: string) => {
    const newSchemaState = schemaState;
    switch (operation) {
      case 'undo':
        console.log();
      case 'redo':
        console.log();
      case 'update':

        // @ts-ignore
        newSchemaState.past.push(schemaState.present[0]);
        newSchemaState.present[0] = Object.assign({}, schema);
    }
    setSchemaState(newSchemaState);
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (schema.nodes.find(node => node.id === selectedNode && e.target.toString() !== '[object HTMLInputElement]')) {
        deleteNodeFromSchema(selectedNode);
      }
    } else if (e.which === 90 && e.ctrlKey) {
      if (e.shiftKey) {
        console.log('redo');
      } else {
        console.log('undo');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const dispatch = useDispatch();

  const unSelect = (e: any) => {
    if (selectedNode !== 'none' && e.target.toString() !== '[object HTMLInputElement]') {
      dispatch(changeSelected({selectedID: 'none'}));
      if (renameTextBox === true) {
        handleSubmit();
        toggleRenameTextBox(false);
      }
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

    const newNodeCount = nodeCount + 1;
    setNodeCount(newNodeCount);

    addNode({
      id: `vm-node-${nodeCount}`,
      content: `Node ${nodeCount}`,
      coordinates: startingCoords,
      render: VmNode,
      inputs: [{id: `vm-node-${nodeCount}-port1`}, {id: `vm-node-${nodeCount}-port2`}, {id: `vm-node-${nodeCount}-port3`}, {id: `vm-node-${nodeCount}-port4`}] // id must be unique each time for connection to be made
    });
  };

  const addNewSwitch = (ports: number) => {
    const newNodeCount = nodeCount + 1;
    setNodeCount(newNodeCount);
    const totalPortsOut = [];
    const totalPortsIn = [];
    if (ports === 5) {
      totalPortsIn.push({id: `switch-node-${nodeCount}-port1`}, {id: `switch-node-${nodeCount}-port2`});
      for (let port = 2; port < (ports); port++) {
        totalPortsOut.push({id: `switch-node-${nodeCount}-port${port}`});
      }
    } else {
      for (let port = 0; port < (ports / 2); port++) {
        totalPortsOut.push({id: `switch-node-${nodeCount}-port${port}-in`});
        totalPortsIn.push({id: `switch-node-${nodeCount}-port${port}-out`});
      }
    }

    const startingCoords = handleFirstNode(schema.nodes.length);

    addNode({
      id: `switch-node-${nodeCount}`,
      content: `Node ${nodeCount}`,
      coordinates: startingCoords,
      render: SwitchNode,
      inputs: totalPortsIn,
      outputs: totalPortsOut
    });
  };

  const deleteNodeFromSchema = (id: string) => {
    setDeletingNode(true);
    const nodeToRemove: any = schema.nodes.find(node => node.id === id);
    // Manually remove all connections involving the node before deleting
    // This prevents an error when deleting the last node of a connection between the same types of nodes
    let count = 0;
    if (schema.links) {
      for (const link of schema.links) {
        if (link.input.includes(id) || link.output.includes(id)) {
          schema.links.splice(count, 1);
        }
        count++;
      }
    }
    removeNode(nodeToRemove);
    setDeletingNode(false);
  };

  const duplicateNode = (id: string) => {
    const nodeToDuplicate: any = schema.nodes.find(node => node.id === id);
    const inputs: any = [];
    let name = '';
    if (id.includes('vm')) {
      name = 'vm-node';
    }
    else if (id.includes('switch')) {
      name = 'switch-node';
    }

    if (nodeToDuplicate.inputs) {
      for (let i = 0; i < nodeToDuplicate.inputs.length; i++) {
        inputs.push({id: `${name}-${schema.nodes.length + 1}-port${i+1}`});
      }
    }

    const outputs: any = [];
    if (nodeToDuplicate.outputs) {
      for (let i = 0; i < nodeToDuplicate.outputs.length; i++) {
        outputs.push({id: `${name}-${schema.nodes.length + 1}-port${i+1}`});
      }
    }

    addNode({
      id: `${name}-${schema.nodes.length + 1}`,
      content: nodeToDuplicate.content,
      coordinates: [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ],
      render: nodeToDuplicate.render,
      inputs: inputs,
      outputs: outputs
    });
  };

  useEffect(() => {
    if (internetConnection === true) {
      addNode({
        id: 'wan-node',
        content: `Node ${schema.nodes.length + 1}`,
        coordinates: [250, 30],
        render: WanNode,
        outputs: [{id: 'wan-output'}],
        disableDrag: true
      });
    } else if (internetConnection === false && schema.nodes.find(node => node.id === 'wan-node') !== undefined) {
        deleteNodeFromSchema('wan-node');
    }
  }, [internetConnection]);

  // This use effect hook can be used to get information from the GUI
  useEffect(() => {
    console.log(schema);
    const portsInUse: any = [];
    let count = 0;
    if (schema.links) {
      for (const port of schema.links) {
        // Prevents having more than one connection per port
        if (portsInUse.includes(port.input) || portsInUse.includes(port.output)) {
          schema.links.splice(count, 1);
        }
        // Prevents connecting two ports on same node
        if (port.input.includes(port.output.slice(0, 14)) === true) {
          schema.links.splice(count, 1);
        }
        // Prevents two nodes from connecting more than once
        for (let i = 0; i < portsInUse.length; i+=2) {
          if (portsInUse[i].includes(port.input.slice(0, 14)) && portsInUse[i+1].includes(port.output.slice(0, 14)) ||
            portsInUse[i+1].includes(port.input.slice(0, 14)) && portsInUse[i].includes(port.output.slice(0, 14))) {
            schema.links.splice(count, 1);
          }
        }
        portsInUse.push(port.input);
        portsInUse.push(port.output);
        count++;
      }
    }
    updateSchemaState('update');
  }, [schema]);


  // Handles different colors for links
  useEffect(() => {
    console.log(deletingNode);
    if (!deletingNode) {
      if (schema.links && schema.links.length !== 0) {
        const colors = ['red', 'blue', 'yellow', 'violet', 'green', 'orange', 'purple', 'teal'];
        const lastLink = schema.links.pop();
        if (lastLink) {
          schema.links.push({input: lastLink.input, output: lastLink.output, className: `${colors[nodeCount % 8]}-link`});
        }
      }
    }
  }, [schema.links]);


  // Deals with context menu and it's options
  const handleSubmit = () => {
    const nodeToChange: any = schema.nodes.find(node => node.id === nodeToRename);
    if (newNodeName !== '' && newNodeName.length < 25) {
      if (nodeToChange) {
        deleteNodeFromSchema(nodeToChange.id);
        addNode({
          id: nodeToChange.id,
          content: newNodeName,
          coordinates: nodeToChange.coordinates,
          render: VmNode,
          inputs: nodeToChange.inputs,
          outputs: nodeToChange.outputs
        });
      }
      toggleRenameTextBox(false);
    }
  };

  const showMenu = (event: any) => {
    const xClickPos = event.clientX - rect.left;
    const yClickPos = event.clientY - rect.top;
    setMenuType('default');
    for (const node of schema.nodes) {
      if ((xClickPos >= node.coordinates[0] && xClickPos - 20 <= node.coordinates[0] + 50)
        && (yClickPos >= node.coordinates[1] && yClickPos - 20 <= node.coordinates[1] + 100)) {
        if (node.id.includes('vm')) {
          setMenuType('vm');
        }
        else if (node.id.includes('switch')) {
          setMenuType('switch');
        }
      }
    }
  };

  const getMenuItems = (menu: string) => {
    if (menu === 'default') {
      return ([
      {
        text: 'Add Switch',
        onClick: () => {
          setSelectSwitchVisible(!selectSwitchVisible);
        }
      },
      {
        text: 'Add VM',
        onClick: () => {
          addNewVM();
        }
      }
    ]);
    }
    else if (menu === 'vm') {
      return ([
        {
          text: 'Link OS',
          onClick: () => {
            // TODO put link OS function here
            console.log('Link OS');
          }
        },
        {
          text: 'Rename',
          onClick: () => {
            if (schema.nodes.find(nodes => nodes.id === selectedNode)) {
              const node: any = schema.nodes.find(nodes => nodes.id === selectedNode);
              setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
              toggleRenameTextBox(true);
              setNodeToRename(node.id);
              setNewNodeName(node.content);
            }
          }
        },
        {
          text: 'Remove',
          onClick: () => {
            deleteNodeFromSchema(selectedNode);
          }
        },
        {
          text: 'Duplicate',
          onClick: () => {
            duplicateNode(selectedNode);
          }
        }
      ]);
    }
    else if (menu === 'switch') {
      return ([
        {
          text: 'Remove',
          onClick: () => {
            deleteNodeFromSchema(selectedNode);
          }
        },
        {
          text: 'Duplicate',
          onClick: () => {
            duplicateNode(selectedNode);
          }
        }
      ]);
    }
    return;
  };

 let menuItems = getMenuItems(menuType);

  useEffect(()=> {
    menuItems = getMenuItems(menuType);
  }, [selectedNode]);


  useEffect(() => {
    window.addEventListener('contextmenu', showMenu);

    return () => {
      window.removeEventListener('contextmenu', showMenu);
    };
  });


  const handleInputChange = (event: any) => {
    setNewNodeName(event.target.value);
  };

  const rename = (event: any) => {
    for (const node of schema.nodes) {
      if (((event.clientX - rect.left) >= node.coordinates[0] && (event.clientX - rect.left) - 20 <= node.coordinates[0] + 50)
        && ((event.clientY - rect.top) >= node.coordinates[1] && (event.clientY - rect.top) - 20 <= node.coordinates[1] + 100)) {
        if (node.id.includes('vm')) {
          setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
          setNodeToRename(node.id);
          setNewNodeName(node.content);
          toggleRenameTextBox(true);
        }
      }
    }
  };

  return (
    <>
      <div>
        {/*<label>*/}
        {/*  Should this lab have a connection to the internet?*/}
        {/*  <input*/}
        {/*    type='checkbox'*/}
        {/*    id='internet-connection'*/}
        {/*    name='internet-connection'*/}
        {/*    onChange={() => toggleInternetConnection(!internetConnection)}*/}
        {/*  />*/}
        {/*</label>*/}
        <ToggleButton
          style={{margin: 10}}
          id='toggle-check'
          type='checkbox'
          variant='outline-secondary'
          checked={internetConnection}
          value='1'
          onChange={() => toggleInternetConnection(!internetConnection)}
        >
          {'   Should this lab have a connection to the internet?'}
        </ToggleButton>
      </div>
      <div style={{margin: 10}}>
        <Button variant='secondary' onClick={() => setSelectSwitchVisible(!selectSwitchVisible)} style={{marginRight: 10}}>Add Switch</Button>
        <Button variant='secondary' onClick={addNewVM}>Add VM</Button>
      </div>
      <ContextContainer style={{height: '50vh'}} menuItems={menuItems} schema={schema}>
        <div id='diagram' style={{height: '50vh', zIndex: -1}} onClick={unSelect} onContextMenu={unSelect} onDoubleClick={rename}>
          {selectSwitchVisible &&
          <SelectSwitch addSwitch={addNewSwitch} close={() => setSelectSwitchVisible(false)}/>}
          <Diagram schema={schema} onChange={onChange} />
          {renameTextBox &&
          <form onSubmit={handleSubmit} style={{position:'absolute', left:`${textBoxPosition[0]}px`, top:`${textBoxPosition[1]}px`, zIndex:1000}}>
            <input
              type='text'
              value={newNodeName}
              onChange={handleInputChange}
            />
            <input type='submit' style={{display: 'none'}}/>
          </form>}
        </div>
      </ContextContainer>
    </>
  );
};

export default UncontrolledDiagram;
