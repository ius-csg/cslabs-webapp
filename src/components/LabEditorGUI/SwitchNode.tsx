import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';

const SwitchNode = ({data, id, inputs, outputs}: any) => {
  // const { inputs } = inputs;

  return (
    <div style={{marginTop: '0px'}} onClick={() => data.setActiveNode(id)}>
      <img src={switchSVG} alt='Switch' style={{height:'3.5em'}} />
      {inputs.map((port: any) => React.cloneElement(port, {
        style: {height:'10px', width:'10px', background: '#000000', margin: '5px', cursor: 'pointer', position:'absolute', top:'-20px'}
      }))}
      <div style={{display:'flex'}}>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
      }))}
      </div>
    </div>

  );
};

export default SwitchNode;
