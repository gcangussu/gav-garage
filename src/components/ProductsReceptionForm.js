// @flow
import * as React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { Link } from 'react-router-dom';

import { Field, Button, Input, Alert } from '../ui-components';
import type { ProductsReception_products } from './__generated__/ProductsReception_products.graphql';

type FormProps = {
  products: ProductsReception_products,
  handleSubmit: (values: any) => Promise<any>,
  isNewProduct: boolean,
  error: any,
  submitting: boolean,
  reset: () => void,
  submitSucceeded: boolean,
  className: string,
};

function ProductsReceptionForm({
  products,
  isNewProduct,
  handleSubmit,
  error,
  submitting,
  reset,
  submitSucceeded,
  className,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit} className={className}>
      <h1 className="fa2 lh-copy">Receber produto</h1>
      <Field
        component="select"
        name="productId"
        label="Produto recebido"
        fieldClass="pa2"
        required
      >
        <option />
        <option value="_new">Cadastrar novo produto</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>
            {p.description} (#{p.id})
          </option>
        ))}
      </Field>
      {isNewProduct && (
        <fieldset className="mb3 pa3 ba">
          <legend className="ph1">Cadastro de produto</legend>
          <Input name="product.description" label="Descrição" required />
          <Input
            name="product.picture"
            label="Imagem (endereço)"
            type="url"
            required
          />
          <Input
            name="product.unitPrice"
            label="Preço unitário (valor para venda)"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </fieldset>
      )}
      <Input
        name="quantity"
        label="Quantidate recebida"
        type="number"
        min="1"
        step="1"
        required
      />
      <Input
        name="unitCost"
        label="Custo de aquisição por unidade"
        type="number"
        min="0"
        step="0.01"
        required
      />
      <div className="mb3">
        {submitSucceeded ? (
          <Button onClick={reset} bg="dark-green" className="ba">
            Enviar Outro
          </Button>
        ) : (
          <Button type="submit" disabled={submitting}>
            {submitting ? '...' : 'Receber'}
          </Button>
        )}
        <Link className="link ml2" to="/products">
          Voltar
        </Link>
      </div>
      <Alert hidden={!error}>{error}</Alert>
      <Alert hidden={!submitSucceeded || error || submitting} color="green">
        Produto recebido com sucesso.
      </Alert>
    </form>
  );
}

export const formName = 'ProductsReception';
export const selector = formValueSelector(formName);
export default reduxForm({ form: formName })(ProductsReceptionForm);
