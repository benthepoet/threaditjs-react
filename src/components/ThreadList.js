const React = require('react');

const Thread = thread => (
    <div key={thread.id}>
        <a href="">{T.trimTitle(thread.text)}</a>
        <p className="comment_count">{thread.comment_count} comment(s)</p>
        <hr />
    </div>
)

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