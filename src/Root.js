import React from 'react';
import { connect } from 'react-redux';
import Navigator from './navigation/Modal';

function Root() {
  return <Navigator />;
}

function mapStateToProps(state) {
  return {
    sLang: state.settings.sLang,
    tLang: state.settings.tLang,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Root);
