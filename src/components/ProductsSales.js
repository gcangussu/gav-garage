// @flow
/* eslint react/no-array-index-key: 0 */
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { RelayProp } from 'react-relay';
import { Link } from 'react-router-dom';
import { FieldArray, reduxForm, SubmissionError } from 'redux-form';

import { Field, Input, Alert, Button } from '../ui-components';
import { promiseMutation } from '../relay';

type FormProps = {
  handleSubmit: (values: any) => Promise<any>,
  products: any,
  submitSucceeded: boolean,
  reset: () => void,
  submitting: boolean,
  error: any,
};

function Form({
  handleSubmit,
  products,
  submitSucceeded,
  reset,
  submitting,
  error,
}: FormProps) {
  function renderProducts({ fields }) {
    return (
      <div>
        {fields.map((f, index) => (
          <div key={index} className="mb3">
            <div className="dt w-100 mb1">
              <h4 className="f4 lh-copy dtc v-mid">Produto #{index + 1}</h4>
              <div className="dtc tr">
                <Button onClick={() => fields.remove(index)} bg="red">
                  ✖ Remover Produto
                </Button>
              </div>
            </div>
            <Field
              name={`${f}.productId`}
              component="select"
              label="Produto"
              fieldClass="pa2"
              required
            >
              <option />
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.description} (#{p.id})
                </option>
              ))}
            </Field>
            <Input
              name={`${f}.quantity`}
              label="Quantidade"
              type="number"
              min="1"
              required
            />
            <Input
              name={`${f}.unitPrice`}
              label="Valor unitário"
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>
        ))}
        <div className="tc">
          <Button onClick={() => fields.push({})} className="mb3" bg="blue">
            ➕ Produto
          </Button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="measure center">
      <FieldArray name="products" component={(renderProducts: any)} />
      <div className="mb3">
        {submitSucceeded ? (
          <Button onClick={reset} bg="dark-green" className="ba">
            Enviar Outro
          </Button>
        ) : (
          <Button type="submit" disabled={submitting}>
            {submitting ? '...' : 'Vender'}
          </Button>
        )}
        <Link className="link ml2" to="/products">
          Voltar
        </Link>
      </div>
      <Alert hidden={!error || submitSucceeded}>{error}</Alert>
      <Alert hidden={!submitSucceeded || error || submitting} color="green">
        Produto recebido com sucesso.
      </Alert>
    </form>
  );
}

const EnhancedForm = reduxForm({ form: 'ProductsSales' })(Form);

type Props = {
  relay: RelayProp,
};

class ProductsSales extends React.Component<Props> {
  handleSubmit = values => {
    if (!values.products || values.products.length === 0) {
      throw new SubmissionError({
        _error: 'Você deve vender ao menos um produto.',
      });
    }
    return promiseMutation(this.props.relay.environment, {
      mutation: graphql`
        mutation ProductsSalesMutation($order: [SellOrder!]!) {
          sell(order: $order) {
            order {
              id
            }
          }
        }
      `,
      variables: { order: values.products },
    }).catch(err => {
      throw new SubmissionError({
        _error: (err && err.message) || 'Unknown Error',
      });
    });
  };

  render() {
    return <EnhancedForm onSubmit={this.handleSubmit} {...this.props} />;
  }
}

export default createFragmentContainer(ProductsSales, {
  products: graphql`
    fragment ProductsSales_products on Product @relay(plural: true) {
      id
      description
    }
  `,
});
