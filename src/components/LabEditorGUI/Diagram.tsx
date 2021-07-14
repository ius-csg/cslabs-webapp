import React, { useEffect, useState} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import WanNode from './WanNode';
import SwitchNode from './SwitchNode';
import VmNode from './VmNode';
import changeSelected, {changeSelectedNode} from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
import SelectSwitch from './SelectSwitch';
import ContextContainer from './ContextContainer';

// initial diagram model
const initialSchema = createSchema({});

const UncontrolledDiagram = ({nodeToDelete, setNodeToDelete}:any) => {

  let rect: any = null;
  useEffect(() => {
    // @ts-ignore
    rect = document.getElementById('diagram').getBoundingClientRect();
  });


  const [selectSwitchVisible, setSelectSwitchVisible] = useState(false);


  const selectedNode = useSelector((state: any) => state.gui.selectedID);

  const onKeyDown = (e: any) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (schema.nodes.find(node => node.id === nodeToDelete && e.target.toString() !== '[object HTMLInputElement]')) {
        deleteNodeFromSchema(nodeToDelete);
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

  const unSelect = (e: any) => {
    if (selectedNode.selectedID !== 'none' && e.target.toString() !== '[object HTMLInputElement]') {
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
    } else {
      for (let port = 0; port < (ports / 2); port++) {
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
      content: nodeToDuplicate.content,
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
    console.log(schema);

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
        count++;
      }
    }
  }, [schema]);


  // Deals with context menu and it's options
  const [renameTextBox, toggleRenameTextBox] = useState(false);
  const [textBoxPosition, setTextBoxPosition] = useState([0, 0]);
  const [nodeName, setNodeName] = useState<any>('');
  const [clickPosition, setClickPosition] = useState([0, 0]);
  const [nodeToRename, setNodeToRename] = useState('');

  const handleSubmit = () => {
    if (nodeName !== '' && nodeName.length < 25) {
      const node = schema.nodes.find(nodes => nodeToRename);
      if (node) {
        deleteNodeFromSchema(node.id);
        addNode({
          id: node.id,
          content: nodeName,
          coordinates: node.coordinates,
          render: VmNode,
          data: node.data,
          inputs: node.inputs,
          outputs: node.outputs
        });
      }
      toggleRenameTextBox(false);
    }
  };



  const showMenu = (event: any) => {
    setClickPosition([event.clientX - rect.left, event.clientY - rect.top]);
    menuItems = getMenuItems();
  };

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('contextmenu', showMenu);

    return () => {
      window.removeEventListener('contextmenu', showMenu);
    };
  });


  const getMenuItems = () => {
    for (const node of schema.nodes) {
      if ((clickPosition[0] >= node.coordinates[0] && clickPosition[0] - 20 <= node.coordinates[0] + 50)
        && (clickPosition[1] >= node.coordinates[1] && clickPosition[1] - 20 <= node.coordinates[1] + 100)) {
        if (node.id.includes('vm')) {
          // Custom VM Menu
          return ([
            {
              text: 'Link OS',
              onClick: () => {
                console.log('Link OS');
              }
            },
            {
              text: 'Rename',
              onClick: () => {
                setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
                toggleRenameTextBox(true);
                setNodeToRename(node.id);
                setNodeName(node.content);
              }
            },
            {
              text: 'Remove',
              onClick: () => {
                deleteNodeFromSchema(node.id);
              }
            },
            {
              text: 'Duplicate',
              onClick: () => {
                duplicateNode(node.id);
              }
            }
          ]);
        } else if (node.id.includes('switch')) {
          // Custom Switch Menu
          return ([
            {
              text: 'Remove',
              onClick: () => {
                deleteNodeFromSchema(node.id);
              }
            },
            {
              text: 'Duplicate',
              onClick: () => {
                duplicateNode(node.id);
              }
            }
          ]);
        }
      }
    }
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
  };

  let menuItems = getMenuItems();

  // useEffect(() => {
  //   menuItems = getMenuItems();
  // }, [clickPosition]);

  const handleInputChange = (event: any) => {
    setNodeName(event.target.value);
  };

  const rename = (event: any) => {
    for (const node of schema.nodes) {
      if (((event.clientX - rect.left) >= node.coordinates[0] && (event.clientX - rect.left) - 20 <= node.coordinates[0] + 50)
        && ((event.clientY - rect.top) >= node.coordinates[1] && (event.clientY - rect.top) - 20 <= node.coordinates[1] + 100)) {
        setTextBoxPosition([node.coordinates[0] + rect.left - 50, node.coordinates[1] + rect.top + 90]);
        setNodeToRename(node.id);
        setNodeName(node.content);
        toggleRenameTextBox(true);
      }
    }
  };

  // (ev: React.ChangeEvent<HTMLInputElement>): void => setNodeName(ev.target.value)

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
        <button onClick={() => setSelectSwitchVisible(!selectSwitchVisible)}>Add Switch</button>
        <button onClick={addNewVM}>Add VM</button>
      </div>
      <ContextContainer style={{height: '50vh'}} menuItems={menuItems} schema={schema}>
        <div id='diagram' style={{height: '50vh', zIndex: -1}} onClick={unSelect} onDoubleClick={rename}>
          {selectSwitchVisible &&
          <SelectSwitch addSwitch={addNewSwitch} close={() => setSelectSwitchVisible(false)}/>}
          <Diagram schema={schema} onChange={onChange} />
          {renameTextBox &&
          <form onSubmit={handleSubmit} style={{position:'absolute', left:`${textBoxPosition[0]}px`, top:`${textBoxPosition[1]}px`, zIndex:1000}}>
            <input
              type='text'
              value={nodeName}
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
