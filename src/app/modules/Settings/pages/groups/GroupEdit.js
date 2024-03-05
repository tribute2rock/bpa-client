import React, { useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import A from '../../../../../config/url';
import query from 'querystring';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';
import { getSingleGroup, updateGroup } from './api/group';
import { da } from 'date-fns/locale';
import { server } from '../../../../../config/server';
// react dual list box
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export function GroupEdit(props) {
  const [group, setGroup] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [dualSelect, setDualSelect] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setGroup({ ...group, [name]: value });
  };

  const getUsers = () => {
    server
      .get('/users')
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {});
  };

  useEffect(() => {
    const qs = query.parse(props.location.search.slice(1));
    const id = A.getId(qs.id);
    getSingleGroup(id, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching the data');
      } else {
        setGroup(data);
        setUserList(data.users);
      }
    });
    getUsers();
  }, []);

  const handleSubmit = () => {
    setVisible(true);
    if (emptyValidation()) {
      group['userList'] = dualSelect;
      updateGroup(group, (err, data) => {
        if (err) {
          setVisible(false);
          toast.error(err.response.data.message ?? 'Error while updating group.');
        }
        // if (data) {
        //   //delete usergroup and create new usergroup
        //   dualSelect.map(uId => {
        //     const bodyData = { groupId: data.data.id, userId: uId };
        //     addGroupUsers(bodyData, (err, res) => {
        //       if (err) {
        //         setVisible(false);
        //         toast.error(err.response.data.message ?? 'Error while assigning the user to the group');
        //       }
        //     });
        //   });
        // }
        props.history.push('/groups');
        toast.success(data.message ?? 'Group updated successfully');
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
      toast.info('Atleast one user should be selected to assign in a group!');
      setVisible(false);
      return false;
    }
    return true;
  };

  const DualListOnchange = value => {
    setDualSelect(value);
  };

  return (
    <Card>
      <CardHeader title="Edit Group">
        <CardHeaderToolbar>
          <BackButton to="/groups" value="Back" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSubmit} value="Update" />
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
                  value={group ? group.name : group.name}
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
                  placeholder="Group Description"
                  value={group ? group.description : group.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div>
            <div>
              <h6 className="mt-4 pb-1">Select Users to assign in group</h6>

              <DualListBox
                options={users.map(user => ({
                  value: user.id,
                  label: user.name
                }))}
                selected={
                  userList.length > 0 && dualSelect.length < 1
                    ? userList.map(user => {
                        return user.id;
                      })
                    : dualSelect
                }
                onChange={DualListOnchange}
              />
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
