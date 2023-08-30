import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import authservice from '../service/authservice';
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';

function StockCashSymbol() {
  const [data, setData] = useState('');
  const [spsymbols, setSpsymbols] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [spList, setSpList] = useState([]);
  const [showTable, setShowTable] = useState(false); 

  useEffect(() => {
    getStockPriceList();
  }, []);

  const getStockPriceList = () => {
    authservice.getStockCashSymbol(data)
      .then((response) => {
        console.log(response);
        setSpsymbols(response.data);
        const symbols = response.data.spSymList.map((symbol) => symbol);
        console.log(response.data);
        setSymbolOptions(symbols);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSymbolChange = (event) => {
    const selectedSymbolValue = event.target.value;
    setSelectedSymbol(selectedSymbolValue);
    console.log('Selected Symbol:', selectedSymbolValue);

    authservice.getStockCashSymbol(selectedSymbolValue)
      .then((response) => {
        console.log(response.data.spList);
        setSpList(response.data.spList);
        setShowTable(true); 
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <MainHeader />
      <Sidepannel />
      <div className="page-wrapper">
        <Form.Group>
          <Form.Label>Select Symbol:</Form.Label>
          <Form.Control
            as="select"
            value={selectedSymbol}
            onChange={handleSymbolChange}
          >
            <option value="">SELECT SYMBOL</option>
            {symbolOptions.map((symbol, index) => (
              <option key={index} value={symbol}>
                {symbol}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        
        {showTable && ( 
          <Table striped bordered hover>
            <thead style={{textAlign:"center"}}>
              <tr>
              
               
                
                <th style={{ border: '1px solid black' }}>SYMBOL</th>
                <th style={{ border: '1px solid black' }}>SERIES</th>
                <th style={{ border: '1px solid black' }}>TIMESTAMP</th>

              </tr>
            </thead>
            <tbody>
              {spList.map((stock, index) => (
                <tr key={index}>
                  
                 
                  <td style={{ border: '1px solid black' }}>{stock.symbol}</td>
                  <td style={{ border: '1px solid black' }}>{stock.series}</td>
                  <td style={{ border: '1px solid black' }}>{stock.timestamp}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default StockCashSymbol;
