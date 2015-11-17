// API Vars
var API_LAST_URL = "http://ws.audioscrobbler.com/2.0/",
	API_LAST_KEY = "a8da4176b3e227778d267fdc4df7ab36"

// Routes
routie({

	'': function() {
        
        // render the first page on a direct access
        ReactDOM.render(
            <Musiko apiUrl={API_LAST_URL} apiKey={API_LAST_KEY}/>,
            document.getElementById( 'content' )
        );
    },

    '/artist/:artistName': function( artistName ) {

        // render the first page on a direct access
        ReactDOM.render(
            <Artist apiUrl={API_LAST_URL} apiKey={API_LAST_KEY} artist={artistName}/>,
            document.getElementById( 'content' )
        );
    },

    '/track/:track/artist/:artist': function( track, artist ) {

        // render the first page on a direct access
        ReactDOM.render(
            <Track apiUrl={API_LAST_URL} apiKey={API_LAST_KEY} track={track} artist={artist}/>,
            document.getElementById( 'content' )
        );
    },

    '*': function() {
        // default go to landing page
        routie( '' );
    }
})