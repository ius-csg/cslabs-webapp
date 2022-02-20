import React, {useState} from 'react';
import 'beautiful-react-diagrams/styles.css';
import Diagram from '../../components/LabEditorGUI/Diagram';

const LabEditorGUI = ({setGuiSchema, disabled} : any) => {
  const [menuType, setMenuType] = useState<string>('default');
  const [textBoxPosition, setTextBoxPosition] = useState([0, 0]);
  const [nodeToRename, setNodeToRename] = useState('');

  return (
    <div>
      <Diagram
        menuType={menuType}
        setMenuType={setMenuType}
        textBoxPosition={textBoxPosition}
        setTextBoxPosition={setTextBoxPosition}
        nodeToRename={nodeToRename}
        disabled={disabled}
        setNodeToRename={setNodeToRename}
        setGuiSchema={setGuiSchema}
      />
    </div>
  );
};

export default LabEditorGUI;
