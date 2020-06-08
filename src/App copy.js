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
    this.searchchangeShelf = this.searchchangeShelf.bind(this);
    this.sendToSearchShelf = this.sendToSearchShelf.bind(this);
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
    myshelves: {
      currentlyReading : {} ,
      wantToRead : {},
      read : {},
      none : {}
    }
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
      // this.setState({searchResults : response});
      this.sendToSearchShelf(response);
     });
   }

  searchchangeShelf(...vs){  
    
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
      
    this.sendToSearchShelf(results);
    this.sendToShelf(books);
    return books;
    }

    sendToSearchShelf(myresults){  
      console.log(myresults.length);
      let myshelves = {
        currentlyReading : {} ,
        wantToRead : {},
        read : {},
        none : {}
      };
  
      Object.keys(myresults).map((key) => {
        
        return myshelves[myresults[key].shelf] = [...myshelves[myresults[key].shelf], myresults[key]];
      });
    
      this.setState({ myshelves : myshelves, searchResults: myresults });
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
          
          <SearchForm {...props} handleSearch={this.handleSearch} myResults={this.state.myshelves} changeShelf={this.searchchangeShelf}/>
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
