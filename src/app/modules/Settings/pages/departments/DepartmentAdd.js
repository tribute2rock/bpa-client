import React from 'react';

import { Button, Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { NavLink } from 'react-router-dom';
import { addDepartments } from './api/departments';
import { toast } from 'react-toastify';
import { BackButton, SaveButton } from '../../../../components/Buttons';

export function DepartmentAdd(props) {
  const [department, setDepartment] = React.useState({});

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setDepartment({ ...department, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addDepartments(department, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while creating new department.');
      }
      if (data) {
        props.history.push('/departments');
        toast.success(data.message);
      }
    });
  };
  return (
    <Card>
      <CardHeader title="Add New Departments">
        <CardHeaderToolbar>
          <BackButton to="/departments" />
          <SaveButton handleSave={handleSubmit} value="Save" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="12">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Department Name"
                  value={department.name || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col sm="12">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows="3"
                  placeholder="Department Description"
                  value={department.description || ''}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <div className="text-right">
            <hr className="mt-0" />
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Save
            </Button>
          </div> */}
        </Form>
      </CardBody>
    </Card>
  );
}
