import React, { Component } from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

const getBook = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

class BookList extends Component {
  renderBookDetails = () => {
    const { book } = this.props.data;
    if (!book) {
      return <div>No book selected...</div>;
    } else {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map(book => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  render() {
    return (
      <div id="book-details">
        <h1>Book details...</h1>
        {this.renderBookDetails()}
      </div>
    );
  }
}

export default graphql(getBook, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookList);
