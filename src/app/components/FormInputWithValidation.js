import React from 'react';
import { Form, Col } from 'react-bootstrap';

function FormInputWithValidation({ label, id, type, name, placeholder, value, onChange, maxLength, isRequired }) {
  const isValueEmpty = value.trim() === '';

  return (
    <Col md={12}>
      <Form.Group>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Control
          required={isRequired && !isValueEmpty}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          isInvalid={isRequired && isValueEmpty}
        />
        {isRequired && isValueEmpty && (
          <Form.Control.Feedback type="invalid">
            Please provide a {label.toLowerCase()}.
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </Col>
  );
}

export default FormInputWithValidation;
