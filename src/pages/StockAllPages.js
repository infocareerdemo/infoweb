import React, { useState, useEffect } from 'react';
import { Form, Table, Nav, Tab } from 'react-bootstrap';
import Select from 'react-select';
import authservice from '../service/authservice';
import StockFutureList from './StockFutureList';
import StockCashSymbol from './StockCashSymbol';
import SymbolDropdown from './SymbolDropdown';
import StockOptionSymbol from './StockOptionSymbol';
import MainHeader from "../components/mainheader/MainHeader";
import Sidepannel from "../components/sidebar/sidepannel";

function StockAllPages() {

  return (
    <div>
      <MainHeader/>
       <Sidepannel/>
      <div className="page-wrapper">
        
        <Tab.Container id="symbol-tabs" defaultActiveKey="option">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="StockPrice">StockPrice Symbol</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="StockCash">StockCash Symbol</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="StockFuture">StockFuture Symbol</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="StockOption">StockOption Symbol</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
          <Tab.Pane eventKey="StockPrice" className="center-content">
            <SymbolDropdown/>
            </Tab.Pane>
            <Tab.Pane eventKey="StockCash" className="center-content">
             <StockCashSymbol/>
            </Tab.Pane>
            <Tab.Pane eventKey="StockFuture">
             <StockFutureList/>
            </Tab.Pane>
            <Tab.Pane eventKey="StockOption">
            <StockOptionSymbol/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
}

export default StockAllPages;
