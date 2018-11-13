import React, { Component } from "react";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

import BookDetails from "./BookDetails";

const getBookLists = gql`
  {
    books {
      id
      name
    }
  }
`;

class BookList extends Component {
  state = {
    selectedBookId: null
  };

  renderAllBooks = () => {
    const { loading, books } = this.props.data;
    if (loading) {
      return <div>Books Loading...</div>;
    } else {
      return books.map(book => (
        <li
          onClick={e => this.setState({ selectedBookId: book.id })}
          key={book.id}
        >
          {book.name}
        </li>
      ));
    }
  };
  render() {
    return (
      <div id="book-list">
        <ul>{this.renderAllBooks()}</ul>
        <BookDetails bookId={this.state.selectedBookId} />
      </div>
    );
  }
}

export default graphql(getBookLists)(BookList);
