import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ControlledRoute = ({ children, component, render, ...props }) => {
  const permissions = useSelector(state => state.user.data.user.permissions);
  if (props.canHaveAny) {
    for (let i = 0; i < props.canHaveAny.length; i++) {
      if (permissions.includes(props.canHaveAny[i])) {
        return <Route {...props} component={component} />;
      }
    }
    return null;
  }
  if (permissions.includes(props.permission)) {
    return <Route {...props} component={component} />;
  } else {
    return <Redirect to="/error/403" />;
  }
};
