import React from 'react';
import { connect } from 'react-redux';
import Navigator from './navigation/Modal';
import ErrorBoundary from './helpers/ErrorBoundary';

function Root() {
  return (
    <ErrorBoundary>
      <Navigator />
    </ErrorBoundary>
  );
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
