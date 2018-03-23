import React from 'react';

export default function Button(props) {
  return (
    <button
      className="f6 link dim ph3 pv2 mb2 dib white bg-black ba b--black-90 pointer"
      {...props}
    />
  );
}
