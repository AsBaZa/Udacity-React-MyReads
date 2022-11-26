import Book from "./Book";

const BookShelf = ({ title, status, books }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .map((book) => {
              return <Book key={book.pk} book={book} status={status} />;
            })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
