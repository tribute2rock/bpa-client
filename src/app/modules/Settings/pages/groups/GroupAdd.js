import React, { useState, useEffect } from 'react';
import { Form, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { toast } from 'react-toastify';
import { addGroups } from './api/group';
import { BackButton, SaveButton } from '../../../../components/Buttons';
// react dual list box
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import { server } from '../../../../../config/server';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export function GroupAdd(props) {
  const [group, setGroup] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  // dual list
  const [dualSelect, setDualSelect] = useState([]);
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    server
      .get('/users')
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const { maxLength } = e.target;
    setGroup({ ...group, [name]: value });
    if (value.length === maxLength) {
      toast.info(`The maximum character limit for group ${e.target.name} has reached.`);
    }
  };

  const handleSubmit = e => {
    setVisible(true);
    e.preventDefault();
    group.users = dualSelect;
    if (emptyValidation()) {
      addGroups(group, (err, data) => {
        if (err) {
          setVisible(false);
          toast.error(err.response.data.message ?? 'Error while creating the Group');
        }
        toast.success(data.message);
        props.history.push('/groups');
      });
    }
  };

  const emptyValidation = () => {
    if (!group.name || group.name.trim() == '') {
      toast.info('Group name is required!');
      setVisible(false);
      return false;
    }
    if (!group.description || group.description.trim() == '') {
      toast.info('Group description is required!');
      setVisible(false);
      return false;
    }
    if (dualSelect.length <= 0) {
      toast.info('Atleast one user assigned to the group!');
      setVisible(false);
      return false;
    }
    return true;
  };

  const handleToggleTab = tab => {
    setTabValue(tab);
  };

  const DualListOnchange = value => {
    setDualSelect(value);
  };

  return (
    <Tabs activeKey={tabValue} onSelect={handleToggleTab}>
      <Tab eventKey={1} title="Group">
        <Card>
          <CardHeader title="Add new Group">
            <CardHeaderToolbar>
              <BackButton to="/groups" />
              <CustomLoadingOverlay isLoading={visible}>
                <SaveButton handleSave={handleSubmit} value="Save" />
              </CustomLoadingOverlay>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col sm="12">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Group Name"
                      value={group.name || ''}
                      onChange={handleChange}
                      maxLength="30"
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
                      placeholder="Group Description"
                      value={group.description || ''}
                      onChange={handleChange}
                      maxLength="300"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div>
                <div>
                  <h6 className="mt-4">Select Users to assign in group</h6>
                  <DualListBox
                    options={users.map(user => ({
                      value: user.id,
                      label: user.name
                    }))}
                    selected={dualSelect}
                    onChange={DualListOnchange}
                  />
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
