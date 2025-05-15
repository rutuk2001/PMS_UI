import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";
import store from "./store/index"
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
