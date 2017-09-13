const React = require('react');

const Thread = thread => (
    <div key={thread.id}>
        <a href="">{thread.text}</a>
        <p className="comment_count">{thread.comment_count} comment(s)</p>
        <hr />
    </div>
)

const ThreadList = ({ threads }) => (
    <div className="thread-list">
        {threads.map(Thread)}
        <form>
            <textarea></textarea>
            <input type="submit" value="Post" />
        </form>
    </div>
);

module.exports = ThreadList;