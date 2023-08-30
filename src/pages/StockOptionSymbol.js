import React, { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import Select from 'react-select'; 
import authservice from '../service/authservice';
import Sidepannel from '../sidepannel';
import MainHeader from '../MainHeader';

function StockOptionSymbol() {
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
    authservice.getOptionSymbol(data)
      .then((response) => {
        console.log(response.data);
        setSpsymbols(response.data);
        const symbols = response.data.spSymList.map((symbol) => ({
          label: symbol,
          value: symbol,
        }));
        setSymbolOptions(symbols);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSymbolChange = (selectedOption) => {
    setSelectedSymbol(selectedOption.value);
    console.log('Selected Symbol:', selectedOption.value);

    authservice.getOptionSymbol(selectedOption.value)
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
          <Form.Label>SELECT SYMBOL:</Form.Label>
          <Select
            options={symbolOptions}
            value={{ label: selectedSymbol, value: selectedSymbol }}
            onChange={handleSymbolChange}
            isSearchable={true} 
          />
        </Form.Group>
        
        {showTable && ( 
          <Table striped bordered hover>
            <thead style={{textAlign:"center"}}>
              <tr>
                
                <th style={{ border: '1px solid black' }}>INSTRUMENT</th>
                <th style={{ border: '1px solid black' }}>SYMBOL</th>
                <th style={{ border: '1px solid black' }}>TIMESTAMP</th>
               

              </tr>
            </thead>
            <tbody>
              {spList.map((stock, index) => (
                <tr key={index}>
                 
                  <td style={{ border: '1px solid black' }}>{stock.instrument}</td>
                  <td style={{ border: '1px solid black' }}>{stock.symbol}</td>
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

export default StockOptionSymbol;
