import React from 'react';

const SelectSwitch = ({close, addSwitch}: any) => {
  const handleSelect = (ports: number) => {
    addSwitch(ports);
    close();
  };

  return (
    <div style={{position:'absolute', left:'0', right:'0', top:0, bottom:0, zIndex:1000, background:'gray', opacity:'95%'}}>
      <div style={{display:'flex', flexDirection:'column', background:'darkgray', margin:'15em'}}>
      <div style={{display:'flex', justifyContent:'flex-end', padding:'2em'}}>
        <button onClick={close}>close</button>
      </div>
      <h2 style={{display:'flex', justifyContent:'center'}}>Select a Switch</h2>
      <div style={{display:'flex', justifyContent:'center'}}>
        <button onClick={() => handleSelect(5)}>5 Port</button>
        <button onClick={() => handleSelect(8)}>8 Port</button>
        <button onClick={() => handleSelect(16)}>16 Port</button>
        <button onClick={() => handleSelect(24)}>24 Port</button>
        <button onClick={() => handleSelect(48)}>48 Port</button>
      </div>
      </div>
    </div>
  );
};

export default SelectSwitch;
