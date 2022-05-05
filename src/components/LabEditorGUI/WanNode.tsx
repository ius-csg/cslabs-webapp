import React from 'react';
import cloud from '../../assets/icons/cloud.svg';

const WanNode = (props: any) => {
  const { outputs } = props;

  return (

    <div style={{marginTop: '0px'}}>
      <img src={cloud} alt='WAN' draggable={false} style={{height:'65px', pointerEvents:'none'}}/>
      {outputs.map((port: any) => React.cloneElement(port, {
        style: {height: '10px', width: '10px', background: '#000000', cursor: 'pointer'}
      }))}
    </div>

  );
};

export default WanNode;
