import React, {Component} from 'react';
class Book extends Component {

render () {
  console.log();
    const { book, changeShelf, shelfname } = this.props;
    const imglink = book.imageLinks ? book.imageLinks.thumbnail : '';
    return (
        <li key="{book.id}">
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(" ${imglink} ")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => changeShelf(book.id, e.target.value)} defaultValue={shelfname}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" disabled={shelfname === 'currentlyReading' ? 'disabled' : ''}>Currently Reading</option>
                        <option value="wantToRead" disabled={shelfname === 'wantToRead' ? 'disabled' : ''}>Want to Read</option>
                        <option value="read" disabled={shelfname === 'read' ? 'disabled' : ''}>Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.map((author) => (author)) : ''}</div>
      </div>
        </li>
    );
  }
}
export default Book;