import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { DeleteButton } from '../../../../components/Buttons';
import { formatDate } from '../../../../../util';
import { getGroupsUser, deleteGroupUser, addGroupUsers } from './api/groupuser';
import { Button, Form, Col, Row, Tabs, Tab } from 'react-bootstrap';
import { BackButton, PreviousButton } from '../../../../components/Buttons';
import { server } from '../../../../../config/server';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';

export function GroupList() {
  const [groupUserList, setGroupUserList] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  //
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [groupList, setGroupList] = useState([]);

  const updateData = () => {
    getUsers();
    getGroups();
    GetGroupsUser();
  };

  useEffect(() => {
    updateData();
  }, []);

  const GetGroupsUser = () => {
    getGroupsUser((err, data) => {
      if (err) {
        alert('Error!');
      } else {
        setGroupUserList(data);
      }
    });
  };

  const getUsers = () => {
    server
      .get('/all-users')
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {});
  };

  const getGroups = () => {
    server
      .get('/manualGroups')
      .then(res => {
        setGroups(res.data.data);
      })
      .catch(err => {});
  };

  const handleGroupUserSubmit = e => {
    e.preventDefault();
    const bodyData = {
      groupId: selectedGroup.id,
      userId: selectedUser.id
    };
    if (bodyData.groupId > 0 && bodyData.userId > 0) {
      addGroupUsers(bodyData, (err, data) => {
        if (err) {
          toast.error(err.response.data.message ?? 'Error while assigning the user to the group');
        }
        if (data) {
          // props.history.push('/groups');
          toast.success(data.message);
        }
      });
    } else {
      toast.info('Please select the data');
    }
  };

  const handleSave = e => {};

  const handleToggleTab = tab => {
    setTabValue(tab);
  };

  const handleUserChange = e => {
    setSelectedUser({ ...selectedUser, id: e.target.value });
    setUserList([...userList, { id: e.target.value }]);
  };

  const handleGroupChange = e => {
    setSelectedGroup({ ...selectedGroup, id: e.target.value });
    setGroupList([...groupList, { id: e.target.value }]);
  };

  const ActionsColumnFormatter = (row, rowIndex) => {
    const Delete = () => {
      if (window.confirm('Are you sure you want to delete?')) {
        deleteGroupUser(rowIndex.id, (err, data) => {
          if (err) return;
          if (data) {
            updateData();
            toast.success('Data deleted successfully');
          }
        });
      }
    };
    return (
      <>
        <DeleteButton handleClick={Delete} />
      </>
    );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.'
    },
    {
      dataField: 'group.name',
      text: 'Group'
    },
    {
      dataField: 'user.name',
      text: 'User',
      formatter: function(cell, row) {
        return `${row.user.name}`;
      }
    },
    {
      dataField: 'createdAt',
      text: 'Created At',
      formatter: formatDate
    },
    {
      dataField: 'action',
      text: 'Actions',
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      formatter: ActionsColumnFormatter,
      style: {
        minWidth: '100px'
      }
    }
  ];

  return (
    <Tabs activeKey={tabValue} onSelect={handleToggleTab}>
      <Tab eventKey={1} title="Group User">
        <Card>
          <CardHeader title="Group User List">
            <CardHeaderToolbar>
              <Col>
                <BackButton to="/groups" />
              </Col>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center overflow-hidden"
              bootstrap4
              remote
              keyField="id"
              data={groupUserList}
              columns={columns}
            />
          </CardBody>
        </Card>
      </Tab>
      <Tab eventKey={2} title="Assign User">
        <Card>
          <CardHeader title="Assign user to a group">
            <CardHeaderToolbar>
              <PreviousButton handlePrevious={() => handleToggleTab(1)} />
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Input className="rounded" type="select" onChange={handleGroupChange} value={selectedGroup.id || ''}>
                      <option value="0">SELECT GROUP</option>
                      {groups &&
                        groups.map(group => {
                          let isSelected = false;
                          // if (groupList) {
                          //   groupList.forEach(g => {
                          //     if (g.id == group.id) {
                          //       isSelected = true;
                          //     }
                          //   });
                          // }
                          return isSelected ? null : (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          );
                        })}
                    </Input>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Input className="rounded" type="select" onChange={handleUserChange} value={selectedUser.id || ''}>
                      <option value="0">SELECT USER</option>
                      {users &&
                        users.map(user => {
                          let isSelected = false;
                          // if (userList) {
                          //   userList.forEach(u => {
                          //     if (u.id == user.id) {
                          //       isSelected = true;
                          //     }
                          //   });
                          // }
                          return isSelected ? null : (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          );
                        })}
                    </Input>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Button onClick={handleGroupUserSubmit} variant="primary" type="submit">
                    Assign
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
          {}
        </Card>
      </Tab>
    </Tabs>
  );
}
