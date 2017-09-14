const { CHANGE_POST } = require('../actions/types');

module.exports = post;

function post(state = '', action) {
    switch (action.type) {
        case CHANGE_POST:
            return action.post;
            
        default:
            return state;
    }
}