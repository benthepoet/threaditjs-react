const { CREATE_THREAD, GET_THREADS } = require('../actions/types');

module.exports = threads;

function threads(state = [], action) {
    switch (action.type) {
        case CREATE_THREAD:
            return [
                ...state,
                action.thread
            ];
        
        case GET_THREADS:
            return action.threads;
        
        default:
            return state;
    }
}