import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
        const response2 = await axios.get('https://www.googleapis.com/books/v1/volumes?q=sherlock+holmes');
        const data = response1.data.items.concat(response2.data.items);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchQuery}`);
      setSearchResults(response.data.items);
      setLoading(false);
      setError(null); 
    } catch (error) {
      setError(error); 
      setLoading(false);
    }
  };
  

  const renderBookLists = () => {
    if (searchResults.length > 0) {
      return (
        <div>
          <h2>Search Results</h2>
          <BookList books={searchResults} />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Top Picks</h2>
          <BookList books={books.slice(0, 3)} />
          <h2>All Books</h2>
          <BookList books={books.slice(3)} />
        </div>
      );
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="container">
          <h1>Virtual Bookstore</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </nav>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error: {error.message}</div>
      ) : (
        renderBookLists()
      )}
    </div>
  );
}

export default App;
