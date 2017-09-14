const { combineReducers } = require('redux');

const post = require('./post');
const threads = require('./threads');

module.exports = combineReducers({
    post,
    threads
});