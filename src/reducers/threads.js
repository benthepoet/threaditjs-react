const Types = require('../actions/types');

module.exports = threads;

function threads(state = [], action) {
    switch (action.type) {
        case Types.CREATE_THREAD:
            return [
                ...state,
                action.thread
            ];
        
        case Types.GET_THREADS:
            return action.threads;
        
        default:
            return state;
    }
}