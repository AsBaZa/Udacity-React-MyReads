import BookShelfChanger from "./BookShelfChanger";

const Book = ({ book, status }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={book.image}></div>
          <BookShelfChanger status={status}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    </li>
  );
};

export default Book;