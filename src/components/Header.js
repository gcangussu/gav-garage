import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearToken } from '../actions';

function Header({ logout }: { logout(): void }) {
  return (
    <header className="mb3">
      <nav className="dt w-100">
        <div className="dtc w10 v-mid pb3">
          <Link
            className="dib h2 pv2 hover-black no-underline border-box"
            to="/"
          >
            GAV Garage
          </Link>
        </div>
        <div className="dtc v-mid tr pb3">
          <Link
            className="f6 fw4 hover-black no-underline black-70 dn dib pv2 ph3"
            to="/"
          >
            Produtos
          </Link>
          <Link
            className="f6 fw4 hover-black no-underline black-70 dn dib pv2 ph3"
            to="/receipts"
          >
            Recibos
          </Link>
          <Link
            className="f6 fw4 hover-black no-underline black-70 dn dib pv2 ph3"
            to="/orders"
          >
            Vendas
          </Link>
          <button
            className="f6 fw4 hover-black no-underline black-70 dib ml2 pv2 ph3 bg-white pointer ba b--black-70"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default connect(null, dispatch =>
  bindActionCreators({ logout: clearToken }, dispatch),
)(Header);
