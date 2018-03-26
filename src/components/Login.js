// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { graphql } from 'react-relay';
import { Environment } from 'relay-runtime';
import { Redirect } from 'react-router-dom';

import { Input, Button, Alert } from '../ui-components';
import { getRelayEnvironment, isAuthenticated } from '../selectors';
import { setToken } from '../actions';
import { promiseMutation } from '../relay';

import type {
  LoginMutationResponse,
  LoginMutationVariables,
} from './__generated__/LoginMutation.graphql';

type FormProps = {
  handleSubmit: SyntheticEvent<HTMLFormElement>,
  isLoading: boolean,
};

function LoginForm({ handleSubmit, isLoading }: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="measure center">
      <Input name="email" label="Email" type="email" required />
      <Input name="password" label="Password" type="password" required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '...' : 'Login'}
      </Button>
    </form>
  );
}

const EnhancedLoginForm = reduxForm({ form: 'login' })(LoginForm);

type Props = {
  environment: Environment,
  onLogin: (token: string) => void,
  isAuthenticated: boolean,
  location: {
    state?: {
      from: { pathname: string },
    },
  },
};

type State = {
  error: string,
  isLoading: boolean,
};

export class Login extends React.Component<Props, State> {
  state: State = { error: '', isLoading: false };

  handleLogin = (variables: LoginMutationVariables) => {
    this.setState({ error: '', isLoading: true });
    promiseMutation(this.props.environment, {
      variables,
      mutation: graphql`
        mutation LoginMutation($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
    })
      .then((resp: LoginMutationResponse) => {
        this.setState({ isLoading: false });
        this.props.onLogin(resp.login.token);
      })
      .catch(error => {
        this.setState({
          error: (error && error.message) || 'Unknown error',
          isLoading: false,
        });
      });
  };
  render() {
    if (this.props.isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      return <Redirect to={from} />;
    }

    const { error } = this.state;
    return (
      <div className="pa4">
        <h1 className="f1 lh-title tc">Por favor faça login.</h1>
        <EnhancedLoginForm
          onSubmit={this.handleLogin}
          isLoading={this.state.isLoading}
        />
        <Alert hidden={!error} style={{ marginTop: '1rem' }}>
          {error}
        </Alert>
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    environment: getRelayEnvironment,
    isAuthenticated,
  }),
  dispatch => bindActionCreators({ onLogin: setToken }, dispatch),
)(Login);
