// NPM Modules
const React = require('react');
const { render } = require('react-dom');
const { applyMiddleware, createStore } = require('redux');
const thunk = require('redux-thunk').default;

// Local Modules
const reducers = require('./reducers');
const Root = require('./containers/Root');

const store = createStore(reducers, applyMiddleware(thunk));

render(
    <Root store={store} />,
    document.querySelector('.main')
);