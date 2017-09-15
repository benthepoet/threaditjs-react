const React = require('react');
const { Link } = require('react-router-dom');

const Thread = thread => {
    const link = `/thread/${thread.id}`;
    
    return (
        <div key={thread.id}>
            <Link to={link}>{thread.text}</Link>
            <p className="comment_count">{thread.comment_count} comment(s)</p>
            <hr />
        </div>
    );
};

const ThreadList = ({ onPostChange, onPostSubmit, post, threads }) => (
    <div className="thread-list">
        {threads.map(Thread)}
        <form onSubmit={(event) => onPostSubmit(event, post)}>
            <textarea onChange={onPostChange} value={post}></textarea>
            <input type="submit" value="Post" />
        </form>
    </div>
);

module.exports = ThreadList;