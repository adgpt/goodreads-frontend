import './index.css' // Importing the CSS file for styling

const BookCard = ({book}) => {
  return (
    <div className="book-card">
      <div className="title-and-date-container">
        <p className="book-title">{book.title} </p>

        <p className="book-rating">
          - Rating {book.rating} ({book.ratingCount} Reviews)
        </p>
      </div>
      <p className="book-detail">{book.description}</p>
      <p className="published-date">Published on {book.dateOfPublication}</p>
    </div>
  )
}

export default BookCard
