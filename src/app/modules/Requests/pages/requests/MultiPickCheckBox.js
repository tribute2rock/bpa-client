import React from 'react';
import { addMultipick, removeRequestMultipick } from '../../../../../redux/user/multiPickSlice';

const MultiPickCheckBox = React.memo(({ requestId, dispatch }) => {
  return (
    <input
      type='checkbox'
      onChange={(e) => {
        if (e.target.checked) {
          dispatch(addMultipick(requestId));
        } else {
          dispatch(removeRequestMultipick(requestId));
        }
      }}  
    />
  );
});

export default MultiPickCheckBox;
