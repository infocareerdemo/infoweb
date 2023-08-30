import React, { useEffect, useRef } from 'react';

const SessionTimeout = ({ timeoutMinutes }) => {
  const logoutTimerRef = useRef(null);

  const resetTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    logoutTimerRef.current = setTimeout(logoutUser, timeoutMinutes * 60 * 1000);
  };

  const logoutUser = () => {
   
    console.log('Session timed out. Logging out user...');
    localStorage.clear();
    window.location.href = '/Login';
  };

  useEffect(() => {
    resetTimer();

    const events = ['mousedown', 'keydown', 'mousemove', 'touchstart'];
    const resetTimerOnActivity = () => {
      resetTimer();
    };
    events.forEach((event) => {
      document.addEventListener(event, resetTimerOnActivity);
    });

    
    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimerOnActivity);
      });
    };
  }, [timeoutMinutes]);

 
  return null;
};

export default SessionTimeout;