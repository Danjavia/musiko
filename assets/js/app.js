'use strict';

// var API_LAST_KEY = "a8da4176b3e227778d267fdc4df7ab36";
// var API_LAST_URL = "http://ws.audioscrobbler.com/2.0/?";

var SearchBox = React.createClass({

	getInitialState: function () {
		return {
			API_LAST_KEY: "a8da4176b3e227778d267fdc4df7ab36",
			API_LAST_URL: "http://ws.audioscrobbler.com/2.0/?"
		};
	},

	search: function ( e ) {
		e.preventDefault();
		console.log( 'form sended', this.props.API_LAST_URL );
	},

	render: function () {
		return (
			<div className="searchBox">
				<form action="#" className="form-inline" onSubmit={this.search}>
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Your name" ref="author" />
						<button type="submit" className="btn btn-success input-group">Buscar</button>
					</div>
				</form>
			</div>
		);
	}
});

ReactDOM.render(
  	<SearchBox/>,
  	document.getElementById( 'content' )
);