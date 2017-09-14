// NPM Modules
const React = require('react');
const { render } = require('react-dom');
const { applyMiddleware, createStore } = require('redux');
const { Provider } = require('react-redux');
const thunk = require('redux-thunk').default;

// Local Modules
const reducers = require('./reducers');
const App = require('./containers/App');

const store = createStore(reducers, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('.main')
);