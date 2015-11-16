'use strict';

// SearchBox
var SearchBox = React.createClass({

	getInitialState: function () {

		return {
			results: {}
		};
	},

	search: function ( e ) {

		e.preventDefault();

		var querySearch = this.refs.search.value;

		var queryData = { 
			// method: 'artist.search', 
			method: 'track.search', 
			api_key: this.props.lastKey, 
			// artist: querySearch, 
			track: querySearch, 
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
      		  	this.setState({ results: data.results.trackmatches.track });
      		  	console.log( this.state.results );
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
			<section className="app-container">

				<div className="searchBox container">

					<section className="searchBox__header">
						<h1>Musiko</h1>
						<h3>The cool way for listen music</h3>
					</section>

					<div className="col-md-offset-3 col-md-6 col-xs-12 col-lg-6 searchBox__form">	
						<form action="#" className="form-inline" onSubmit={this.search}>
							<div className="form-group search-form">
								<input type="text" className="form-control" placeholder="Your name" ref="search" />
								<button type="submit" className="btn btn-warning input-group">Buscar</button>
							</div>
						</form>
					</div>

				</div>
				
				<ListResults data={this.state.results}/>

			</section>
		);
	}
});

// Individual result item
var Result = React.createClass({

	render: function () {

		var thumbnail = this.props.queryData.image[ 2 ][ '#text' ] ? this.props.queryData.image[ 2 ][ '#text' ] : 'http://img2-ak.lst.fm/i/u/174s/449d1de5b35c6beaadcfa8dfb565214a.png',
			url = '/#/artist/' + encodeURIComponent( this.props.queryData.artist ),
			songUrl = '/#/song/' + encodeURIComponent( this.props.queryData.name );

      	return (
      	  	<div className="result-item">
      	  		<h4><a href={songUrl}>{this.props.queryData.name}</a></h4>
      	  		<a href={url}><img src={thumbnail} alt="placeholder+image"/></a>
      	  	  	<strong>Listeners:</strong> {this.props.queryData.listeners}
      	  	</div>
      	);
	} 
});

// List of results
var ListResults = React.createClass({

	getInitialState: function () {
		return {
			
		};
	},

	componentDidMount: function () {

	},

	render: function () {

		console.log( Object.keys( this.props.data ).length );

		if ( Object.keys( this.props.data ).length > 0 ) {
			var searchResults = this.props.data.map( function( result, i ) {
		      	return (
		      	  	<Result queryData={result} key={i}/>
		      	);
		    });
		}

		else {
			var searchResults = 'no results here';
		}

		return (
	      	<div className="results container">
	    		{searchResults}
	      	</div>
	    );

	} 
});

// SearchBox component
var Musiko = React.createClass({

	getInitialState: function () {

		return {
			
		};
	},
	
	render: function () {
		return (
			<div className="musiko">
				<SearchBox url={this.props.apiUrl} lastKey={this.props.apiKey}/>
			</div>
		)
	}
});

// Export component
window.Musiko = Musiko;