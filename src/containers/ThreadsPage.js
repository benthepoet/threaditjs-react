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
        return <ThreadList 
            onPostChange={this.props.actions.changePost}
            onPostSubmit={this.props.actions.createThread}
            post={this.props.post}
            threads={this.props.threads} />;
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadsPage);

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

function mapStateToProps({ post, threads }) {
    return { 
        post,
        threads 
    };
}