import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { Input } from 'reactstrap';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function SubFormSelect({
  label,
  subForms,
  selectedSubForm,
  handleSubFormChange,
  valueKey = 'id',
  displayKey = 'form',
  workflowUsers = [],
  inputSize = 'md',
  dynamicFirstOption = true,
  decreasedOpacity = true,
}) {
  const capitalizedLabel = capitalizeFirstLetter(label);

  return (
    <Col md={3}>
      <Form.Group>
        <Form.Label>{capitalizedLabel}</Form.Label>
        <Input
          className={`rounded ${inputSize}`}
          type="select"
          onChange={handleSubFormChange}
          value={selectedSubForm[valueKey] || ''}
        >
          {dynamicFirstOption && (
            <option
              value="0"
              style={decreasedOpacity ? { opacity: 0.4 } : {}}
            >
              Select
            </option>
          )}
          {subForms &&
            subForms.map((data) => {
              const isSelected = workflowUsers.some(
                (workflowUser) => workflowUser.groupId === data[valueKey]
              );
              return (
                <option key={data[valueKey]} value={data[valueKey]}>
                  {data[displayKey]}
                </option>
              );
            })}
        </Input>
      </Form.Group>
    </Col>
  );
}

export default SubFormSelect;
