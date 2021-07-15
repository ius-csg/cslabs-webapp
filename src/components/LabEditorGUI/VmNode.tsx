import React, { useState} from 'react';
import VmSVG from '../../assets/icons/computer-desktop.svg';

import {useDispatch, useSelector} from 'react-redux';
import changeSelected from '../../redux/actions/changeGUI';


const VmNode = ({data, id, inputs, content}: any) => {

  const [nameChange, setNameChange] = useState(false);

  const selectedNode = useSelector((state: any) => state.gui);

  const dispatch = useDispatch();

  const handleSelect = () => {
    // Timeout will override the deselect click event in the diagram div
    // There might be a better way to handle this
    setTimeout(() => dispatch(changeSelected({selectedID: id})), 10);
  };

  return (
    <div style={id === selectedNode.selectedID ? {border:'3px solid #ABDEF6', borderRadius:'5px', cursor:'default'} : {cursor:'default'}}>
        <div onDoubleClick={() => setNameChange(true)} onClick={handleSelect} onContextMenu={handleSelect}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
            {inputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            }))}
            </div>
            <img src={VmSVG} alt='VM' draggable={false} style={{height: '50px', userSelect:'none', pointerEvents:'none'}}/>
            {!nameChange && <div style={{display:'flex', justifyContent:'center'}}>
              <h5>{content}</h5>
            </div>}
          </div>
        </div>
      </div>
  );
};

export default VmNode;
