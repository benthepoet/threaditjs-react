const React = require('react');
const { render } = require('react-dom');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./reducers');

const store = createStore(reducers);

class App extends React.Component {
    render() {
        return <div>Hello</div>;
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('.main')
);