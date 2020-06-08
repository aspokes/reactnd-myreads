import React, { Component } from 'react';
import Book from './Book'

class Bookshelfsearch extends Component {

  render() {
      const { name, books, changeShelf, shelfname } = this.props;
      console.log(this.props)
    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            
              
                  <Book book={books.id} changeShelf={changeShelf} shelfname={shelfname}/>
                
              
            
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelfsearch;