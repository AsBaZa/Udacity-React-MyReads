import Book from "./Book";

const BookShelf = ({ title, status, books, onShelf }) => {
  const handleOnShelf = (book, shelf) => {
    onShelf(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .map((book) => {
              return <Book key={book.pk} book={book} status={status} onShelf={handleOnShelf}/>;
            })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
