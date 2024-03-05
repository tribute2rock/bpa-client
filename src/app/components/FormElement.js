import React from 'react';
import { Form, Col } from 'react-bootstrap';

function FormElement({ type, label, name, value, onChange, checked, checkboxLabel, required }) {
  const isRequiredAndEmpty = required && (type !== 'checkbox' ? !value : !checked);

  return (
    <Col md={type === 'checkbox' ? 2 : 3}>
      <Form.Group className="mb-0" controlId={`field-${name}`}>
        <Form.Label>
          {label}
          {isRequiredAndEmpty && <span className="text-danger ml-1">*</span>}
        </Form.Label>
        {type === 'checkbox' ? (
          <label className="checkbox">
            <input
              type="checkbox"
              checked={checked}
              name={name}
              required={required}
              onChange={onChange}
            />
            <span className="mr-2" />
            {checkboxLabel}
          </label>
        ) : (
          <Form.Control
            className="rounded"
            name={name}
            type={type}
            onChange={onChange}
            value={value}
            required={required}
          />
        )}
      </Form.Group>
    </Col>
  );
}

export default FormElement;
