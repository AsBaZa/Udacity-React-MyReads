const BookShelfChanger = ({ shelf, book, onShelf }) => {
  const handleChange = (event) => {
    event.preventDefault();
    onShelf(book, event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} defaultValue={shelf}>
        <option value="moveTo" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
