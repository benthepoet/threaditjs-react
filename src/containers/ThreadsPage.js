const React = require('react');
const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const Actions = require('../actions');
const ThreadList = require('../components/ThreadList');

class ThreadsPage extends React.Component {
    componentDidMount() {
        this.props.actions.getThreads();
    }
    
    render() {
        return (
            <div>
                {this.props.error ? (
                    <div>{this.props.error}</div>
                ) : (
                    <ThreadList 
                        onPostChange={this.props.actions.changePost}
                        onPostSubmit={this.props.actions.createThread}
                        post={this.props.post}
                        threads={this.props.threads} />
                )}
            </div>
        );
    }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ThreadsPage);

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

function mapStateToProps({ error, post, threads }) {
    return { 
        error,
        post,
        threads 
    };
}