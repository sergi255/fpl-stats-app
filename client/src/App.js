//CSS
import './css/App.css';

import React from 'react';

//Pages
import Home from './pages/Home';
import About from './pages/About';

//Libraries
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';


function App() {
  return (
    <Box>
      <Routes>
        <Route path ="/" element ={<Home/>}/>
        <Route path ="/about/:teamId" element ={<About/>}/>
      </Routes>
    </Box>
  );
}

export default App;