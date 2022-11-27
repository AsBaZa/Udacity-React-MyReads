import "./App.css";
import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import BookShelfChanger from "./BookShelfChanger";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);

  useEffect(() => {
    const getSelectedBooks = async () => {
      const resp = await BooksAPI.getAll();
      setSelectedBooks(resp);
    };

    getSelectedBooks();
  }, []);

  const onShelf = (book, shelf) => {
    const newSelectedBooks = selectedBooks.map((selectedBook) => {
      if (selectedBook.id !== book.id) {
        return selectedBook;
      } else {
        BooksAPI.update(selectedBook, shelf);
        return {
          ...selectedBook,
          shelf: shelf,
        };
      }
    });

    setSelectedBooks(newSelectedBooks);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    const text = event.target.value;
    if (text.length >= 3) {
      BooksAPI.search(text, 20).then((response) => {
        const cleanResponse = response.map((r) => {
          for (let book of selectedBooks) {
            if (r.id === book.id){
              r.shelf = book.shelf;
            }
          }
          return r
        })        
        response.length > 0 ? setSearchedBooks(cleanResponse) : setSearchedBooks([]);
      });
    }
  };

  const handleOnShelf = (book, shelf) => {
    let newBook = true;
    const newSelectedBooks = selectedBooks.map((selectedBook) => {
      if (selectedBook.id !== book.id) {
        return selectedBook;
      } else {
        newBook = false;
        BooksAPI.update(selectedBook, shelf);
        return {
          ...selectedBook,
          shelf: shelf,
        };
      }
    });

    setSelectedBooks(newSelectedBooks);

    if (newBook){
      BooksAPI.update(book, shelf);
      setSelectedBooks(selectedBooks.concat({...book, shelf: shelf}));
    }

    
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
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
                          shelf={book.shelf === undefined ? 'none': book.shelf}
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
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                title="Currently Reading"
                shelf="currentlyReading"
                books={selectedBooks.filter(
                  (name) => name.shelf === "currentlyReading"
                )}
                onShelf={onShelf}
              />
              <BookShelf
                title="Want to Read"
                shelf="wantToRead"
                books={selectedBooks.filter(
                  (name) => name.shelf === "wantToRead"
                )}
                onShelf={onShelf}
              />
              <BookShelf
                title="Read"
                shelf="read"
                books={selectedBooks.filter((name) => name.shelf === "read")}
                onShelf={onShelf}
              />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
