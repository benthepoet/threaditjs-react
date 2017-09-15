const { combineReducers } = require('redux');

const comments = require('./comments');
const post = require('./post');
const threads = require('./threads');

module.exports = combineReducers({
    comments,
    post,
    threads
});