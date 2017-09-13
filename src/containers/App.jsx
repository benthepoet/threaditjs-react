const React = require('react');
const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const Actions = require('../actions');
const ThreadList = require('../components/ThreadList.jsx');

class App extends React.Component {
    componentDidMount() {
        this.props.actions.getThreads();
    }
    
    render() {
        return <ThreadList threads={this.props.threads} />;
    }
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

function mapStateToProps({ threads }) {
    return { threads };
}