// @flow
import React from 'react';
import { Alert } from '../../ui-components';

export default function renderState(props: any, error: Error) {
  if (error) {
    return <Alert>error</Alert>;
  }
  if (!props) {
    return <div>Loading...</div>;
  }
  return null;
}
