import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';

const SwitchNode = ({inputs, outputs}: any) => {
  // const { inputs } = inputs;

  return (
    <div style={{marginTop: '0px'}}>
      <img src={switchSVG} alt='Switch' style={{height:'3.5em'}} />
      {inputs.map((port: any) => React.cloneElement(port, {
        style: {height:'0px', width:'0px'}
      }))}
      <div style={{display:'flex'}}>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: {height: '10px', width: '10px', background: '#000000', margin: '5px'}
      }))}
      </div>
    </div>

  );
};

export default SwitchNode;
