import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const ListBooks = ({ selectedBooks, onShelf }) => {
  return (
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
            books={selectedBooks.filter((name) => name.shelf === "wantToRead")}
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
        <Link to="/search">Add a book</Link>
        {/* <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a> */}
      </div>
    </div>
  );
};

export default ListBooks;
