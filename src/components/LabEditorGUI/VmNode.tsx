import React, {FormEvent, useState} from 'react';
import VmSVG from '../../assets/icons/computer-desktop.svg';
import ContextContainer from './ContextContainer';
import {useSelector} from 'react-redux';


const VmNode = ({data, id, inputs}: any) => {

  const [vmName, setvmName] = useState('default vm');
  const [nameChange, setNameChange] = useState(false);

  const selectedNode = useSelector((state: any) => state.gui);

  const handleSelect = () => {
    // Timeout will override the deselect click event in the diagram div
    // There might be a better way to handle this
    setTimeout(() => data.Select(id), 10);
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setNameChange(false);
  }

  const menuItems = [
    {
      text: 'Link OS',
      onClick: () => {
        console.log('Link OS clicked!');
      }
    },
    {
      text: 'Rename',
      onClick: () => {
        setNameChange(true);
      }
    },
    {
      text: 'Remove',
      onClick: () => {
        data.Delete(id);
      }
    },
    {
      text: 'Duplicate',
      onClick: () => {
        data.Duplicate(id);
      }
    }
  ];

  return (
    <div style={id === selectedNode.selectedID ? {border:'3px solid #ABDEF6', borderRadius:'5px', cursor:'default'} : {cursor:'default'}}>
      <ContextContainer menuItems={menuItems}>
        <div onDoubleClick={() => setNameChange(true)} onClick={handleSelect}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
            {inputs.map((port: any) => React.cloneElement(port, {
              style: {height: '10px', width: '10px', background: '#000000', margin: '5px', cursor: 'pointer'}
            }))}
            </div>
            <img src={VmSVG} alt='VM' draggable={false} style={{height: '50px', userSelect:'none', pointerEvents:'none'}}/>
            {nameChange &&
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={vmName}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setvmName(ev.target.value)}
              />
              <input type='submit' style={{display: 'none'}}/>
            </form>}
            {!nameChange && <div>
              {vmName}
            </div>}
          </div>
        </div>
      </ContextContainer>
      </div>
  );
};

export default VmNode;
