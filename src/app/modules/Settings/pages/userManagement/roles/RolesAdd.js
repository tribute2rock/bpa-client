import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from '@material-ui/core';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls';
import { BackButton, SaveButton } from '../../../../../components/Buttons';
import { server } from '../../../../../../config/server';
import qs from 'querystring';
import { toast } from 'react-toastify';
import { addRole } from './api';
import CustomLoadingOverlay from '../../../../../components/CustomLoadingOverlay';

export const RolesAdd = props => {
  const [roleId, setRoleId] = useState();
  const [permissions, setPermissions] = useState([]);
  const [roleDetails, setRoleDetails] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getPermissions();
    const details = qs.parse(props.location.search.slice(1));
    setRoleId(details.id);
    if (roleId) {
      getRole();
    }
  }, [roleId]);

  const getRole = () => {
    server.get(`/roles/${roleId}`).then(res => {
      let rd = res.data.data;
      setRoleDetails(rd);
      setSelectedPermissions(() => {
        let p = {};
        if (rd.permissions) {
          rd.permissions.map(item => {
            p[item.id] = true;
          });
        }
        return p;
      });
    });
  };

  const getPermissions = () => {
    server
      .get(`/permissions`)
      .then(res => {
        setPermissions(res.data.data);
      })
      .catch(err => {});
  };

  /**
   * Extracts property (permission id ) from selected permissions
   * if they are true.
   *
   * @param selectedPermissions
   * @returns {[]}
   */
  const extractPermissionIds = selectedPermissions => {
    let permissions = [];
    for (const permission in selectedPermissions) {
      if (selectedPermissions.hasOwnProperty(permission) && selectedPermissions[permission] === true) {
        permissions.push(permission);
      }
    }
    return permissions;
  };

  const handleSave = e => {
    setVisible(true);
    e.preventDefault();
    if (emptyValidation()) {
      if (roleId) {
        updateRole({
          id: roleDetails.id,
          name: roleDetails.name,
          description: roleDetails.description,
          permissions: extractPermissionIds(selectedPermissions)
        });
      } else {
        createRole({
          ...roleDetails,
          permissions: extractPermissionIds(selectedPermissions)
        });
      }
    }
    // setVisible(false);
  };

  const emptyValidation = () => {
    if (!roleDetails.name || roleDetails.name.trim() == '') {
      setVisible(false);
      toast.error('Role name cannot be empty!');
      return false;
    }
    if (!roleDetails.description || roleDetails.description.trim() == '') {
      setVisible(false);
      toast.error('Role description cannot be empty!');
      return false;
    }
    if (!extractPermissionIds(selectedPermissions) || extractPermissionIds(selectedPermissions).length < 1) {
      setVisible(false);
      toast.error('Select permissions for this role!');
      return false;
    }
    return true;
  };

  const createRole = role => {
    // server
    //   .post(`/roles`, {
    //     ...role
    //   })
    //   .then(res => {
    //     props.history.push('/roles');
    //     toast.success(res.data.message);
    //   });
    addRole(role, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while creating the Role');
      }
      if (data) {
        props.history.push('/roles');
        toast.success(data.message);
      }
    });
  };

  const updateRole = role => {
    server
      .put(`/roles/${role.id}`, {
        ...role
      })
      .then(res => {
        props.history.push('/roles');
        toast.success('Role updated successfully');
      })
      .catch(err => {
        toast.error('Error!!');
      });
  };

  const handleChange = e => {
    setRoleDetails({ ...roleDetails, [e.target.name]: e.target.value });
    const { value, maxLength } = e.target;
    if (value.length === maxLength) {
      toast.info(`The maximum character limit for role ${e.target.name} has reached.`);
    }
  };

  const handleCheck = e => {
    const permissionId = Number(e.target.name.split('permissions-')[1]);
    setSelectedPermissions({
      ...selectedPermissions,
      [permissionId]: e.target.checked
    });
  };

  const isPermissionSelected = permission => {
    return selectedPermissions.hasOwnProperty(permission.id) && selectedPermissions[permission.id] === true;
  };

  return (
    <Card className="sticky-header-card">
      <CardHeader title={props.title}>
        <CardHeaderToolbar>
          <BackButton to="/roles" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSave} value={!roleId ? 'Save' : 'Update'} />
          </CustomLoadingOverlay>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="4">
              <Form.Group>
                <Form.Label>Role Name</Form.Label>
                <Form.Control
                  required
                  id="roleName"
                  name="name"
                  type="text"
                  value={roleDetails.name || ''}
                  placeholder="Role Name"
                  onChange={handleChange}
                  maxLength="26"
                />
              </Form.Group>
            </Col>
            <Col sm="12">
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  id="description"
                  name="description"
                  placeholder="Enter role description"
                  value={roleDetails.description || ''}
                  as="textarea"
                  rows="3"
                  onChange={handleChange}
                  maxLength="200"
                />
              </Form.Group>
            </Col>
          </Row>
          <hr className="mt-0" />
          <h4>Permission</h4>
          <FormControl component="fieldset" className="d-flex">
            {Object.keys(permissions).map(group => {
              return (
                <>
                  <Row>
                    <Col sm="2">
                      <FormLabel component="legend" className="mb-4 mt-3">
                        <b className="text-capitalize">{group}</b>
                      </FormLabel>
                    </Col>
                    <Col sm="10">
                      {permissions[group].map(permission => {
                        return (
                          <FormGroup className="mb-4">
                            <label className="checkbox">
                              <input
                                type="checkbox"
                                checked={isPermissionSelected(permission)}
                                onChange={handleCheck}
                                name={'permissions-' + permission.id}
                                id={'permissions-' + permission.id}
                              />
                              <span className="mr-2" /> {permission.description}
                            </label>
                          </FormGroup>
                        );
                      })}
                    </Col>
                  </Row>
                  <hr />
                </>
              );
            })}
          </FormControl>
        </Form>
      </CardBody>
    </Card>
  );
};
