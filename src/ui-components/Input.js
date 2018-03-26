// @flow
import React from 'react';
import { Field } from '.';

export default function Input({
  fieldClass,
  type,
  ...props
}: {
  fieldClass?: string,
  type?: string,
}) {
  return (
    <Field
      type={type || 'text'}
      component="input"
      fieldClass={`input-reset ba b--black-20 pa2 mb2 db ${fieldClass || ''}`}
      {...props}
    />
  );
}
