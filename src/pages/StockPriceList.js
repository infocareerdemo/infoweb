import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';
import authservice from '../service/authservice';
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

function StockPriceList() {
  const [stockPrices, setStockPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100; 

  useEffect(() => {
   
    getStockPriceList();
  }, []);

  const getStockPriceList = () => {
    authservice.getStockPriceList()
        .then((response) => {
            setStockPrices(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        })
}
  

  const indexOfLastStock = currentPage * pageSize;
  const indexOfFirstStock = indexOfLastStock - pageSize;
  const currentStocks = stockPrices.slice(indexOfFirstStock, indexOfLastStock);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>

             <MainHeader />
             <Sidepannel />
             <div className="page-wrapper">
      <h1>Stock Prices</h1>

      <Table striped bordered hover>
        <thead style={{  border: '1px solid black' , textAlign:"center"}}>
          <tr>
            <th style={{  border: '1px solid black'}}>SPID</th>
            <th style={{  border: '1px solid black'}}>SPISIN</th>
            <th style={{  border: '1px solid black'}}>SPINSTRUMENT</th>
            <th style={{  border: '1px solid black'}}>SPSYMBOL</th>
            {/* Add other table headers */}
          </tr>
        </thead>
        <tbody>
          {currentStocks.map((stock) => (
            <tr key={stock.id}>
             <td style={{  border: '1px solid black'}}>{stock.spid}</td>
              <td style={{  border: '1px solid black'}}>{stock.spisin}</td>
              <td style={{  border: '1px solid black'}}>{stock.spinstrument}</td>
              <td style={{  border: '1px solid black'}}>{stock.spsymbol}</td>
              {/* Add other table cells */}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(stockPrices.length / pageSize) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
    </div>
  );
}

export default StockPriceList;
