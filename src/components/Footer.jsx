import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-500 text-sm">
      <p className="mb-2">
        <i className="bi bi-check2-all text-primary mr-1"></i>
        Stay organized and boost your productivity
      </p>
      <p>Designed by WebSparks AI &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
