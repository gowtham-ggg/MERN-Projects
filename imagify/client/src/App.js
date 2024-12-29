import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home';
import BuyCredit from './Pages/BuyCredit';
import Result from './Pages/Result';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import { AppContext } from './Context/AppContext';

const App = () => {

  const {showLogin} = useContext(AppContext)

  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <NavBar/>
      { showLogin &&<LogIn />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/buy' element={<BuyCredit />} />
        <Route path='/result' element={<Result />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
