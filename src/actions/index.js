// Local Modules
const Api = require('../services/api');
const Types = require('./types'); 

module.exports = {
    changeReply,
    changePost,
    clearComments,
    createThread,
    displayError,
    getComments,
    getThreads,
    submitReply
};

function changePost(event) {
    return {
        type: Types.CHANGE_POST,
        post: event.target.value     
    };
}

function changeReply(id, event) {
    return {
        type: Types.CHANGE_REPLY,
        reply: event ? event.target.value : '',
        id
    };
}

function clearComments() {
    return { type: Types.CLEAR_COMMENTS };
}

function createThread(event, text) {
    event.preventDefault();
    
    return dispatch => {
        Api
            .createThread(text)
            .then(thread => {
                dispatch({
                    type: Types.CHANGE_POST,
                    post: ''
                });
                
                dispatch({
                    type: Types.CREATE_THREAD,
                    thread
                });
            });
    };
}

function displayError(dispatch) {
    dispatch({ 
        type: Types.DISPLAY_ERROR, 
        message: 'An error occurred. Please refresh the page.'
    });
}

function getComments(id) {
    return dispatch => {
        Api
            .getComments(id)
            .then(comments => {
                dispatch({
                    type: Types.CLEAR_ERROR
                });
                
                dispatch({
                    type: Types.GET_COMMENTS,
                    comments
                });
            })
            .catch(() => displayError(dispatch));
    };
}

function getThreads() {
    return dispatch => {
        Api
            .getThreads()
            .then(threads => {
                dispatch({
                    type: Types.CLEAR_ERROR
                });
                
                dispatch({
                    type: Types.GET_THREADS,
                    threads
                });
            })
            .catch(() => displayError(dispatch));
    };
}

function submitReply(parent, text, event) {
    event.preventDefault();
    
    return dispatch => {
        Api
            .createComment(parent, text)
            .then(comment => {
                dispatch({
                    type: Types.SUBMIT_REPLY,
                    comment,
                    parent
                });
            });
    };
}