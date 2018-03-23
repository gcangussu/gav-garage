import React from 'react';
import { Field } from 'redux-form';

type Props = { name: string };

export default function Input(props: Props) {
  return (
    <Field
      component="input"
      className="input-reset ba b--black-20 pa2 mb2 db w-100"
      aria-describedby="name-desc"
      {...props}
    />
  );
}
