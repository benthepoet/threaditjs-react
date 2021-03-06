const React = require('react');
const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');
const { withRouter } = require('react-router-dom');

const Actions = require('../actions');
const CommentList = require('../components/CommentList');

class CommentsPage extends React.Component {
    componentDidMount() {
        this.props.actions.getComments(this.props.match.params.id);
    }
    
    componentWillUnmount() {
        this.props.actions.clearComments();
    }
    
    render() {
        return (
            <div>
                {this.props.error ? (
                    <div>{this.props.error}</div>
                ) : (
                    <CommentList 
                        comments={this.props.comments}
                        onChangeReply={this.props.actions.changeReply}
                        onSubmitReply={this.props.actions.submitReply} />
                )}
            </div>
        );
    }
}

module.exports = withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsPage));

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

function mapStateToProps({ comments, error }) {
    return { 
        comments,
        error
    };
}