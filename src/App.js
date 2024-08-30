import React, { useContext } from 'react';
import { NewsContext, NewsProvider } from './Newscontext';
import './App.css';  // Import the CSS file
import items from './img-Desk.jpg'


export const NewsList = () => {
  const { currentItems } = useContext(NewsContext);

  const onCardClickHandler = (id) => {

     let data = currentItems.filter((items) => items.id !== id);

     console.log(data, id);



  }

  return (
    <div className='upper_div'>
      {currentItems.map((item) => (
        <div key={item.id}>
          <i className="fa fa-close" onClick={() => onCardClickHandler(item.id)}></i>

          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <img src={items} />
        </div>
      ))}
    </div>
  );
};

export const Pagination = () => {
  const { news, paginate, currentPage } = useContext(NewsContext);

  return (
    <div className="pagination">
      {Array.from({ length: Math.ceil(news.length / 6) }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <NewsProvider>
      <>
        <NewsList />
        <Pagination />
      </>
    </NewsProvider>
  );
};

export default App;
