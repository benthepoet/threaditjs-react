const React = require('react');
const { Provider } = require('react-redux');
const { BrowserRouter, Route, Switch } = require('react-router-dom');

const CommentsPage = require('./CommentsPage');
const ThreadsPage = require('./ThreadsPage');

module.exports = Root;

function Root({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ThreadsPage} />
                    <Route path="/thread/:id" component={CommentsPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    );
}
