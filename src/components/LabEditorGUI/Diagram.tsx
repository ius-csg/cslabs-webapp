import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import {ToggleButton} from 'react-bootstrap';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import {Node} from 'beautiful-react-diagrams/@types/DiagramSchema';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import changeSelected from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
import SelectSwitch from './SelectSwitch';
import ContextContainer from './ContextContainer';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';


// tslint:disable-next-line:no-import-side-effect
import './Link.scss';
import {range} from '../util/Util';


// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({ menuType, setMenuType, textBoxPosition, setTextBoxPosition, nodeToRename, disabled, setNodeToRename, setGuiSchema }: any) => {

  let rect: any = null;
  useEffect(() => {
    // @ts-ignore
    rect = document.getElementById('diagram').getBoundingClientRect();
  });


  const [selectSwitchVisible, setSelectSwitchVisible] = useState<boolean>(false);
  const [renameTextBox, toggleRenameTextBox] = useState<boolean>(false);
  const [newNodeName, setNewNodeName] = useState<string>('');
  const [internetConnection, toggleInternetConnection] = useState<boolean>(false);
  const [linkCount, setLinkCount] = useState<number>(0);
  const [schemaState, setSchemaState] = useState<any>({
    past: [{}],
    present: {},
    future: [{}]
  });

  const selectedNode = useSelector((state: any) => state.gui.selectedID);

  // For undo redo state
  const updateSchemaState = (operation: string) => {
    let newSchemaState;
    newSchemaState = schemaState;
    switch (operation) {
      case 'undo':
        if (schemaState.past.length > 1) {
          newSchemaState.future.push(_.cloneDeep(schemaState.present));
          newSchemaState.present = _.cloneDeep(newSchemaState.past[newSchemaState.past.length - 1]);
          newSchemaState.past.splice(newSchemaState.past.length - 1, 1);

          setSchemaState(newSchemaState);

          if (schemaState.present.nodes) {
            schema.nodes.splice(0, schema.nodes.length);
            for (const i of schemaState.present.nodes) {
              schema.nodes.push(i);
            }
          }
          if (schemaState.present.links && schema.links !== undefined) {
            schema.links.splice(0, schema.links.length);
            for (const i of schemaState.present.links) {
              schema.links.push(i);
            }
          }
          onChange(schema);
        }
        break;
      case 'redo':
        if (schemaState.future.length > 1) {
          newSchemaState.past.push(_.cloneDeep(schemaState.present));
          newSchemaState.present = _.cloneDeep(newSchemaState.future[newSchemaState.future.length - 1]);
          newSchemaState.future.splice(newSchemaState.future.length - 1, 1);

          setSchemaState(newSchemaState);

          if (schemaState.present.nodes) {
            schema.nodes.splice(0, schema.nodes.length);
            for (const i of schemaState.present.nodes) {
              schema.nodes.push(i);
            }
          }
          if (schemaState.present.links && schema.links !== undefined) {
            schema.links.splice(0, schema.nodes.length);
            for (const i of schemaState.present.links) {
              schema.links.push(i);
            }
          }
          onChange(schema);
        }
        break;
      case 'update':
        if (newSchemaState.present.nodes !== schema.nodes && newSchemaState.present.links !== schema.links) {
          newSchemaState.past.push(_.cloneDeep(schemaState.present));
          newSchemaState.present = _.cloneDeep({nodes: schema.nodes, links: schema.links});
          setSchemaState(newSchemaState);
        }
        break;
    }
  };

  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (schema.nodes.find(node => node.id === selectedNode && e.target.toString() !== '[object HTMLInputElement]')) {
        deleteNodeFromSchema(selectedNode);
      }
    } else if (e.which === 90 && e.ctrlKey) {
      if (e.shiftKey) {
        // redo (ctrl + shift + z)
        updateSchemaState('redo');
      } else {
        // undo (ctrl + z)
        updateSchemaState('undo');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const dispatch = useDispatch();

  const unSelect = (e: React.MouseEvent) => {
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
    let startingCoords: [number, number];
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
    const uuid = uuidv4().toString();
    addNode({
      id: uuid,
      nodeType: 'vm',
      content: 'VM',
      coordinates: startingCoords,
      render: VmNode,
      inputs: [{id: `${uuid}-port0`}] // id must be unique each time for connection to be made
    });
    updateSchemaState('update');
  };

  const addNewSwitch = (ports: number) => {
    const totalPortsOut = [];
    const totalPortsIn = [];
    const uuid = uuidv4().toString();
    if (ports === 5) {
      totalPortsIn.push({id: `${uuid}-port1`}, {id: `${uuid}-port2`});
      for (let port = 2; port < (ports); port++) {
        totalPortsOut.push({id: `${uuid}-port${port}`});
      }
    } else {
      for (let port = 0; port < (ports / 2); port++) {
        totalPortsOut.push({id: `${uuid}-port${port}-in`});
        totalPortsIn.push({id: `${uuid}-port${port}-out`});
      }
    }

    const startingCoords = handleFirstNode(schema.nodes.length);

    addNode({
      id: uuidv4().toString(),
      nodeType: 'switch',
      content: 'Switch',
      coordinates: startingCoords,
      render: SwitchNode,
      inputs: totalPortsIn,
      outputs: totalPortsOut
    });
    updateSchemaState('update');
  };

  const deleteNodeFromSchema = (id: string) => {
    const nodeToRemove: Node<any> = schema.nodes.find(node => node.id === id) as Node<any>;
    removeNode(nodeToRemove);
  };

  const duplicateNode = (id: string) => {
    const nodeToDuplicate: Node<any> = schema.nodes.find(node => node.id === id) as Node<any>;
    const inputs: any = [];
    const outputs: any = [];
    const uuid = uuidv4().toString();

    if (nodeToDuplicate.inputs) {
      for (let i = 0; i < nodeToDuplicate.inputs.length; i++) {
        inputs.push({id: `${uuid}-port${i+1}-in`});
      }
    }

    if (nodeToDuplicate.outputs) {
      for (let i = 0; i < nodeToDuplicate.outputs.length; i++) {
        outputs.push({id: `${uuid}-port${i+1}-out`});
      }
    }

    addNode({
      id: uuid,
      nodeType: nodeToDuplicate.nodeType,
      content: nodeToDuplicate.content,
      coordinates: [
        Number(schema.nodes[schema.nodes.length - 1].coordinates[0] + 100),
        Number(schema.nodes[schema.nodes.length - 1].coordinates[1])
      ],
      render: nodeToDuplicate.render,
      inputs: inputs,
      outputs: outputs
    });
    onChange(schema);
  };

  const addVmPort = (id: string) => {
    const nodeToChange: Node<any> = schema.nodes.find(node => node.id === id) as Node<any>;
    const uuid = uuidv4().toString();

    if (nodeToChange.inputs !== undefined) {
      if (nodeToChange.inputs.length < 4) {
        const inputs : any = [];
        for (const i of range(0, nodeToChange.inputs.length)) {
          inputs.push({id: `${uuid}-port${i}`});
        }

        deleteNodeFromSchema(nodeToChange.id);
        addNode({
          id: uuid,
          nodeType: nodeToChange.nodeType,
          content: nodeToChange.content,
          coordinates: nodeToChange.coordinates,
          render: VmNode,
          inputs: inputs
        });
        updateSchemaState('update');
      }
    }
  };

  const removeVmPort = (id: string) => {
    const nodeToChange: Node<any> = schema.nodes.find(node => node.id === id) as Node<any>;
    if (nodeToChange.inputs !== undefined) {
      if (nodeToChange.inputs.length > 0) {
        const inputs : any = [];
        for (const i of range(0, nodeToChange.inputs.length - 2)) {
          inputs.push({id: `${nodeToChange.id}-port${i}`});
        }

        deleteNodeFromSchema(nodeToChange.id);
        addNode({
          id: uuidv4().toString(),
          nodeType: nodeToChange.nodeType,
          content: nodeToChange.content,
          coordinates: nodeToChange.coordinates,
          render: VmNode,
          inputs: inputs
        });
        updateSchemaState('update');
      }
    }
  };

  useEffect(() => {
    if (internetConnection === true) {
      const uuid = uuidv4().toString();
      addNode({
        id: uuid,
        nodeType: 'wan',
        content: `Node ${schema.nodes.length + 1}`,
        coordinates: [250, 30],
        render: WanNode,
        outputs: [{id: `${uuid}-port0`}],
        disableDrag: true
      });
    } else if (internetConnection === false && schema.nodes.find(node => node.id === 'wan-node') !== undefined) {
      deleteNodeFromSchema('wan-node');
      updateSchemaState('update');
    }
  }, [internetConnection]);

  // This use effect hook can be used to get information from the GUI
  useEffect(() => {
    console.log(schema);
    console.log(selectedNode);
    setGuiSchema(schema);
    const portsInUse: any = [];
    let count = 0;
    if (schema.links) {
      for (const port of schema.links) {
        // Prevents having more than one connection per port
        if (portsInUse.includes(port.input) || portsInUse.includes(port.output)) {
          schema.links.splice(count, 1);
        }
        // Prevents connecting two ports on same node
        if (port.input.slice(0, 36) === port.output.slice(0, 36)) {
          schema.links.splice(count, 1);
        }
        portsInUse.push(port.input);
        portsInUse.push(port.output);
        count++;
      }
    }
  }, [schema]);


  // Handles different colors for links
  useEffect(() => {
    setLinkCount(linkCount + 1);
      if (schema.links && schema.links.length !== 0 && !schema.links[schema.links.length-1].className) {
        const colors = ['red', 'blue', 'yellow', 'violet', 'green', 'orange', 'purple', 'teal'];
        const lastLink = schema.links.pop();
        if (lastLink) {
          schema.links.push({input: lastLink.input, output: lastLink.output, className: `${colors[linkCount % 8]}-link`});
        }
      }
      if (schema.links !== schemaState.present) {
        updateSchemaState('update');
      }
  }, [schema.links]);


  // Deals with context menu and it's options
  const handleSubmit = () => {
    const nodeToChange: Node<any> = schema.nodes.find(node => node.id === nodeToRename) as Node<any>;
    if (newNodeName !== '' && newNodeName.length < 25) {
      if (nodeToChange) {
        deleteNodeFromSchema(nodeToChange.id);
        addNode({
          id: uuidv4().toString(),
          nodeType: nodeToChange.nodeType,
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
        if (node.nodeType === 'vm') {
          setMenuType('vm');
        }
        else if (node.nodeType === 'switch') {
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
          text: 'Add Port',
          onClick: () => {
            addVmPort(selectedNode);
          }
        },
        {
          text: 'Remove Port',
          onClick: () => {
            removeVmPort(selectedNode);
          }
        },
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
              const node: Node<any> = schema.nodes.find(nodes => nodes.id === selectedNode) as Node<any>;
              const element = document!.getElementById(node.id);
              setTextBoxPosition([element!.getBoundingClientRect().left, element!.getBoundingClientRect().top]);
              toggleRenameTextBox(true);
              setNodeToRename(node.id);
              setNewNodeName(node.content as string);
            }
            updateSchemaState('update');
          }
        },
        {
          text: 'Remove',
          onClick: () => {
            deleteNodeFromSchema(selectedNode);
            updateSchemaState('update');
          }
        },
        {
          text: 'Duplicate',
          onClick: () => {
            duplicateNode(selectedNode);
            updateSchemaState('update');
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
            updateSchemaState('update');
          }
        },
        {
          text: 'Duplicate',
          onClick: () => {
            duplicateNode(selectedNode);
            updateSchemaState('update');
          }
        }
      ]);
    }
    return;
  };

 let menuItems = getMenuItems(menuType);

  useEffect(()=> {
    menuItems = getMenuItems(menuType);

    // TODO this logic is supposed to limit add and delete port options when necessary. Currently doesn't work
    if (schema.nodes.find(nodes => nodes.id === selectedNode)) {
      const selectedNodeDetails: Node<any> = schema.nodes.find(node => node.id === selectedNode) as Node<any>;
      console.log(selectedNodeDetails);
      if (selectedNodeDetails) {
        if (selectedNodeDetails.nodeType === 'vm' && selectedNode.inputs && menuItems) {
          if (selectedNodeDetails.inputs?.length === 3) { // Only remove ports
            menuItems = menuItems.splice(0, 1);
          } else if (selectedNodeDetails.inputs?.length === 1) { // Only add ports
            menuItems = menuItems.splice(1, 1);
          }
        }
      }
    }
  }, [selectedNode]);


  useEffect(() => {
    window.addEventListener('contextmenu', showMenu);

    return () => {
      window.removeEventListener('contextmenu', showMenu);
    };
  });


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeName(event.target.value);
  };

  const rename = (event: React.MouseEvent) => {
    for (const node of schema.nodes) {
      if (((event.clientX - rect.left) >= node.coordinates[0] && (event.clientX - rect.left) - 20 <= node.coordinates[0] + 50)
        && ((event.clientY - rect.top) >= node.coordinates[1] && (event.clientY - rect.top) - 20 <= node.coordinates[1] + 100)) {
        if (node.nodeType === 'vm') {
          const element = document!.getElementById(node.id);
          setTextBoxPosition([element!.getBoundingClientRect().left, element!.getBoundingClientRect().top]);
          toggleRenameTextBox(true);
          setNodeToRename(node.id);
          setNewNodeName(node.content as string);
        }
      }
    }
  };

  return (
    <>
      <div>
        <ToggleButton
          style={{margin: 10}}
          id='toggle-check'
          type='checkbox'
          variant='outline-secondary'
          checked={internetConnection}
          value='1'
          onChange={() => toggleInternetConnection(!internetConnection)}
          disabled={disabled}
        >
          {'   Should this lab have a connection to the internet?'}
        </ToggleButton>
      </div>
      <div style={{margin: 10}}>
        <Button
          variant='secondary'
          onClick={() => setSelectSwitchVisible(!selectSwitchVisible)}
          style={{marginRight: 10}}
          disabled={disabled}
        >
          Add Switch
        </Button>
        <Button variant='secondary' onClick={addNewVM} disabled={disabled}>Add VM</Button>
      </div>
      <div style={disabled ? {pointerEvents: 'none', opacity: '0.4', zIndex:999999} : {}}>
      <ContextContainer style={{height: '50vh'}} menuItems={menuItems} schema={schema}>
        <div id='diagram' style={{height: '50vh', zIndex: -1}} onClick={unSelect} onContextMenu={unSelect} onDoubleClick={rename}>
          {selectSwitchVisible &&
          <SelectSwitch addSwitch={addNewSwitch} close={() => setSelectSwitchVisible(false)}/>}
            <Diagram schema={schema} onChange={onChange} />
          {renameTextBox &&
            <div style={{}}>
              <form onSubmit={handleSubmit} style={{position:'fixed', left:`${textBoxPosition[0]}px`, top:`${textBoxPosition[1]}px`, zIndex:1000}}>
                <input
                  type='text'
                  value={newNodeName}
                  onChange={handleInputChange}
                />
                <input type='submit' style={{display: 'none'}}/>
              </form>
            </div>}}
        </div>
      </ContextContainer>
      </div>
    </>
  );
};

export default UncontrolledDiagram;
