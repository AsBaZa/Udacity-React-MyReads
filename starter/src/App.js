import "./App.css";
import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState([]);

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
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
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
