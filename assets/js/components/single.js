'use strict';

// SearchBox component
var Artist = React.createClass({

	getInitialState: function() {
	    return {
		    bio: '',
	    	image: '',
	    	name: '',
	    	url: '',
	    	similar: {},
	    	stats: {},
	    	tags: {}
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

      			if ( this.isMounted() ) {
			        this.setState({ 
			        	bio: data.artist.bio,
				    	image: data.artist.image[ 3 ][ '#text' ],
				    	name: data.artist.name,
				    	url: data.artist.url,
				    	similar: data.artist.similar,
				    	stats: data.artist.stats,
				    	tags: data.artist.tags
			        });
			    }
      		  	
      		  	console.log( this.state.bio );
      		}.bind( this ),

      		error: function( xhr, status, err ) {
      			console.log( status );
      		  	console.error( this.props.url, status, err.toString() );
      		}.bind( this )
    	});
	},
	
	render: function () {

		var thumbnail = this.state.image ? this.state.image : 'http://img2-ak.lst.fm/i/u/174s/449d1de5b35c6beaadcfa8dfb565214a.png',
			url = '/#/search/' + encodeURIComponent( this.state.url );

		return (
			<div className="artist">
				<h1>{this.state.name}</h1>
				<img src={thumbnail} alt="placeholder+image"/>
				{this.state.bio.content}
			</div>
		)
	}
});

// Export component
window.Artist = Artist;