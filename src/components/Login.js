// @flow
import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { graphql } from 'react-relay';
import { Environment } from 'relay-runtime';
import { Redirect } from 'react-router-dom';

import { Field, Button, Alert } from '../ui-components';
import { getRelayEnvironment, isAuthenticated } from '../selectors';
import { setToken } from '../actions';
import { promiseMutation } from '../relay';

import type {
  LoginMutationResponse,
  LoginMutationVariables,
} from './__generated__/LoginMutation.graphql';

type FormProps = {|
  handleSubmit: SyntheticEvent<HTMLFormElement>,
|};

function LoginForm({ handleSubmit }: FormProps) {
  return (
    <form onSubmit={handleSubmit} className="measure center">
      <Field name="email" label="Email" type="email" required />
      <Field name="password" label="Password" type="password" required />
      <Button type="submit">Login</Button>
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

type State = {|
  error: string,
|};

export class Login extends React.Component<Props, State> {
  state: State = { error: '' };

  handleLogin = (variables: LoginMutationVariables) => {
    this.setState({ error: '' });
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
        this.props.onLogin(resp.login.token);
      })
      .catch(error => {
        this.setState({
          error: (error && error.message) || 'Unknown error',
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
      <div>
        <h1 className="f1 lh-title tc">Por favor faça login.</h1>
        <EnhancedLoginForm
          onSubmit={this.handleLogin}
          error={this.state.error}
        />
        <Alert hidden={!error}>{error}</Alert>
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
