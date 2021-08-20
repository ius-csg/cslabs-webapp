import React, { useRef } from 'react';
import ContextMenu from './ContextMenu';


const ContextContainer = ({ children, menuItems, schema}: any) => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef}>
      {children}
      <ContextMenu
        schema={schema}
        parentRef={containerRef}
        items={menuItems}
      />
    </div>
  );
};

export default ContextContainer;
