// @flow
import * as React from 'react';

import { renderState } from '.';

export default function createRender(Component: React.ElementType) {
  return function render({ props, error }: { props: any, error: Error }) {
    const state = renderState(props, error);
    if (state) return state;
    return <Component {...props} />;
  };
}
