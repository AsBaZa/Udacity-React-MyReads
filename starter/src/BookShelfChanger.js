const BookShelfChanger = ({ status }) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={() => {console.log('Done')}}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading" selected={status === "currentlyReading"}>Currently Reading</option>
        <option value="wantToRead" selected={status === "wantToRead"}>Want to Read</option>
        <option value="read" selected={status === "read"}>Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookShelfChanger;
