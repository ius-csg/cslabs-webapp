import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import _ from 'lodash';


// tslint:disable-next-line:no-import-side-effect
import './Link.scss';
import {range} from '../util/Util';
import {toJpeg} from 'html-to-image';


// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({ menuType, setMenuType, textBoxPosition, setTextBoxPosition, nodeToRename, setNodeToRename}: any) => {

  let rect: any = null;
  useEffect(() => {
    // @ts-ignore
    rect = document.getElementById('diagram').getBoundingClientRect();
  });


  const [selectSwitchVisible, setSelectSwitchVisible] = useState<boolean>(false);
  const [renameTextBox, toggleRenameTextBox] = useState<boolean>(false);
  const [newNodeName, setNewNodeName] = useState('');
  const [internetConnection, toggleInternetConnection] = useState<boolean>(false);
  const [nodeCount, setNodeCount] = useState<number>(0);
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

    setNodeCount( nodeCount + 1);

    addNode({
      id: `vm-node-${nodeCount}`,
      content: `Node ${nodeCount}`,
      coordinates: startingCoords,
      render: VmNode,
      inputs: [{id: `vm-node-${nodeCount}-port0`}] // id must be unique each time for connection to be made
    });
    updateSchemaState('update');
  };

  const addNewSwitch = (ports: number) => {
    setNodeCount( nodeCount + 1);
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
    updateSchemaState('update');
  };

  const deleteNodeFromSchema = (id: string) => {
    const nodeToRemove: any = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
  };

  const duplicateNode = (id: string) => {
    const nodeToDuplicate: any = schema.nodes.find(node => node.id === id);
    const inputs: any = [];
    const outputs: any = [];
    let name = '';
    if (id.includes('vm')) {
      name = 'vm-node';
    }
    else if (id.includes('switch')) {
      name = 'switch-node';
    }

    if (nodeToDuplicate.inputs) {
      for (let i = 0; i < nodeToDuplicate.inputs.length; i++) {
        inputs.push({id: `${name}-${schema.nodes.length + 1}-port-in-${i+1}`});
      }
    }

    if (nodeToDuplicate.outputs) {
      for (let i = 0; i < nodeToDuplicate.outputs.length; i++) {
        outputs.push({id: `${name}-${schema.nodes.length + 1}-port-out-${i+1}`});
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
    onChange(schema);
  };

  const addVmPort = (id: string) => {
    const nodeToChange: any  = schema.nodes.find(node => node.id === id);

    if (nodeToChange.inputs.length < 4) {
      setNodeCount(nodeCount + 1);
      const inputs : any = [];
      for (const i of range(0, nodeToChange.inputs.length)) {
        inputs.push({id: `vm-node-${nodeCount}-port${i}`});
      }

      deleteNodeFromSchema(nodeToChange.id);
      addNode({
        id: `vm-node-${nodeCount}`,
        content: nodeToChange.content,
        coordinates: nodeToChange.coordinates,
        render: VmNode,
        inputs: inputs
      });
      updateSchemaState('update');
    }
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
      updateSchemaState('update');
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
          text: 'Add Port',
          onClick: () => {
            addVmPort(selectedNode);
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
              const node: any = schema.nodes.find(nodes => nodes.id === selectedNode);
              setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
              toggleRenameTextBox(true);
              setNodeToRename(node.id);
              setNewNodeName(node.content);
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
        if (node.id.includes('vm')) {
          setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
          setNodeToRename(node.id);
          if (node.content !== undefined && typeof node.content === 'string') {
            setNewNodeName(node.content);
          }
          toggleRenameTextBox(true);
        }
      }
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toJpeg(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        // TODO replace this statement with a call update the lab image
        document.body.appendChild(img);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);


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
        >
          {'   Should this lab have a connection to the internet?'}
        </ToggleButton>
      </div>
      <div style={{margin: 10}}>
        <Button variant='secondary' onClick={() => setSelectSwitchVisible(!selectSwitchVisible)} style={{marginRight: 10}}>Add Switch</Button>
        <Button variant='secondary' onClick={addNewVM}>Add VM</Button>
      </div>
      <ContextContainer style={{height: '50vh'}} menuItems={menuItems} schema={schema}>
        <div ref={ref} id='diagram' style={{height: '50vh', zIndex: -1}} onClick={unSelect} onContextMenu={unSelect} onDoubleClick={rename}>
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
        <button onClick={onButtonClick}>Click me</button>
      </ContextContainer>
    </>
  );
};

export default UncontrolledDiagram;
