import React, { useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { getSingleDepartment, updateDepartment } from './api/departments';
import A from '../../../../../config/url';
import query from 'querystring';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';

export function DepartmentEdit(props) {
  const [department, setDepartment] = React.useState({});

  useEffect(() => {
    const qs = query.parse(props.location.search.slice(1));
    const id = A.getId(qs.id);
    getSingleDepartment(id, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching data.');
      } else {
        setDepartment(data);
      }
    });
  }, []);

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = () => {
    updateDepartment(department, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while updating department.');
      }
      if (data) {
        props.history.push('/departments');
        toast.success(data.message ?? 'Department updated successfully.');
      }
    });
  };
  return (
    <Card>
      <CardHeader title="Edit Department">
        <CardHeaderToolbar>
          <BackButton to="/departments" value="Back" />
          <SaveButton handleSave={handleSubmit} value="Update" />
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
                  value={department ? department.name : department.name}
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
                  value={department ? department.description : department.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <div className="text-right">
            <hr className="mt-0" />
            <Button onClick={handleSubmit}>Save</Button>
          </div> */}
        </Form>
      </CardBody>
    </Card>
  );
}
