import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../../redux/user/userSlice';
import { clearMultipickState } from '../../../../redux/user/multiPickSlice';

const LogoutComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(clearMultipickState());
  }, [dispatch]);

  return <Redirect to="/auth/login" />;
};

export default LogoutComponent;
