// Local Modules
const Api = require('../services/api');
const Types = require('./types'); 

module.exports = {
    changeReply,
    changePost,
    clearComments,
    createThread,
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
            .then(({ data }) => {
                dispatch({
                    type: Types.CHANGE_POST,
                    post: ''
                });
                
                dispatch({
                    type: Types.CREATE_THREAD,
                    thread: data
                });
            });
    };
}

function getComments(id) {
    return dispatch => {
        Api
            .getComments(id)
            .then(comments => {
                dispatch({
                    type: Types.GET_COMMENTS,
                    comments
                });
            });
    };
}

function getThreads() {
    return dispatch => {
        Api
            .getThreads()
            .then(threads => {
                dispatch({
                    type: Types.GET_THREADS,
                    threads
                });
            });
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