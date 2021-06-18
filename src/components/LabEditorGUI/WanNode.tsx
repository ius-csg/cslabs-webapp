import React from 'react';
import cloud from '../../assets/icons/cloud.svg';

const WanNode = (props: any) => {
  const { outputs } = props;

  return (

    <div style={{marginTop: '0px'}}>
      <img src={cloud} alt='WAN' style={{height:'4em'}}/>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: { width: '0px', height: '0px', background: '#1B263B'}
      }))}
    </div>

  );
};

export default WanNode;
