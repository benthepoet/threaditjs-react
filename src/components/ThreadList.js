const React = require('react');
const { Link } = require('react-router-dom');

module.exports = ThreadList;

function Thread(thread) {
    const linkPath = `/thread/${thread.id}`;
    
    return (
        <div key={thread.id}>
            <Link to={linkPath}>{thread.text}</Link>
            <p className="comment_count">{thread.comment_count} comment(s)</p>
            <hr />
        </div>
    );
}

function ThreadList({ onPostChange, onPostSubmit, post, threads }) {
    return (
        <div className="thread-list">
            {threads.map(Thread)}
            <form onSubmit={(event) => onPostSubmit(event, post)}>
                <textarea onChange={onPostChange} value={post}></textarea>
                <input type="submit" value="Post" />
            </form>
        </div>
    );
};