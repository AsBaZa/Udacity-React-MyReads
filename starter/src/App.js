import "./App.css";
import { useEffect, useState } from "react";
import ListBooks from "./ListBooks";
import SearchPage from "./SearchPage";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

function App() {
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

    if (newBook) {
      BooksAPI.update(book, shelf);
      setSelectedBooks(selectedBooks.concat({ ...book, shelf: shelf }));
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<ListBooks selectedBooks={selectedBooks} onShelf={onShelf} />}
      />
      <Route
        path="/search"
        element={
          <SearchPage
            selectedBooks={selectedBooks}
            handleOnShelf={handleOnShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;
