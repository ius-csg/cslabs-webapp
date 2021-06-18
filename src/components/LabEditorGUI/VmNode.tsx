import React, {FormEvent, useState} from 'react';
import VmSVG from '../../assets/icons/computer-desktop.svg';
import ContextContainer from './ContextContainer';

const VmNode = ({data, id, inputs}: any) => {
  // const { inputs } = inputs;

  const [vmName, setvmName] = useState('default vm');
  const [nameChange, setNameChange] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNameChange(false);
  }

  const menuItems = [
    {
      text: 'Link OS',
      onClick: () => { console.log('Link OS clicked!'); }
    },
    {
      text: 'Rename',
      onClick: () => { console.log('Rename clicked!'); setNameChange(true);}
    },
    {
      text: 'Remove',
      onClick: () => { data.onClick(id);}
    },
    {
      text: 'Duplicate',
      onClick: () => { console.log('Duplicate clicked!'); }
    }
  ];


  return (
    <ContextContainer menuItems={menuItems}>
    <div style={{display:'flex', flexDirection:'column'}} onDoubleClick={() => setNameChange(true)}>
      <img src={VmSVG} alt='VM' style={{height:'3em'}}/>
      {nameChange &&
      <form onSubmit={handleSubmit}>
        <input type='text' value={vmName} onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setvmName(ev.target.value)}/>
        <input type='submit' style={{display:'none'}}/>
      </form>}
      {!nameChange && <div>
        {vmName}
      </div>}
      {inputs.map((port: any) => React.cloneElement(port, {
        style: { width: '50px', height: '50px', background: '#1B263B', position: 'absolute', top: '25px', right: '15px', opacity: '0%' }
      }))}
    </div>
    </ContextContainer>
  );
};

export default VmNode;
