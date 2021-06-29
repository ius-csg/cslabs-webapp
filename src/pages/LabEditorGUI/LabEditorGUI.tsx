import React, {useState} from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram from '../../components/LabEditorGUI/Diagram';

const LabEditorGUI = () => {

  const [selectedNode, setSelectedNode] = useState('');

  return (
    <div>
      <Diagram nodeToDelete={selectedNode} setNodeToDelete={setSelectedNode}/>
    </div>
  );
};

export default LabEditorGUI;
