// Local Modules
const { CHANGE_POST, CHANGE_REPLY, CLEAR_COMMENTS, CREATE_THREAD, GET_COMMENTS, GET_THREADS, SUBMIT_REPLY } = require('./types'); 
const Api = require('../services/api');

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
        type: CHANGE_POST,
        post: event.target.value     
    };
}

function changeReply(id, event) {
    return {
        type: CHANGE_REPLY,
        reply: event ? event.target.value : '',
        id
    };
}

function clearComments() {
    return { type: CLEAR_COMMENTS };
}

function createThread(event, text) {
    event.preventDefault();
    
    return dispatch => {
        Api
            .createThread(text)
            .then(({ data }) => {
                dispatch({
                    type: CHANGE_POST,
                    post: ''
                });
                
                dispatch({
                    type: CREATE_THREAD,
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
                    type: GET_COMMENTS,
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
                    type: GET_THREADS,
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
                    type: SUBMIT_REPLY,
                    comment,
                    parent
                });
            });
    };
}