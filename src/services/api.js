const { API_URL } = require('../constants');

module.exports = {
    createThread,
    getThreads
};

function createThread(text) {
    const options = {
        contentType: 'application/json',
        data: { text },
        method: 'POST'
    };
    
    return request('/threads/create', options);
}

function getThreads() {
    return request('/threads');
}

function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        // Default method
        options.method = options.method || 'GET';
        
        // Construct URL
        options.url = `${API_URL}${url}`;
    
        // Serialize JSON
        if (options.contentType === 'application/json') {
            options.data = JSON.stringify(options.data);
        }
    
        // Create request
        const xhr = new XMLHttpRequest();
    
        // Handle the response
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let data;
                
                if (xhr.getResponseHeader('Content-Type').indexOf('application/json') > -1) {
                    data = JSON.parse(xhr.responseText);    
                } else {
                    data = xhr.responseText;
                }
                
                if (xhr.status === 500) {
                    reject(data, xhr);
                } else {
                    resolve(data, xhr);
                }
            }
        };
    
        // Open the request
        xhr.open(options.method, options.url);
        
        // Set the content type
        if (options.contentType) {
            xhr.setRequestHeader('Content-Type', options.contentType);
        }
        
        // Send the data
        xhr.send(options.data);
    });
}