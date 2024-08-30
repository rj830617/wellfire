import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const NewsContext = createContext();

// Create a provider component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate current items based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <NewsContext.Provider value={{ news, currentItems, currentPage, paginate, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
