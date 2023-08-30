import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form } from 'react-bootstrap';
import authservice from '../service/authservice';
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

function StockListDropdow() {
  const [stockPrices, setStockPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const pageSize = 100;
  const [symbolOptions, setSymbolOptions] = useState([]);

  useEffect(() => {
    getStockPriceList();
  }, []);

  const getStockPriceList = () => {
    authservice.getStockPriceList()
      .then((response) => {
        setStockPrices(response.data);
        const spinstrumentArray = response.data.map((stock) => stock.spinstrument);
        const spsymbolArray = response.data.map((stock) => stock.spsymbol);
        console.log('spinstrument Array:', spinstrumentArray);
        console.log('spsymbol Array:', spsymbolArray);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInstrumentChange = (event) => {
    const selectedInstrumentValue = event.target.value;
    setSelectedInstrument(selectedInstrumentValue);
    setCurrentPage(1);

    const symbolsForInstrument = stockPrices
      .filter((stock) => stock.spinstrument === selectedInstrumentValue)
      .map((stock) => stock.spsymbol);

    setSelectedSymbol('');
    setSymbolOptions(symbolsForInstrument);
    console.log('Selected Instrument:', selectedInstrumentValue);
  };

  const handleSymbolChange = (event) => {
    const selectedSymbolValue = event.target.value;
    setSelectedSymbol(selectedSymbolValue);
    setCurrentPage(1);
    console.log('Selected Symbol:', selectedSymbolValue);
  };

  
  const isDataVisible = selectedInstrument !== '' && selectedSymbol !== '';

  const filteredStocks = stockPrices.filter((stock) => {
    return (
      (!selectedInstrument || stock.spinstrument === selectedInstrument) &&
      (!selectedSymbol || stock.spsymbol === selectedSymbol)
    );
  });

  const numberOfItems = filteredStocks.length;
  const indexOfLastStock = currentPage * pageSize;
  const indexOfFirstStock = indexOfLastStock - pageSize;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const instrumentOptions = [...new Set(stockPrices.map((stock) => stock.spinstrument))];

  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <h1>Stock Prices</h1>

        <Form.Group>
          <Form.Label>Select Instrument:</Form.Label>
          <Form.Control
            as="select"
            value={selectedInstrument}
            onChange={handleInstrumentChange}
          >
            <option value="">SELECT SPINSTRUMENT</option>
            {instrumentOptions.map((instrument, index) => (
              <option key={index} value={instrument}>
                {instrument}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Select Symbol:</Form.Label>
          <Form.Control
            as="select"
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            <option value="">SELECT SPSYMBOL</option>
            {symbolOptions.map((symbol, index) => (
              <option key={index} value={symbol}>
                {symbol}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {isDataVisible ? (
          <>
            <p>Number of items under selected spinstrument: {numberOfItems}</p>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ border: '1px solid black' }}>SPID</th>
                  <th style={{ border: '1px solid black' }}>SPISIN</th>
                  <th style={{ border: '1px solid black' }}>SPINSTRUMENT</th>
                  <th style={{ border: '1px solid black' }}>SPSYMBOL</th>
                </tr>
              </thead>
              <tbody>
                {currentStocks.map((stock, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black' }}>{stock.spid}</td>
                    <td style={{ border: '1px solid black' }}>{stock.spisin}</td>
                    <td style={{ border: '1px solid black' }}>{stock.spinstrument}</td>
                    <td style={{ border: '1px solid black' }}>{stock.spsymbol}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Pagination>
            
            </Pagination>
          </>
        ) : (
          <p>Please select an instrument and a symbol to view data.</p>
        )}
      </div>
    </div>
  );
}

export default StockListDropdow;
