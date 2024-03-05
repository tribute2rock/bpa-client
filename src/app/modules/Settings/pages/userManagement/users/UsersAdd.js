import React, { useEffect, useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { loginAttempts } from '../../../../../../values/values';
import { BackButton, SaveButton } from '../../../../../components/Buttons';
import { addUsers, getLdapUsers, getProvinces } from './api/user';
import { addGroups } from '../../groups/api/group';
import { getBranches } from '../../branches/api/branches';
import { getDepartments } from '../../departments/api/departments';
import { getAllRoles } from '../roles/api';
import { toast } from 'react-toastify';
import CustomLoadingOverlay from '../../../../../components/CustomLoadingOverlay';

const UsersAdd = props => {
  const [lapUsers, setLdapUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [branches, setBranches] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [values, setValues] = useState({});
  const [visible, setVisible] = useState(false);
  const change = (e, user) => {
    setSelectedUser(user);
  };

  const getData = () => {
    getLdapUsers((err, data) => {
      setLdapUsers(data);
    });
    // getProvinces((err, data) => {
    //   setProvinces(data);
    // });
    // getBranches((err, data) => {
    //   setBranches(data);
    // });
    // getDepartments((err, data) => {
    //   setDepartments(data);
    // });
    getAllRoles((err, data) => {
      setRoles(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const handleSubmit = () => {
    setVisible(true);
    const obj = { ...selectedUser, ...values };
    addUsers(obj, (err, data) => {
      if (err) {
        setVisible(false);
        toast.error(err.response.data.message ?? 'Error while adding user.');
      }
      if (data) {
        // createUserGroup(data);
        props.history.push('/users');
        toast.success(data.message ?? 'New user added successfully.');
      }
    });
  };

  const createUserGroup = user => {
    const group = {
      name: user.data.name,
      description: 'Automatic Group',
      groupType: 'automatic',
      users: [user.data.id]
    };

    addGroups(group, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while creating the Group');
      }
    });
  };

  return (
    <Card>
      <CardHeader title={props.title}>
        <CardHeaderToolbar>
          <BackButton to="/users" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSubmit} value="Save" />
          </CustomLoadingOverlay>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            {lapUsers && lapUsers ? (
              <Col sm={selectedUser ? '8' : '12'}>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>User</Form.Label>

                  <Autocomplete
                    id="combo-box-demo"
                    options={lapUsers}
                    className="form-control pt-2"
                    getOptionLabel={option => (option && option?.name ? option.name : '')}
                    renderInput={params => <TextField {...params} placeholder="Select a User" />}
                    onChange={(e, value) => change(e, value)}
                  />
                </Form.Group>
              </Col>
            ) : null}

            {selectedUser ? (
              <>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Role</Form.Label>
                    <Autocomplete
                      id="combo-box-demo"
                      options={roles}
                      className="form-control pt-2"
                      getOptionLabel={option => option.name}
                      renderInput={params => <TextField {...params} placeholder="Select Role" />}
                      onChange={(event, value) => {
                        setValues(value ? { ...values, roleId: value.id } : null);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={selectedUser ? selectedUser.name : null}
                      placeholder="Name"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={selectedUser ? selectedUser.email : null}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={selectedUser ? selectedUser.mobile : null}
                      placeholder="Phone"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.dob : null}
                      placeholder="Date of Birth"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Father's Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.fatherName : null}
                      placeholder="Father's Name"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.jobType : null}
                      placeholder="Job Type"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.department : null}
                      placeholder="Department"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.position : null}
                      placeholder="Position"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.title : null}
                      placeholder="Title"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.branch : null}
                      placeholder="Branch"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>SOL ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.solId : null}
                      placeholder="SOL ID"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Employee CD</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.employeeCD : null}
                      placeholder="Emlpoyee CD"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.userId : null}
                      placeholder="User Id"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Permanent Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.permanentAddress : null}
                      placeholder="Permanent Address"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col sm="6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Local Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={selectedUser ? selectedUser.localAddress : null}
                      placeholder="Local Address"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </>
            ) : null}
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default UsersAdd;
