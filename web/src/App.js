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
        <div className='container' style={{
          marginTop: '3rem'
        }}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/matches' element={<Matches/>}/>
            <Route path='/teams' element={<Teams/>}/>
            <Route path='/standings' element={<Standings/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
        </div>
        <footer style={{
          fontFamily:'qatar2022',
          borderTop: '1px solid #AAA'
          }}>
          <div className='footer-contact'>
            <ul>
              <li><a href='#'>GMAIL</a></li>
              <li><a href='#'>LINKEDIN</a></li>
              <li><a href='#'>IG</a></li>
            </ul>
            <p style={{
              fontSize: '12px'
            }}>powered by <a href='https://github.com/raminmr/free-api-worldcup2022' target='_blank' style={{
              color: '#9B072E',
              textShadow: '1px 1px 2px black'
            }}>WorldCup API ©</a></p>
            <p style={{
              fontSize: '12px',
              textAlign: 'right',
              marginRight: '1rem',
              textShadow: '5px 5px 5px black'
            }}>
              Thiago Sosa Argañaraz
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
