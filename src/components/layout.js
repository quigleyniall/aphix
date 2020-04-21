import React from 'react';
import Nav from './nav';

const Layout = ({ children }) => (
  <div className="container">
    <Nav />
    {children}
  </div>
);

export default Layout;