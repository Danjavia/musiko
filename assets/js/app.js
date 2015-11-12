'use strict';

var data = [
  	{ author: "Pete Hunt", text: "This is one comment" },
  	{ author: "Jordan Walke", text: "This is *another* comment" }
];

// Comment box
var CommentBox = React.createClass({

  	loadCommentsFromServer: function() {
  	  	$.ajax({
  	  	  	url: this.props.url,
  	  	  	dataType: 'json',
  	  	  	cache: false,

  	  	  	success: function( data ) {
  	  	  	  	this.setState({ data: data });
  	  	  	}.bind(this),
  	  	  	
  	  	  	error: function( xhr, status, err ) {
  	  	  	  	console.error(this.props.url, status, err.toString());
  	  	  	}.bind(this)
  	  	});
  	},

  	getInitialState: function() {
  	  	return {data: []};
  	},

  	componentDidMount: function() {
  	  	this.loadCommentsFromServer();
    	setInterval( this.loadCommentsFromServer, this.props.pollInterval );
  	},

	render: function() {
		return (
			<div className="commentBox">
				<h1>Comments</h1>
		        <CommentList data={this.state.data}/>
		        <CommentForm />
			</div>
		);
	}
});

// Comment list
var CommentList = React.createClass({

  	render: function() {
  		var commentNodes = this.props.data.map( function ( comment ) {
	      	return (
	      	  	<Comment key={comment.id} author={comment.author}>
	      	  	  	{comment.comment}
	      	  	</Comment>
	      	);
	    });

  	  	return (
  	  	  	<div className="commentList">
  	  	  	  	{commentNodes}
  	  	  	</div>
  	  	);
  	}
});

// Comment form
var CommentForm = React.createClass({
  	render: function() {
  	  	return (
  	  	  	<div className="commentForm">
  	  	  	  	<form className="commentForm">
			        <input type="text" placeholder="Your name" />
			        <input type="text" placeholder="Say something..." />
			        <input type="submit" value="Post" />
			    </form>
  	  	  	</div>
  	  	);
  	}
});

// Comment
var Comment = React.createClass({
	rawMarkup: function () {
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    	return { __html: rawMarkup };
	},

  	render: function() {
  	  	return (
  	  	  	<div className="comment">
  	  	    	<h2 className="commentAuthor">
  	  	      		{this.props.author}
  	  	    	</h2>
  	  	    	<span dangerouslySetInnerHTML={this.rawMarkup()} />
  	  	  	</div>
  	  	);
  	}
});

ReactDOM.render(
	<CommentBox url="http://infinity.app/api/comments" pollInterval={20000}/>,
	document.getElementById( 'content' )
);