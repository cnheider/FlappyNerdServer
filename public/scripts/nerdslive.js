var Nerd = React.createClass({
  render: function() {
    return (
      <div className="NerdListItem">
        <b>{this.props.name}</b>
        <br/>
        <img className="NerdAvatar" src={this.props.src} />
        <br/>
        <i>Air time(ms):</i>
        <br/>
        <progress className="NerdProgressBar" value={this.props.air_time} max={this.props.goal}></progress>
        <br/>
        {this.props.air_time}/{this.props.goal}
      </div>
    )
  }
})

var LiveBox = React.createClass({
  loadNerdsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data})
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
    var nerdNodes = this.props.data.map(
      function(nerd) {
        return (
          <li className="nerdItem">
            <Nerd name={nerd.name} src={nerd.avatar_url} nerd_id={nerd.nerd_id} air_time={nerd.sum} goal={10000} key={nerd.nerd_id} />
          </li>
        )
      }
    )

    return (
      <ul className="nerdList" id="liveList">
        {nerdNodes}
      </ul>
    )
  }
})

ReactDOM.render(
  <LiveBox url="/game/live/1" pollInterval={600} />,
  document.getElementById('nerdslive')
);
