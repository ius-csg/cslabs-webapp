import React from 'react';
// @ts-ignore
import FivePort from '../../assets/images/LabEditor/FivePortSwitch.PNG';
// @ts-ignore
import EightPort from '../../assets/images/LabEditor/EightPortSwitch.PNG';
// @ts-ignore
import SixteenPort from '../../assets/images/LabEditor/SixteenPortSwitch.PNG';
// @ts-ignore
import TwentyFourPort from '../../assets/images/LabEditor/Twenty-FourPortSwitch.PNG';
// @ts-ignore
import FortyEightPort from '../../assets/images/LabEditor/Forty-EightPortSwitch.PNG';
import closeIcon from '../../assets/icons/close.svg';

const SelectSwitch = ({close, addSwitch}: any) => {
  const handleSelect = (ports: number) => {
    addSwitch(ports);
    close();
  };

  return (
      <div
        style={{
        position:'absolute',
        left: 0,
        right: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(230, 230, 230, 0.95)'
      }}
      >
        <button
          onClick={close}
          style={{position:'absolute', right:'2em', top:'1em', border:'none', width:30, height:30, background:'none'}}>
          <img src={closeIcon}/>
        </button>
        <h2 style={{display: 'flex', justifyContent: 'center', paddingTop:'1em'}}>Select a Switch</h2>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px'}}>
            <button onClick={() => handleSelect(5)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={FivePort} style={{height: '4.75em'}}/>
            </button>
            5 Port
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px'}}>
            <button onClick={() => handleSelect(8)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={EightPort} style={{height: '4.75em'}}/>
            </button>
            8 Port
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px'}}>
            <button onClick={() => handleSelect(16)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={SixteenPort} style={{height: '7em'}}/>
            </button>
            16 Port
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px'}}>
            <button onClick={() => handleSelect(24)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={TwentyFourPort} style={{height: '7em'}}/>
            </button>
            24 Port
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px'}}>
            <button onClick={() => handleSelect(48)} style={{height: '8em', border:'none', background:'none'}}>
              <img src={FortyEightPort} style={{height: '7em'}}/>
            </button>
            48 Port
          </div>
        </div>
      </div>
  );
};

export default SelectSwitch;
