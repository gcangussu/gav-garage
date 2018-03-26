import React from 'react';

export default function Button({
  color = 'white',
  bg = 'black',
  className = '',
  ...props
}) {
  return (
    <button
      className={`f6 dim ph3 pv2 dib ${color} bg-${bg} bw0 pointer ${className}`}
      {...props}
    />
  );
}
