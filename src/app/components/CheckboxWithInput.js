import React from 'react';
import { Form, Col } from 'react-bootstrap';

function CheckboxWithInput({ label, checkboxName, checked, onCheckboxChange, inputName, inputValue, onInputChange, inputPlaceholder }) {
  return (
    <Col md={3}>
      <Form.Group>
        <Form.Label>
          <input
            type="checkbox"
            checked={checked}
            name={checkboxName}
            onChange={onCheckboxChange}
          />
          <span className="mr-2" />
          {label}
        </Form.Label>
        {checked ? (
          <Form.Control
            className="rounded"
            type="number"
            name={inputName}
            onChange={onInputChange}
            value={inputValue}
            placeholder={inputPlaceholder}
          />
        ) : null}
      </Form.Group>
    </Col>
  );
}

export default CheckboxWithInput;
