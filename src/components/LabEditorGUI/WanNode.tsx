import React from 'react';
import cloud from '../../assets/icons/cloud.svg';

const WanNode = (props: any) => {
  const { outputs } = props;

  return (

    <div style={{marginTop: '0px'}}>
      <img src={cloud} alt='WAN' style={{height:'4em'}}/>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: { width: '70px', height: '20px', background: '#00000', position: 'absolute', top: '40px'}
      }))}
    </div>

  );
};

export default WanNode;
