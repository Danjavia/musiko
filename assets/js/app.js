'use strict';

var SearchBox = React.createClass({

	search: function ( e ) {

		e.preventDefault();

		var querySearch = this.refs.search.value;

		var queryData = { 
			method: 'artist.search', 
			api_key: this.props.lastKey, 
			artist: querySearch, 
			limit: 8,
			format: 'json'
		};

		console.log( queryData );

		$.ajax({

      		url: this.props.url,
      		dataType: 'json',
      		type: 'POST',
      		data: queryData,

      		success: function( data ) {
      			console.log( data );
      		  	this.setState({ result: data });
      		}.bind( this ),

      		error: function( xhr, status, err ) {
      			console.log( status );
      		  	console.error( this.props.url, status, err.toString() );
      		}.bind( this )
    	});

		console.log( 'form sended', querySearch, this.props.url,  this.props.lastKey );
	},

	render: function () {
		return (
			<div className="searchBox">
				<form action="#" className="form-inline" onSubmit={this.search}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Your name" ref="search" />
						<button type="submit" className="btn btn-success input-group">Buscar</button>
					</div>
				</form>
			</div>
		);
	}
});

var Results = React.createClass({
	
	render: function () {
		return (
			<div className="result">Hello {this.props.name}</div>
		)
	} 
})

var Musiko = React.createClass({

	getInitialState: function () {

		return {
			API_LAST_URL: "http://ws.audioscrobbler.com/2.0/",
			API_LAST_KEY: "a8da4176b3e227778d267fdc4df7ab36"
		};
	},
	
	render: function () {
		return (
			<div className="musiko">
				<SearchBox url={this.state.API_LAST_URL} lastKey={this.state.API_LAST_KEY}/>
				<Results name="Danny viasus"/>
			</div>
		)
	}
})

ReactDOM.render(
  	<Musiko/>,
  	document.getElementById( 'content' )
);