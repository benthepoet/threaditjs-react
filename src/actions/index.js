// Local Modules
const { GET_THREADS } = require('./types'); 
const Api = require('../services/api');

module.exports = {
    getThreads
};

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