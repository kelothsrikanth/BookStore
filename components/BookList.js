import React, { useState } from 'react';
import './BookList.css';

function BookList({ books }) {
  const [expandedBookId, setExpandedBookId] = useState(null);

  const handleImageClick = (bookId) => {
    if (expandedBookId === bookId) {
      setExpandedBookId(null); 
    } else {
      setExpandedBookId(bookId); 
    }
  };

  return (
    <div className="book-container">
      {books.map(book => (
        <div key={book.id} className="book">
          <h3>{book.volumeInfo.title}</h3>
          <p><strong>Authors:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
          <img 
            src={book.volumeInfo.imageLinks.thumbnail} 
            alt={book.volumeInfo.title} 
            onClick={() => handleImageClick(book.id)} 
          />
          {expandedBookId === book.id && ( 
            <p><strong>Description:</strong> {book.volumeInfo.description || 'No description available'}</p>
          )}
          
        </div>
      ))}
    </div>
  );
}

export default BookList;
