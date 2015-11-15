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
			<div className="searchBox">
				<form action="#" className="form-inline" onSubmit={this.search}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Your name" ref="search" />
						<button type="submit" className="btn btn-success input-group">Buscar</button>
					</div>
				</form>
				<ListResults data={this.state.results}/>
			</div>
		);
	}
});

// Individual result item
var Result = React.createClass({

	render: function () {

		var thumbnail = this.props.queryData.image[ 2 ][ '#text' ] ? this.props.queryData.image[ 2 ][ '#text' ] : 'http://img2-ak.lst.fm/i/u/174s/449d1de5b35c6beaadcfa8dfb565214a.png',
			url = '/#/artist/' + encodeURIComponent( this.props.queryData.artist );

      	return (
      	  	<div className="result-item">
      	  		<h2>{this.props.queryData.name}</h2>
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
	      	<div className="results">
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