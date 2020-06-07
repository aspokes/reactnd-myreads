import React, { Component } from 'react';
import Book from './Book'

class Bookshelf extends Component {

  render() {
      const { name, books } = this.props;
      
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            
              {Object.keys(books).map((key) => (
                  <Book key={key} book={books[key]} />
                ))}
              
            
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;