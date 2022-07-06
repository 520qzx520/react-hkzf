import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//导入 组件 react-virtualized 样式
import 'react-virtualized/styles.css';
import {BrowserRouter ,HashRouter} from 'react-router-dom';
import './utils/url'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
