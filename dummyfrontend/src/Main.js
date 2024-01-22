import './App.css';
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import { React, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Add from './Components/add/Add';
import Show from './Components/show/Show';
import Update from './Components/update/Update';

function Main() {
  const location = useLocation();
  const currentRoute = location.pathname;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);


  return (
    <>
      {currentRoute !== "/login" && <Navbar />}

      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/add" element={<Add />} />
            <Route path="/" element={<Show />} />
            <Route path="/update/:id" element={<Update />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default Main;
