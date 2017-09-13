const { GET_THREADS } = require('../actions/types');

module.exports = threads;

function threads(state = [], action) {
    switch (action.type) {
        case GET_THREADS:
            return action.threads;
        
        default:
            return state;
    }
}