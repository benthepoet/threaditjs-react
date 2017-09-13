const { combineReducers } = require('redux');
const threads = require('./threads');

module.exports = combineReducers({
    threads
});