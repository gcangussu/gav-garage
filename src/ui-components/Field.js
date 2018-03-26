// @flow
import * as React from 'react';
import { Field as ReduxFormField } from 'redux-form';

import { Label } from '.';

type Props = {
  name: string,
  component: React.ElementType,
  label?: string,
  labelClass?: string,
  fieldClass?: string,
  className?: string,
};

export default function Field({
  name,
  component,
  label,
  labelClass,
  fieldClass,
  className,
  ...rest
}: Props) {
  return (
    <div className={`mb3 ${className || ''}`}>
      {label && (
        <Label htmlFor={name} className={labelClass}>
          {label}
        </Label>
      )}
      <ReduxFormField
        id={name}
        name={name}
        component={component}
        className={`w-100 ${fieldClass || ''}`}
        aria-describedby="name-desc"
        {...rest}
      />
    </div>
  );
}
