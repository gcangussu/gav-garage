import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearToken } from '../actions';

function Header({ logout }: { logout(): void }) {
  return (
    <header>
      <nav className="dt w-100 mw8 center">
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
            How it Works
          </Link>
          <Link
            className="f6 fw4 hover-black no-underline black-70 dn dib pv2 ph3"
            to="/"
          >
            Pricing
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