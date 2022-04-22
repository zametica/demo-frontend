import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router'
import Home from './screens/Home/Home';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
