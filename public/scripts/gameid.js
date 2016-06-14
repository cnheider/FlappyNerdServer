var LiveBox = React.createClass({
  loadGameIDFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadGameIDFromServer();
    setInterval(this.loadNerdsFromServer, this.props.pollInterval);
    console.log("componentDidMount");
  },
  render: function() {
    return (
      <div className="liveBox">
        {this.state.data.sid}
      </div>
    );
  }
});

ReactDOM.render(
  <LiveBox url="/game/id" pollInterval={2000} />,
  document.getElementById('leaderboard')
);
