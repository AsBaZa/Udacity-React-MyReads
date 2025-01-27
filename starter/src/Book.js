import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, shelf, onShelf }) => {
  const handleOnShelf = (book, shelf) => {
    onShelf(book, shelf);
  };

  const backgroundImage =
    book.imageLinks !== undefined
      ? `url(${book.imageLinks.smallThumbnail})`
      : "white";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          {/* TODO: solucionar el ratio de la imagen */}
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage: backgroundImage,
            }}
          ></div>
          <BookShelfChanger shelf={shelf} book={book} onShelf={handleOnShelf} />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map((author) => (
          <div key={author} className="book-authors">
            {author}
          </div>
        ))}
      </div>
    </li>
  );
};

export default Book;
