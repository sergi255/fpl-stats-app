//CSS
import './css/App.css';

import React from 'react';

//Pages
import Home from './pages/Home';
import About from './pages/About';
import Gameweek from './pages/Gameweek';

//Libraries
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';


function App() {
  return (
    <Box>
      <Routes>
        <Route path ="/" element ={<Home/>}/>
        <Route path ="/about/:teamId" element ={<About/>}/>
        <Route path ="/about/:teamId/:gameweek" element ={<Gameweek/>}/>
      </Routes>
    </Box>
  );
}

export default App;