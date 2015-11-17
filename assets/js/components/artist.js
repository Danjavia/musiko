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

		

		$.ajax({

      		url: this.props.apiUrl,
      		dataType: 'json',
      		type: 'POST',
      		data: queryData,

      		success: function( data ) {
      			

      			if ( this.isMounted() ) {
			        this.setState({ 
				    	mbid: data.artist.mbid,
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
      		  	
      		  	
      		}.bind( this ),

      		error: function( xhr, status, err ) {
      			
      		  	
      		}.bind( this )
    	});
	},

	rawMarkup: function() {
	    return { __html: this.state.bio.content };
	},

	saveTo: function ( name ) {

		var name, favoriteArtists = [];

		return function ( e ) {

			if ( localStorage.favoriteArtists ) {

				favoriteArtists = JSON.parse( localStorage.favoriteArtists );

				if ( favoriteArtists.indexOf( name ) != -1 ) return;
				
				else 
					favoriteArtists.push( name );
			}

			else
				favoriteArtists.push( name );

	    	localStorage.favoriteArtists = JSON.stringify( favoriteArtists );

	    }.bind( this );
	},

	listAll: function () {

		var favoriteArtists;

		if ( localStorage.favoriteArtists ) {

			favoriteArtists = JSON.parse( localStorage.favoriteArtists );
			alert( favoriteArtists );
		}

		else
			alert( 'Sorry, You has not any artist in your favorite artist list' );
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
						<div className="artist__stats">
							<div className="artist__stats--listeners">listeners<br/>{this.state.listeners}</div>
							<div className="artist__stats--playcount">playcount<br/>{this.state.playcount}</div>
						</div>
					</div>
				</header>

				<section className="artist__bio">
					<div className="container">
						<h2>Biography</h2>
						<p dangerouslySetInnerHTML={this.rawMarkup()}/>
					</div>
				</section>

				<div className="clearfix"></div>

				<section className="artist__actions">
					<a className="artist__actions--save" data-name={this.state.name} onClick={this.saveTo(this.state.name)}><i className="fa fa-heart"></i> save to my favorite artists</a>
					<a className="artist__actions--show" onClick={this.listAll}><i className="fa fa-list"></i> List all my favorite artists</a>
				</section>
			</div>
		)
	}
});

// Export component
window.Artist = Artist;