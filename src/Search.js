import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import './App.css'

class SearchForm extends Component {
 
render () {
  const { none, currentlyReading, wantToRead, read} = this.props.shelves;
  
    return (
      <div className="search-books">
      <div className="search-books-bar">
        
        <Link
          to='/'  
          className="close-search"                                         
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" onChange={this.props.handleSearch}/>
        </div>
      </div>
    
      <div className="search-books-results">
        {none && (
          <Bookshelf name="Search Results" books={none} changeShelf={this.props.changeShelf} shelfname="none"/>
        )}

        {currentlyReading && (
          <Bookshelf name="Currently Reading" books={currentlyReading} changeShelf={this.props.changeShelf} shelfname="currentlyReading"/>
        )}

        {wantToRead && (
          <Bookshelf name="Want to Read" books={wantToRead} changeShelf={this.props.changeShelf} shelfname="wantToRead"/>
        )}

        {read && (
          <Bookshelf name="Read" books={read} changeShelf={this.props.changeShelf} shelfname="read"/>
        )}
     
    
      </div>
      
    </div>
    );
  }
}
export default SearchForm;