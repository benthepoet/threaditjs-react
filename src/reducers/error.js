const Types = require('../actions/types');

module.exports = error;

function error(state = '', action) {
    switch (action.type) {
        case Types.CLEAR_ERROR:
            return '';
            
        case Types.DISPLAY_ERROR:
            return action.message;
            
        default:
            return state;
    }
}