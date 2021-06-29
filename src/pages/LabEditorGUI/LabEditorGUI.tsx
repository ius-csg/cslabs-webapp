import React, {useState} from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram from '../../components/LabEditorGUI/Diagram';
import {useSelector} from 'react-redux';

const LabEditorGUI = () => {
  const selectNode = useSelector((state: any) => state.gui);

  const [selectedNode, setSelectedNode] = useState('');


  return (
    <div>
      <h1>node : {selectNode.selectedID}</h1>
      <Diagram nodeToDelete={selectedNode} setNodeToDelete={setSelectedNode}/>
    </div>
  );
};

export default LabEditorGUI;
