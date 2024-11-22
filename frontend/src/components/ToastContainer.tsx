// _app.js or index.js
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import React from 'react';

interface ToastAlertProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

function toastAlert({ Component, pageProps }: ToastAlertProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default toastAlert;
