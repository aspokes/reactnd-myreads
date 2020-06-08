import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import SearchForm from './Search'
import './App.css'

class BooksApp extends React.Component {
  constructor() {
    super();

    this.changeShelf = this.changeShelf.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.changeSearchShelf = this.changeSearchShelf.bind(this);
  }

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searchitem: '',
    shelves : {
      currentlyReading : {} ,
      wantToRead : {},
      read : {}
    },
    books : {},
    searchResults: {},
    searchShelves: {
      
    },
    countResults: 0
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.sendToShelf(books);
      })
  }

   handleSearch(event){
     const item = event.target.value;
     this.setState({searchitem : item});

     BooksAPI.search(item, 20)
     .then((response) => {
       if(response){
         this.groupSearchBooks(response);
        this.setState(() => ({countResults: response.length, searchResults : response}));
       }else{
        this.setState(() => ({countResults: 0}));
       }
      
     });
   }

  groupSearchBooks(books){  
    let searchShelves = {
      currentlyReading : {} ,
      wantToRead : {},
      read : {},
      none : {}
    };
   
    let bl = Object.keys(books).map((key) => {
      
      return searchShelves[books[key].shelf] = [...searchShelves[books[key].shelf], books[key]];
    });
    console.log(bl);

    this.setState({ searchShelves : searchShelves});
    
  }

  changeSearchShelf(...vs){  
    
    BooksAPI.update({id : vs[0]}, vs[1])
      .then((response) => {
        
        this.rearrangeSearchShelf(vs[0], vs[1]);
      })
  }

  rearrangeSearchShelf(bookid, newshelf){
    let results = this.state.searchResults;
    let books = this.state.books; 
    
    
    Object.keys(results).map((key) => {
      
      if(results[key].id === bookid){ 
        results[key].shelf = newshelf;
        books[books.length] = results[key];   
        delete results[key];
      }
      return key;
    });
      
    this.setState({ searchResults : results });
    this.sendToShelf(books);
    return books;
    }

  changeShelf(...vs){  
   
    BooksAPI.update({id : vs[0]}, vs[1])
      .then((response) => {
        this.rearrangeShelf(vs[0], vs[1]);
      })
  }

  rearrangeShelf(bookid, newshelf){
   
    let books = this.state.books;   
    
    Object.keys(books).map((key) => {
      if(books[key].id === bookid){        
        books[key].shelf = newshelf;
      }
      return books;
  });
 
  this.sendToShelf(books);
  }

  sendToShelf(books){  
    let shelves = {
      currentlyReading : {} ,
      wantToRead : {},
      read : {}
    };

    Object.keys(books).map((key) => {
      
      return shelves[books[key].shelf] = [...shelves[books[key].shelf], books[key]];
    });
  
    this.setState({ shelves : shelves, books: books });
  }

  render() {
   
    
    return (
      <div className="app">
        <Route exact path='/search' render={(props) => (
          <SearchForm {...props} handleSearch={this.handleSearch} searchResults={this.state.searchShelves} changeShelf={this.changeSearchShelf} countResults={this.state.countResults}/>
         )} />
         <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>                
                <Bookshelf name="Currently Reading" books={this.state.shelves.currentlyReading} changeShelf={this.changeShelf} shelfname="currentlyReading"/>              
                <Bookshelf name="Want to Read" books={this.state.shelves.wantToRead} changeShelf={this.changeShelf} shelfname="wantToRead"/>
                <Bookshelf name="Read" books={this.state.shelves.read} changeShelf={this.changeShelf} shelfname="read"/>
              </div>
            </div>
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link
                to='/search'                           
              >
                Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
