const ThreadIt = require('./threadit');

module.exports = {
    createComment,
    createThread,
    getComments,
    getThreads
};

function createComment(parent, text) {
    const options = {
        contentType: 'application/json',
        data: { 
            parent,
            text
        },
        method: 'POST'
    };
    
    return request('/comments/create', options)
        .then(({ data }) => data);
}

function createThread(text) {
    const options = {
        contentType: 'application/json',
        data: { text },
        method: 'POST'
    };
    
    return request('/threads/create', options)
        .then(({ data }) => {
            return {
                ...data,
                text: ThreadIt.trimTitle(data.text)
            };
        });
}

function getComments(id) {
    return request(`/comments/${id}`)
        .then(({ data }) => {
            const comments = { 
                lookup: {}, 
                replies: {}
            };
            
            data.forEach(comment => {
                const { parent_id } = comment;
                
                if (parent_id) {
                    comments.lookup[parent_id] = comments.lookup[parent_id] || [];
                    comments.lookup[parent_id].push(comment);
                } else {
                    comments.root = comment;
                }
            });
            
            return comments;
        });
}

function getThreads() {
    return request('/threads')
        .then(({ data }) => {
            return data.map(thread => {
                return {
                    ...thread,
                    text: ThreadIt.trimTitle(thread.text)
                };
            });
        });
}

function request(url, options = {}) {
    return new Promise((resolve, reject) => {
        // Default method
        options.method = options.method || 'GET';
        
        // Construct URL
        options.url = `${ThreadIt.apiUrl}${url}`;
    
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