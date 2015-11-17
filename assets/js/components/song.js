'use strict';

// SearchBox component
var Track = React.createClass({

	getInitialState: function() {
	    return {
		    albumTitle: '',
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
			method: 'track.getInfo', 
			api_key: this.props.apiKey,
			track: this.props.track, 
			artist: this.props.artist, 
			format: 'json'
		};

		

		$.ajax({

      		url: this.props.apiUrl,
      		dataType: 'json',
      		type: 'POST',
      		data: queryData,

      		success: function( data ) {
      			

      			if ( this.isMounted() ) {
			        this.setState({ 
			        	albumTitle: data.track.album.title,
				    	image: data.track.album.image[ 2 ][ '#text' ],
				    	bgImage: data.track.album.image[ 3 ][ '#text' ],
				    	artist: data.track.album.artist
			        });
			    }
      		  	
      		  	
      		}.bind( this ),

      		error: function( xhr, status, err ) {
      			
      		  	
      		}.bind( this )
    	});
	},
	
	render: function () {

		var thumbnail = this.state.image ? this.state.image : 'http://img2-ak.lst.fm/i/u/174s/449d1de5b35c6beaadcfa8dfb565214a.png',
			artistHeaderStyle = {
				backgroundImage: 'url(' + this.state.bgImage + ')',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				WebkitTransition: 'all', 
				msTransition: 'all' 
			};

		return (
			<div className="song">
				<header className="song__header" style={artistHeaderStyle}>
					<div className="container">
						<img src={thumbnail} alt="placeholder+image"/>
						<h1>{this.state.albumTitle}</h1>
					</div>
				</header>

				<section className="song__bio">
					<div className="container">
						<h2>Biography</h2>
					</div>
				</section>
			</div>
		)
	}
});

// Export component
window.Track = Track;