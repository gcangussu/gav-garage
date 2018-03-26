// @flow
import { commitMutation } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { MutationConfig } from 'relay-runtime';

export function getEnvironment(token: string) {
  function fetchQuery(operation: any, variables: any) {
    const headers: {
      'Content-Type': string,
      Authorization?: string,
    } = { 'Content-Type': 'application/json' };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch('http://localhost:4000', {
      headers,
      method: 'POST',
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => response.json());
  }

  return new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
  });
}

export function promiseMutation<T>(
  environment: Environment,
  config: MutationConfig<T>,
) {
  // $FlowFixMe
  return new Promise((resolve, reject) => {
    commitMutation(environment, {
      onCompleted: (response, errors) => {
        if (errors && errors.length > 0) {
          reject(new Error(errors.map(e => e.message).join('\n')));
        } else {
          resolve(response);
        }
      },
      onError: reject,
      ...config,
    });
  });
}
