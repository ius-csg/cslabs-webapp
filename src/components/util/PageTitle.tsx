import React from 'react';

interface Props {
  children: any;
}

export function PageTitle({children}: Props) {
  return (
    <h1 id='page-title'>{children}</h1>
  );
}
