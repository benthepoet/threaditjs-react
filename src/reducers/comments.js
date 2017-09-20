const Types = require('../actions/types');

module.exports = comments;

function comments(state = {}, action) {
    let children;
    let lookup;
    let replies;
    
    switch (action.type) {
        case Types.CHANGE_REPLY:
            replies = {
                ...state.replies,
                [action.id]: action.reply
            };
            
            return {
                ...state,
                replies
            };
        
        case Types.CLEAR_COMMENTS:
            return {};
        
        case Types.GET_COMMENTS:
            return action.comments;
            
        case Types.SUBMIT_REPLY:
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