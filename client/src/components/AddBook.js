import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";

const getBookLists = gql`
  {
    books {
      id
      name
    }
  }
`;

const getAuthorLists = gql`
  {
    authors {
      id
      name
    }
  }
`;

const AddBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

class AddBooks extends Component {
  state = {
    name: "",
    genre: "",
    authorId: ""
  };

  renderAllAuthorInOptions = () => {
    const { loading, authors } = this.props.getAuthorLists;
    if (loading) {
      return <option disabled>Authors Loading...</option>;
    } else {
      return authors.map(author => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  onAddBookFormSubmit = e => {
    e.preventDefault();
    this.props.AddBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBookLists }]
    });
  };

  render() {
    return (
      <div id="book-list">
        <form onSubmit={this.onAddBookFormSubmit} id="add-book">
          <div className="field">
            <label>Book name:</label>
            <input
              type="text"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={e => this.setState({ genre: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Author:</label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              <option>Select author</option>
              {this.renderAllAuthorInOptions()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorLists, { name: "getAuthorLists" }),
  graphql(AddBookMutation, { name: "AddBookMutation" })
)(AddBooks);
