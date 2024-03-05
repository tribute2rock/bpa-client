import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';

function MultiSelect({ controlId, label, options, onSelect, onRemove, displayValue, multiSelectRef }) {
  return (
    <Col md={3}>
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Multiselect
          ref={multiSelectRef}
          options={options}
          onSelect={onSelect}
          onRemove={onRemove}
          displayValue={displayValue}
          showCheckbox={false}
        />
      </Form.Group>
    </Col>
  );
}

export default MultiSelect;
