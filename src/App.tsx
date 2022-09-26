import React from 'react';
import logo from './logo.svg';
import './App.css';
import SponsorHome from './organism/SponsorHome/App';
import { ThemeProvider } from '@mui/system';
import { theme,} from './utils/theme';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const App: React.FC = () => {
  return (
     <ThemeProvider theme={theme}>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
          <Routes>
            <Route path="/" element={<SponsorHome/>} />
          </Routes>
      </BrowserRouter>
      </ThemeProvider>



  );
}


export default App;
