import { Input } from 'reactstrap';
import React from 'react';
const CustomSelect = props => {
  return (
    <Input className={props.request?'form-control pt-2 is-invalid':'rounded'} name={props.name} type="select" value={props.value} onChange={props.handleChange}>
      {props.options &&
        props.options.map(option => (
          <option value={option.id} key={option.id} disabled={props.request === true? 'disabled' : null}>
            {option.name}
          </option>
        ))}
    </Input>
  );
};

export default CustomSelect;
