import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Bookshelfsearch from './Bookshelfsearch'
import './App.css'

class SearchForm extends Component {

render () {
  const results = this.props.searchResults;
  // console.log(results);
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
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" onChange={this.props.handleSearch} placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
      {        
      Object.keys(results).map((key) => {  
        
       const k = <Bookshelfsearch name={results[key].shelf} books={results[key]} changeShelf={this.props.changeShelf} shelfname={results[key].shelf}/> 
       return k;
        
    })
  }
      
      </div>
    </div>
    );
  }
}
export default SearchForm;