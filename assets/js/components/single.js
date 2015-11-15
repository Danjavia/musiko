'use strict';

// SearchBox component
var Artist = React.createClass({

	getInitialState: function () {

		return {
			
		};
	},

	componentDidMount: function () {

		var queryData = { 
			method: 'artist.getInfo', 
			api_key: this.props.apiKey,
			artist: this.props.artist, 
			format: 'json'
		};

		console.log( queryData );

		$.ajax({

      		url: this.props.apiUrl,
      		dataType: 'json',
      		type: 'POST',
      		data: queryData,

      		success: function( data ) {
      			console.log( data );
      		  	this.setState({ results: data.results.artistmatches.artist });
      		  	console.log( this.state.results );
      		}.bind( this ),

      		error: function( xhr, status, err ) {
      			console.log( status );
      		  	console.error( this.props.url, status, err.toString() );
      		}.bind( this )
    	});
	},
	
	render: function () {
		return (
			<div className="Artist">
				{this.props.artist}
			</div>
		)
	}
});

// Export component
window.Artist = Artist;