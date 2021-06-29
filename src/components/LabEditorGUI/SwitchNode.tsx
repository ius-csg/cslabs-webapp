import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';
import changeSelected from '../../redux/actions/changeGUI';
import {useDispatch, useSelector} from 'react-redux';
const SwitchNode = ({data, id, inputs, outputs}: any) => {

  const selectedNode = useSelector((state: any) => state.gui);
  const dispatch = useDispatch();

  const handleSelect = () => {
    // Timeout will override the deselect click event in the diagram div
    // There might be a better way to handle this
    setTimeout(() => dispatch(changeSelected({selectedID: id})), 10);
  };

  return (
    <div style={id === selectedNode.selectedID ? {border:'3px solid #ABDEF6', borderRadius:'5px', cursor:'default'} : {cursor:'default'}}>
    <div style={{marginTop: '0px'}} onClick={handleSelect}>
      {inputs.map((port: any) => React.cloneElement(port, {
        style: {height:'10px', width:'10px', background: '#000000', margin: '5px', cursor: 'pointer'}
      }))}
      <img src={switchSVG} alt='Switch' draggable={false} style={{height:'3.5em'}} />

      <div style={{display:'flex'}}>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
      }))}
      </div>
    </div>
    </div>
  );
};

export default SwitchNode;
