import React from 'react';
import cloud from '../../assets/icons/cloud.svg';

const WanNode = (props: any) => {
  const { outputs } = props;

  return (

    <div style={{marginTop: '0px'}}>
      <img src={cloud} alt='WAN' style={{height:'4em'}}/>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: { width: '50px', height: '50px', background: '#1B263B', position: 'absolute', top: '25px', right: '15px', opacity: '0%' }
      }))}
    </div>

  );
};

export default WanNode;
