const React = require('react');

module.exports = CommentList;

function Comment({ comment, lookup, replies, onChangeReply }) {
    const children = lookup[comment.id];
    const reply = replies[comment.id];
    const preview = () => {
      return {
          __html: T.previewComment(reply)
      };  
    };
    
    return (
        <div className="comment">
            <p>{comment.text}</p>
            <div className="reply">
                { reply === undefined ? (
                    <a onClick={() => onChangeReply(comment.id)}>Reply</a>
                ) : (
                    <form>
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
                            onChangeReply={onChangeReply} />)
                    }
                </div>
            }
        </div>
    );
}

function CommentList({ comments, onChangeReply }) {
    if (!comments.root) {
        return null;
    }
    
    return (
        <div className="comments">
            <Comment 
                comment={comments.root} 
                lookup={comments.lookup} 
                replies={comments.replies}
                onChangeReply={onChangeReply} />
        </div>
    );
};