import React, { Component } from 'react';

class GlobalEventHandlers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableRightClick: true, // Set this to true to initially disable right-click
      disableCtrlShiftI: true, // Set this to true to initially disable Ctrl+Shift+I
      disableCtrlShiftC: true, // Set this to true to initially disable Ctrl+Shift+C
    };
  }

  componentDidMount() {
    
    if (this.state.disableRightClick) {
      window.addEventListener('contextmenu', this.handleContextMenu);
    }

   
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    
    window.removeEventListener('contextmenu', this.handleContextMenu);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleContextMenu = (e) => {
    if (this.state.disableRightClick) {
      e.preventDefault();
    }
  };

  handleKeyDown = (e) => {
   
    if (
      (this.state.disableCtrlShiftI && e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (this.state.disableCtrlShiftC && e.ctrlKey && e.shiftKey && e.key === 'C')
    ) {
      e.preventDefault();
      console.warn('Ctrl+Shift+I and Ctrl+Shift+C are disabled.');
    }
  };

  
  toggleRightClick = () => {
    this.setState((prevState) => ({
      disableRightClick: !prevState.disableRightClick,
    }));
  };

  
  toggleCtrlShiftI = () => {
    this.setState((prevState) => ({
      disableCtrlShiftI: !prevState.disableCtrlShiftI,
    }));
  };

  
  toggleCtrlShiftC = () => {
    this.setState((prevState) => ({
      disableCtrlShiftC: !prevState.disableCtrlShiftC,
    }));
  };

  render() {
    return this.props.children;
  }
}

export default GlobalEventHandlers;
