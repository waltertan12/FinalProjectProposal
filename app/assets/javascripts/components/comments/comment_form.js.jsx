(function (root) {
  if (root.CommentForm === "undefined") {
    root.CommentForm = {};
  }

  root.CommentForm = React.createClass({
    getInitialState: function () {
      return {body: ""};
    },
    _onSubmit: function (e) {
      e.preventDefault();
    },
    updateBody: function (e) {
      this.setState({body: e.target.value})
    },
    render: function () {
      return (
        <div className="comment-form">
          <h3>Add a comment</h3>
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <input type="text"
                     className="form-control"
                     onChange={this.updateBody} />
            </div>

            <input type="submit" 
                   className="btn btn-primary"
                   value="Submit"/>

          </form>
        </div>
      );
    }
  });
})(this);