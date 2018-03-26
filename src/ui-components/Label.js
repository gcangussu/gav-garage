// @flow
import React from 'react';

export default function Label({ className, ...props }: { className?: string }) {
  return <label className={`f6 b db mb2 ${className || ''}`} {...props} />;
}
