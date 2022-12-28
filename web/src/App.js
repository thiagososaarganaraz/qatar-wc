import React from 'react'
import {useEffect, useState} from 'react'
import Slider from './components/Slider';
import './styles/app.css';
import image from './assets/title.png'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Standings from './pages/Standings';

function App() {

  let data = [];

  return (
    <Router>
      <div className="container">
        <nav className='header-nav'>
          <div className='header-nav-left'>
            <Link to="/" className='nav-logo'>
              <img src={image}/>
            </Link>
          </div>
          <div className='header-nav-right'>
            <ul>
              <li>
              <Link to="/teams">
                Equipos
              </Link>
              </li>
              <li>
              <Link to="/matches">
                Partidos
              </Link>
              </li>
              <li>
              <Link to="/standings">
                Tablas
              </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/matches' element={<Matches/>}/>
          <Route path='/teams' element={<Teams/>}/>
          <Route path='/standings' element={<Standings/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
        <footer style={{fontFamily:'qatar2022'}}>
          <div className='footer-contact'>
            <h4>Contacto</h4>
            <ul>
              <li><a href='#'>GMAIL</a></li>
              <li><a href='#'>LINKEDIN</a></li>
              <li><a href='#'>IG</a></li>
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
