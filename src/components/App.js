import React from 'react';
import Header from './Header';
import LoadingBar from 'react-redux-loading-bar';

export default ({ children }) => {
  return(
    <div>
      <Header />
      <LoadingBar />
      {children}
    </div>
  );
};
