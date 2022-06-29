import React from 'react';
import { useRoutes, Routes, Route } from 'react-router-dom';
import routes from './Routes';
import Login from './pages/Login';
import RouterGuards from './Routes/RouterGuards';
function App() {
  const elements = useRoutes(routes);
  return (
    <div className='App'>
      {/* <RouterGuards/> */}
      {elements}
      {/* <Routes>
    <Route path="/login" element={<Login />}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
