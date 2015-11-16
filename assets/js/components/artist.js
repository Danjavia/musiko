'use strict';

// SearchBox component
var Artist = React.createClass({

	getInitialState: function() {
	    return {
		    bio: '',
	    	image: '',
	    	bgImage: '',
	    	name: '',
	    	url: '',
	    	listeners: '',
	    	playcount: '',
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
				    	image: data.artist.image[ 2 ][ '#text' ],
				    	bgImage: data.artist.image[ 4 ][ '#text' ],
				    	name: data.artist.name,
				    	url: data.artist.url,
				    	similar: data.artist.similar,
				    	listeners: data.artist.stats.listeners,
				    	playcount: data.artist.stats.playcount,
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

	rawMarkup: function() {
	    return { __html: this.state.bio.content };
	},
	
	render: function () {

		var thumbnail = this.state.image ? this.state.image : 'http://img2-ak.lst.fm/i/u/174s/449d1de5b35c6beaadcfa8dfb565214a.png',
			url = '/#/search/' + encodeURIComponent( this.state.url ),
			artistHeaderStyle = {
				backgroundImage: 'url(' + this.state.bgImage + ')',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				WebkitTransition: 'all', 
				msTransition: 'all' 
			};

		return (
			<div className="artist">
				<header className="artist__header" style={artistHeaderStyle}>
					<div className="container">
						<img src={thumbnail} alt="placeholder+image"/>
						<h1>{this.state.name}</h1>
						<div>listeners: {this.state.listeners}</div>
						<div>playcount: {this.state.playcount}</div>
					</div>
				</header>

				<section className="artist__bio">
					<div className="container">
						<h2>Biography</h2>
						<p dangerouslySetInnerHTML={this.rawMarkup()}/>
					</div>
				</section>
			</div>
		)
	}
});

// Export component
window.Artist = Artist;