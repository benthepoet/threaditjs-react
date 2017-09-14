// Local Modules
const { CHANGE_POST, CREATE_THREAD, GET_THREADS } = require('./types'); 
const Api = require('../services/api');

module.exports = {
    changePost,
    createThread,
    getThreads
};

function changePost(event) {
    return {
        type: CHANGE_POST,
        post: event.target.value     
    };
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

function getThreads() {
    return dispatch => {
        Api
            .getThreads()
            .then(({ data }) => {
                dispatch({
                    type: GET_THREADS,
                    threads: data
                });
            });
    };
}