import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import './App.css'

class SearchForm extends Component {
 
render () {

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
      {/* {this.props.myshelves ? ( */}
      <div className="search-books-results">
        
     <Bookshelf name="Search Results" books={this.props.searchResults} changeShelf={this.props.changeShelf} shelfname="none"/>
    
      </div>
      
    </div>
    );
  }
}
export default SearchForm;