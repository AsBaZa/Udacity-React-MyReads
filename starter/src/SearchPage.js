import { Link } from "react-router-dom";
import BookShelfChanger from "./BookShelfChanger";
import { useState } from "react";
import * as BooksAPI from "./BooksAPI";

const SearchPage = ({ selectedBooks, handleOnShelf }) => {
  const [searchedBooks, setSearchedBooks] = useState([]);

  const handleSearchChange = (event) => {
    event.preventDefault();
    const text = event.target.value;
    console.log(text);
    if (text.length >= 1) {
      BooksAPI.search(text, 20).then((response) => {
        const cleanResponse = response.map((r) => {
          for (let book of selectedBooks) {
            if (r.id === book.id) {
              r.shelf = book.shelf;
            }
          }
          return r;
        });
        response.length > 0
          ? setSearchedBooks(cleanResponse)
          : setSearchedBooks([]);
      });
    } else {
      setSearchedBooks([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map((book) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {/* TODO: solucionar el ratio de la imagen */}
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 188,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                      }}
                    ></div>
                    <BookShelfChanger
                      shelf={book.shelf === undefined ? "none" : book.shelf}
                      book={book}
                      onShelf={handleOnShelf}
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  {Array.isArray(book.authors) &&
                    book.authors.map((author) => (
                      <div key={author} className="book-authors">
                        {author}
                      </div>
                    ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
