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
    <div  onDoubleClick={() => setNameChange(true)} onClick={() => data.setActiveNode(id)}>
      <div style={{display:'flex', flexDirection:'column'}}>
      <img src={VmSVG} alt='VM' style={{height:'3em'}}/>
      {nameChange &&
      <form onSubmit={handleSubmit}>
        <input type='text' value={vmName} onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setvmName(ev.target.value)}/>
        <input type='submit' style={{display:'none'}}/>
      </form>}
      {!nameChange && <div>
        {vmName}
      </div>}
      </div>
      <div style={{display:'flex', position:'absolute', top:'-20px'}}>
      {inputs.map((port: any) => React.cloneElement(port, {
        style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
      }))}
      </div>
    </div>
    </ContextContainer>
  );
};

export default VmNode;
