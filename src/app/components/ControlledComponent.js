import React from 'react';
import { useSelector } from 'react-redux';

export const ControlledComponent = ({ children, ...props }) => {
  const permissions = useSelector(state => state.user.data.user.permissions);

  if(props.canHaveAny) {
    for (let i = 0; i < props.canHaveAny.length; i++) {
      if (permissions.includes(props.canHaveAny[i])) {
        return children;
      }
    }
    return null;
  }

  if (permissions.includes(props.permission)) {
    return children;
  } else {
    return null;
  }
};
