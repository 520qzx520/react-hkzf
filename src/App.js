import React from 'react';
import {  useRoutes } from 'react-router-dom';
import routes from './Routes';
import RouterGuards from './Routes/RouterGuards'
function App() {
  const elements = useRoutes(routes);
  return (
    <div className='App'>   
    <RouterGuards/>
      {elements} 
    </div>
  );
}

export default App;
