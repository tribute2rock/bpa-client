import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSingleUser, getProvinces, editUser } from './api/user';
import { getBranches } from '../../branches/api/branches';
import { getDepartments } from '../../departments/api/departments';
import A from '../../../../../../config/url';
import query from 'querystring';
import { BackButton, SaveButton } from '../../../../../components/Buttons';
import { getAllRoles } from '../roles/api';
import CustomSelect from '../../../../../components/CustomSelect';
import { getObject } from '../../../../../../util';
import { toast } from 'react-toastify';
import CustomLoadingOverlay from '../../../../../components/CustomLoadingOverlay';

const UserEdit = props => {
  const [getUser, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    (async function fetchUser() {
      const qs = query.parse(props.location.search.slice(1));
      const id = A.getId(qs.id);
      await getData();
      await getSingleUser(id, (err, data) => {
        if (err) alert('Error!');
        else {
          const user = data;
          user.id = id;
          user.roleId = user.role.id;
          setUser(user);
        }
      });
    })();
    setIsLoading(false);
  }, []);

  const getData = async () => {
    await Promise.all([
      getAllRoles((err, data) => {
        setRoles(data);
      })
    ]);
  };

  const handleSelectChange = e => {
    setUser({ ...getUser, roleId: Number(e.target.value) });
  };

  const handleSubmit = () => {
    setVisible(true);
    const userId = getUser.id;
    const userData = {
      roleId: getUser.roleId,
      solId: getUser.solId
    };
    editUser({ userId, userData }, (err, data) => {
      if (!err) {
        if (data.status === 'Success') {
          toast.success('User Updated successfully');
        }
        props.history.push('/customers');
      }
      setVisible(false);
    });
    // setVisible(false);
  };

  if (isLoading) {
    return 'LOADING';
  }

  return (
    <Card>
      <CardHeader title={props.title}>
        <CardHeaderToolbar>
          <BackButton to="/customers" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSubmit} value="Update" />
          </CustomLoadingOverlay>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="8">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Name" value={getUser ? getUser.name : null} disabled />
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group>
                <Form.Label>Role</Form.Label>

                {/* {roles.length && getUser ? (
                  <Autocomplete
                    id="combo-box-demo"
                    defaultValue={getObject(getUser.id, roles)}
                    getOptionLabel={option => option.name}
                    options={roles}
                    className="form-control pt-2"
                    renderInput={params => <TextField {...params} placeholder="Select a role" />}
                    // onChange={(e, value) => change(e, value)}
                    onChange={handleSelectChange}
                  />
                ) : (
                  'loading'
                )} */}
                {roles.length && getUser ? (
                  <>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      name="categoryId"
                      value={getUser.roleId ? getUser.roleId : null}
                      handleChange={handleSelectChange}
                      options={roles}
                    />
                  </>
                ) : (
                  'Loadiing'
                )}
              </Form.Group>
            </Col>
            <Col sm="4">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={getUser ? getUser.email : null}
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
                  value={getUser ? getUser.mobile : null}
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
                  value={getUser ? getUser.dob : null}
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
                  value={getUser ? getUser.fatherName : null}
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
                  value={getUser ? getUser.jobType : null}
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
                  value={getUser ? getUser.department : null}
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
                  value={getUser ? getUser.position : null}
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
                  value={getUser ? getUser.title : null}
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
                  value={getUser ? getUser.branch : null}
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
                  value={getUser ? getUser.solId : null}
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
                  value={getUser ? getUser.employeeCD : null}
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
                  value={getUser ? getUser.userId : null}
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
                  value={getUser ? getUser.permanentAddress : null}
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
                  value={getUser ? getUser.localAddress : null}
                  placeholder="Local Address"
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default UserEdit;
