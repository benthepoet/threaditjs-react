const { CHANGE_REPLY, CLEAR_COMMENTS, GET_COMMENTS, SUBMIT_REPLY } = require('../actions/types');

module.exports = comments;

function comments(state = {}, action) {
    let children;
    let lookup;
    let replies;
    
    switch (action.type) {
        case CHANGE_REPLY:
            replies = {
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
            
        case SUBMIT_REPLY:
            children = state.lookup[action.parent] || [];
            
            lookup = {
                ...state.lookup,
                [action.parent]: [
                    ...children,
                    action.comment
                ]
            };
            
            replies = {
                ...state.replies,
                [action.parent]: undefined
            };
            
            return {
                ...state,
                lookup,
                replies
            };
            
        default:
            return state;
    }
}