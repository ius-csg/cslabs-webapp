import React, {useEffect, useState} from 'react';
import './ContextMenu.css';

const ContextMenu = ({parentRef, items}:any) => {
  const [isVisible, setVisibility ] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) {
      return;
    }

    // @ts-ignore
    const rect = document.getElementById('diagram').getBoundingClientRect();

    const showMenu = (event: any) => {
      event.preventDefault();
      setX(event.clientX);
      setY(event.clientY);
      setVisibility(true);
      // const clickPosition = [x - rect.left, y - rect.top];
      // console.log(clickPosition);
    };

    const closeMenu = () => {
      setVisibility(false);
    };

    parent.addEventListener('contextmenu', showMenu);
    window.addEventListener('click', closeMenu);

    return () => {
      parent.removeEventListener('contextmenu', showMenu);
      window.removeEventListener('click', closeMenu);
    };
  });

  const style = {
    top: y,
    left: x
  };


  return isVisible ?  (
    <div className='context-menu' style={style}>
      {items.map((item: any, index: any) => {
        return (
          <div
            key={index}
            onClick={item.onClick}
            className='context-menu__item'
          >
            {item.text}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ContextMenu;
