import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import TokenList from './pages/TokenList';
import User from './pages/User';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import Login from './pages/Login';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { Provider } from 'react-redux';
import { LOGOUT } from './actions/types';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              <Home />
              {/* <Footer /> */}
            </>
          } />
          <Route path='/admin' element={
            <>
              <Navbar />
              <Admin />
              {/* <Footer /> */}
            </>
          } />
          <Route path='/user' element={
            <>
              <Navbar />
              <User />
              {/* <Footer /> */}
            </>
          } />
          <Route path='/token' element={
            <>
              <Navbar />
              <TokenList />
              {/* <Footer /> */}
            </>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
