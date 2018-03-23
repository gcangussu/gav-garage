import React from 'react';
import { Input, Label } from '.';

type Props = {
  name: string,
  label: string,
};

export default function Field({ name, label, ...rest }: Props) {
  return (
    <div className="mb3">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}
