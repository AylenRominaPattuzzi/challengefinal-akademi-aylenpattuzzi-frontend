import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Login from './User/Login';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import { checkAuthThunk } from '../redux/actions/authActions';
import RegisterUser from './User/RegisterUser';



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  return (
    <div className="ui container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/register" element={<RegisterUser />} />
      </Routes>
    </div>
  );
};

export default App;