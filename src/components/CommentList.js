const React = require('react');
const ThreadIt = require('../services/threadit');

module.exports = CommentList;

function Comment({ comment, ...baseProps }) {
    const children = baseProps.lookup[comment.id];
    const reply = baseProps.replies[comment.id];
    
    return (
        <div className="comment">
            <p dangerouslySetInnerHTML={text()}></p>
            <div className="reply">
                { reply === undefined ? (
                    <a onClick={() => baseProps.onChangeReply(comment.id)}>Reply</a>
                ) : (
                    <form onSubmit={(event) => baseProps.onSubmitReply(comment.id, reply, event)}>
                        <textarea 
                            onInput={(event) => baseProps.onChangeReply(comment.id, event)} 
                            value={reply}>
                        </textarea>
                        <input type="submit" value="Reply" />
                        <div className="preview" dangerouslySetInnerHTML={preview()}>
                        </div>
                    </form>
                )}
            </div>
            { children &&
                <div className="children">
                    {children.map(child => 
                        <Comment 
                            key={child.id} 
                            comment={child} 
                            {...baseProps} />
                    )}
                </div>
            }
        </div>
    );
    
    function preview() {
        return { __html: ThreadIt.previewComment(reply) };
    }
    
    function text() {
        return { __html: comment.text };
    }
}

function CommentList({ comments, onChangeReply, onSubmitReply }) {
    if (!comments.root) {
        return null;
    }
    
    return (
        <div className="comments">
            <Comment 
                comment={comments.root} 
                lookup={comments.lookup} 
                replies={comments.replies}
                onChangeReply={onChangeReply}
                onSubmitReply={onSubmitReply} />
        </div>
    );
};