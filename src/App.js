import './App.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import data from './data.json';
import { createRoot } from 'react-dom/client';

function Paginate({ itemsPerPage }){
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <App currentItems = {currentItems} />
      <ReactPaginate 
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        marginPagesDisplayed={0}
        renderOnZeroPageCount={null}
      />
    </>
  )
} 
function App({currentItems}) {
  console.log(currentItems)
  return(
    <div className = "items">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

let container = null;

document.addEventListener('DOMContentLoaded', function(event){
  if(!container){
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(<Paginate itemsPerPage = {10} />);
  }
})

export default App;
