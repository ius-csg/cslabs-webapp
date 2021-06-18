import React, { useRef } from 'react';
import ContextMenu from './ContextMenu';


const Container = ({ children, menuItems }: any) => {
  const containerRef = useRef(null);

  return (
    <div className='container' ref={containerRef}>
      {children}

      <ContextMenu
        parentRef={containerRef}
        items={menuItems}
      />
    </div>
  );
};

export default Container;
