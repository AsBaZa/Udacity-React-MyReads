const BookShelfChanger = ({ shelf, onShelf }) => {
  const handleChange = (event) => {
    event.preventDefault();
    onShelf(event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select onChange={handleChange} defaultValue={shelf}>
        <option value="none" disabled>
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
