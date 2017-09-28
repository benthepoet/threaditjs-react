const { combineReducers } = require('redux');

const comments = require('./comments');
const error = require('./error');
const post = require('./post');
const threads = require('./threads');

module.exports = combineReducers({
    comments,
    error,
    post,
    threads
});