import React from 'react';
import Select from 'react-select';
import { Form, Col } from 'react-bootstrap';

function CustomSelectReact({ label, options, value, onChange, onSelect, isMulti, isRequired }) {
  const isValueEmpty = isMulti ? !value || value.length === 0 : !value;
  const isInvalid = isRequired && isValueEmpty;
  return (
    <Col md={3}>
      <Form.Group controlId={`customSelect-${label}`}>
        <Form.Label>{label}</Form.Label>
        <Select
          className={`rounded ${isMulti ? 'basic-multi-select' : ''}`}
          options={options}
          isMulti={isMulti}
          value={value}
          onChange={onChange}
          onSelect={onSelect}
          isInvalid={isInvalid}
        />
        {true && <Form.Control.Feedback type="invalid">Please select a {label.toLowerCase()}.</Form.Control.Feedback>}
      </Form.Group>
    </Col>
  );
}

export default CustomSelectReact;
