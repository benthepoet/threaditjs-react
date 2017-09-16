const React = require('react');

module.exports = CommentList;

function Comment({ comment, lookup, replies, onChangeReply, onSubmitReply }) {
    const children = lookup[comment.id];
    const reply = replies[comment.id];
    
    const text = () => ({
        __html: comment.text
    });
    
    const preview = () => ({
        __html: T.previewComment(reply)  
    });
    
    return (
        <div className="comment">
            <p dangerouslySetInnerHTML={text()}></p>
            <div className="reply">
                { reply === undefined ? (
                    <a onClick={() => onChangeReply(comment.id)}>Reply</a>
                ) : (
                    <form onSubmit={(event) => onSubmitReply(comment.id, reply, event)}>
                        <textarea onInput={(event) => onChangeReply(comment.id, event)} value={reply}></textarea>
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
                            lookup={lookup}
                            replies={replies}
                            onChangeReply={onChangeReply}
                            onSubmitReply={onSubmitReply} />)
                    }
                </div>
            }
        </div>
    );
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