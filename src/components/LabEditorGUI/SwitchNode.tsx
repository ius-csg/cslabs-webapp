import React from 'react';
import switchSVG from '../../assets/icons/switch.svg';

const SwitchNode = (props: any) => {
  const { inputs } = props;

  return (

    <div style={{marginTop: '0px'}}>
      <img src={switchSVG} alt='Switch' style={{height:'3.5em'}} />
      {inputs.map((port: any) => React.cloneElement(port, {
        style: { width: '50px', height: '3.5em', background: '#1B263B', position: 'absolute', top: '25px', left: '15px', opacity: '0%' }
      }))}
    </div>

  );
};

export default SwitchNode;
