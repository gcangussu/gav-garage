import React from 'react';

import { Alert } from '../../ui-components';

export default function createRender(Component) {
  return function render({ props, error }) {
    if (error) {
      return <Alert>error</Alert>;
    }
    if (!props) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}
