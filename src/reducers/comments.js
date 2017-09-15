const { CHANGE_REPLY, CLEAR_COMMENTS, GET_COMMENTS } = require('../actions/types');

module.exports = comments;

function comments(state = {}, action) {
    switch (action.type) {
        case CHANGE_REPLY:
            const replies = {
                ...state.replies,
                [action.id]: action.reply
            };
            
            return {
                ...state,
                replies
            };
        
        case CLEAR_COMMENTS:
            return {};
        
        case GET_COMMENTS:
            return action.comments;
            
        default:
            return state;
    }
}