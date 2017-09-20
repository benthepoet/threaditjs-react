const Types = require('../actions/types');

module.exports = post;

function post(state = '', action) {
    switch (action.type) {
        case Types.CHANGE_POST:
            return action.post;
            
        default:
            return state;
    }
}