var Nerd = React.createClass({
  render: function() {
    return (
      <div className="NerdAvatar">
        <p>{this.props.name}, flaps {this.props.flaps}</p>
      </div>
    );
  }
});

var LiveBox = React.createClass({
  loadNerdsFromServer: function() {
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
    this.loadNerdsFromServer();
    setInterval(this.loadNerdsFromServer, this.props.pollInterval);
    console.log("componentDidMount");
  },
  render: function() {
    return (
      <div className="liveBox">
        <NerdList data={this.state.data} />
      </div>
    );
  }
});

var NerdList = React.createClass({
  render: function() {
    var nerdNodes = this.props.data.map(function(nerd) {
      return (
        <Nerd nerd_id={nerd.nerd_id} name={nerd.name} flaps={nerd.count} key={nerd.nerd_id}>
        </Nerd>
      );
    });
    return (
      <div className="nerdList">
        {nerdNodes}
      </div>
    );
  }
});

ReactDOM.render(
  <LiveBox url="/stat/mostflaps" pollInterval={2000} />,
  document.getElementById('leaderboard')
);
