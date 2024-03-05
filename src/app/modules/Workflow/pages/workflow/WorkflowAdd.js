import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Tabs, Tab, Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import { Card, CardBody, CardHeader, CardFooter, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Icon, Switch } from '@material-ui/core';
import _ from 'lodash';
import { getData } from '../../../../../util';
import { BackButton, SaveButton, NextButton, PreviousButton } from '../../../../components/Buttons';
import { server } from '../../../../../config/server';
import { addWorkflow, getWorkflowById, editWorkflow, countActiveWorkflow, getTrigger } from './api';
import qs from 'querystring';
import { toast } from 'react-toastify';
import { Multiselect } from 'multiselect-react-dropdown';
import triggers from './triggerapi';
import Swal from 'sweetalert2';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

const WorkflowAdd = props => {
  const [workflow, setWorkflow] = useState({
    workflow: { workflowType: false },
    workflow_users: []
  });
  const [hasApprover, setHasApprover] = useState(false);
  const [canAddGroup, setCanAddGroup] = useState(true);
  const [checkOpen, setCheckOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ isApprover: false });
  const [selectedSubForm, setSelectedSubForm] = useState({});

  //To manage workflow using groups(groupsChange)
  const [groups, setGroups] = useState([]);
  const [subForms, setSubForms] = useState([]);
  const [availableGroups, setAvailableGroups] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('close');
  const [multiSelectGroup, setMultiSelectGroup] = useState([]);
  const [multiSelectViewGroup, setMultiSelectViewGroup] = useState([]);
  const [approv, setApprov] = useState(false);
  const [multiPick, setMultiPick] = useState(false);
  const [multiplePicker, setMultiplePicker] = useState(null);
  const [triggerValue, setTriggerValue] = useState([]);
  const [visible, setVisible] = useState(false);
  const [triggerList, setTriggerList] = useState([]);
  const [selectedTrigger, setSelectedTrigger] = useState();
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  const [viewGroup, setViewGroup] = useState([]);

  const detail = qs.parse(props.location.search.slice(1));

  const updateData = () => {
    checkApprover();
    // checkOpenClose();
    // getUsers();
    getGroups();
    setTriggerValue(triggers);
    getSubForms();
  };

  const getUsers = () => {
    server
      .get('/workflow-users')
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => {});
  };
  const getTriggers = () => {
    server
      .get('/triggers')
      .then(res => {
        setTriggerList(res.data.data);
      })
      .catch(err => {});
  };

  //to get groups (groupsChange)
  const getGroups = () => {
    server
      .get('/groups')
      .then(res => {
        setGroups(res.data.data);
        setAvailableGroups(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSubForms = () => {
    server
      .get('/sub-forms')
      .then(res => {
        setSubForms(res.data.data);
      })
      .catch(err => {});
  };

  const checkApprover = () => {
    if (workflow.workflow_users.length !== 0) {
      workflow.workflow_users.forEach(w => {
        if (w.isApprover && workflow.workflow.workflowType) {
          setHasApprover(true);
        } else {
          setHasApprover(false);
        }
      });
    } else {
      setHasApprover(false);
    }
  };

  const checkOpenClose = () => {
    if (workflow.workflow.workflowType && workflow.workflow_users.length >= 1) {
      setHasApprover(true);
      return setCanAddGroup(false);
    } else if (!workflow.workflow.workflowType && hasApprover) {
      return setCanAddGroup(false);
    }
    setCanAddGroup(true);
  };

  useEffect(() => {
    getTriggers();
    if (props.location.search !== '') {
      countActiveWorkflow(detail.id, (err, data) => {
        getWorkflowById(detail.id, (data, err) => {
          if (err) return;
          if (data) {
            if (data.workflow.workflowType == 'close') {
              data.workflow.workflowType = false;
            } else {
              data.workflow.workflowType = true;
            }
            setHasApprover(true);
            setWorkflow({
              workflow: data.workflow,
              workflow_users: data.levels
            });
          }
        });
      });
    }
    updateData();
  }, []); //eslint-disable-line

  const handleMultiSelect = e => {
    setMultiSelectGroup(e);
  };

  const handleMultiRemove = e => {
    setMultiSelectGroup(e);
  };

  const handleMultiViewSelect = e => {
    setMultiSelectViewGroup(e);
  };

  const handleMultiViewRemove = e => {
    setMultiSelectViewGroup(e);
  };

  const handleUserChange = e => {
    setSelectedUser({ ...selectedUser, id: e.target.value });
  };

  const handleSubFormChange = e => {
    setSelectedSubForm({ ...selectedSubForm, id: e.target.value });
  };

  const handleMultiplePick = e => {
    if (e.target.value > 0) {
      setMultiplePicker(e.target.value);
    }
  };

  const handleMultiPickCheckbox = value => {
    if (value == 'swap') {
      setMultiPick(false);
    } else {
      setMultiPick(!multiPick);
    }
    setMultiplePicker(null);
  };

  const handleTriggerChange = e => {
    setSelectedTrigger(e.target.value);
  };

  const handleChange = e => {
    let freshWorkflow = workflow.workflow || {};
    e.preventDefault();
    const name = e.target.name;
    const { maxLength } = e.target;
    const value = e.target.value;
    freshWorkflow[name] = e.target.value;
    setWorkflow({ ...workflow, workflow: freshWorkflow });
    if (value.length === maxLength) {
      toast.info(`The maximum character limit for workflow ${e.target.name} has reached.`);
    }
  };

  const toggleWorkflow = e => {
    let val = e.target.value === 'true';
    let freshWorkflow = workflow.workflow || {};
    freshWorkflow['workflowType'] = !val;
    setWorkflow({ ...workflow, workflow: freshWorkflow });
  };

  /**
   * Remove a group from available options list when
   * added to a workflow.
   *
   * @param groupId
   */
  const removeFromAvailableGroups = groupId => {
    const grp = availableGroups.filter(x => x.id !== groupId);
    setAvailableGroups(grp);
  };

  /**
   * Adds a group to the list of available options
   * when removed from the workflow.
   *
   * @param groupId
   */
  const addToAvailableGroups = groupId => {
    const grp = availableGroups;
    if (!availableGroups.find(x => x.id === groupId)) {
      grp.push(groups.find(x => x.id === groupId));
    }
    setAvailableGroups(grp);
  };

  const buttonAction = async (action, data) => {
    let workflowUsers = workflow.workflow_users || [];
    const lastUser = _.findLast(workflowUsers);
    switch (action) {
      case 'add':
        data.map((work, idx) => {
          workflowUsers.push({
            workflowId: workflow.id,
            trigger: selectedTrigger,
            multiplePicker: Number(multiplePicker) || null,
            isApprover: approv,
            groupId: Number(work.id),
            subformId: Number(selectedSubForm.id),
            level: lastUser ? lastUser.level + 1 : 0
          });
          removeFromAvailableGroups(Number(work.id));
        });
        checkApprover();
        checkOpenClose();
        multiSelectRef.current.resetSelectedValues(['1']);
        break;
      case 'delete':
        const confirmValue = await Swal.fire({
          title: '',
          text: 'Do you want to delete this user from workflow?',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: 'red'
        });
        if (confirmValue.value) {
          workflowUsers = workflowUsers
            .filter((w, i) => {
              return i === data.index ? 0 : 1;
            })
            .map((u, idx) => ({ ...u, level: idx }));
        }
        addToAvailableGroups(data.groupId);
        workflow.workflow_users = workflowUsers;
        setWorkflow({ ...workflow });
        setSelectedUser({ isApprover: false });
        setSelectedTrigger();
        setApprov(false);
        handleMultiPickCheckbox('swap');
        checkApprover();
        checkOpenClose();
        break;
      default:
        break;
    }
    workflow.workflow_users = workflowUsers;
    setWorkflow({ ...workflow });
    checkApprover();
    checkOpenClose();
    setSelectedSubForm({});
    setSelectedUser({ isApprover: false });
    // setWorkflow({ ...workflow });
    setApprov(false);
    handleMultiPickCheckbox('swap');
  };

  const handleSave = () => {
    setVisible(true);
    const lastUser = _.findLast(workflow.workflow_users);
    let flowWorkflow = workflow.workflow || {};
    flowWorkflow.workflowType = workflow.workflow.workflowType ? 'open' : 'close';
    if (!workflow.workflow.name || !workflow.workflow.description || workflow.workflow_users.length === 0) {
      toast.info('Please fill out complete form');
      setVisible(false);
    } else if (flowWorkflow.workflowType === 'close' && !lastUser.isApprover) {
      flowWorkflow.workflowType = false;
      toast.info('There must be one approver. Please select approver and proceed again');
      setVisible(false);
    } else {
      let newFlowWorkflow = workflow.workflow;
      newFlowWorkflow['workflowView'] = multiSelectViewGroup.map(obj => obj.id).join(',');
      if (!workflow.workflow.id) {
        addWorkflow(workflow, (data, err) => {
          if (!err) {
            setVisible(false);
            toast.success('Workflow added.');
            props.history.push('/workflow');
          } else {
            setVisible(false);
            toast.error('Error!!');
          }
        });
      } else {
        // countActiveWorkflow(detail.id, (err, data) => {
        //   if (data.data) {
        //     setVisible(false);
        //     toast.info('This workflow is in use. You cannot modify/delete this workflow.');
        //     return;
        //   }
        editWorkflow(workflow, (data, err) => {
          if (!err) {
            setVisible(false);
            toast.success('Workflow updated successfully.');
            props.history.push('/workflow');
          }
        });
        // });
      }
    }
  };

  const handleToggleTab = tab => {
    setTabValue(tab);
  };
  // const handleTriggerChange = e => {
  //   setSelectedTrigger(e.target.value);
  // };

  const multiSelectRef = React.createRef();

  return (
    <Tabs activeKey={tabValue} onSelect={handleToggleTab}>
      <Tab eventKey={1} title="Workflow">
        <Card>
          <CardHeader title={props.title}>
            <CardHeaderToolbar>
              <BackButton to="/workflow" />
              <NextButton handleNext={() => handleToggleTab(2)} />
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label for="workflowName">Workflow Name</Form.Label>
                    <Form.Control
                      required
                      id="workflowName"
                      type="text"
                      name="name"
                      placeholder="Workflow Name"
                      value={workflow.workflow.name || ''}
                      onChange={handleChange}
                      maxLength="60"
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label for="workflowDescription">Workflow Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="workflowDescription"
                      name="description"
                      required
                      rows="3"
                      placeholder="Workflow Description"
                      value={workflow.workflow.description || ''}
                      onChange={handleChange}
                      maxLength="300"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Open Flow</Form.Label>
                    <Switch
                      checked={workflow.workflow.workflowType}
                      onChange={toggleWorkflow}
                      color="primary"
                      name={`switch-open-flow`}
                      value={workflow.workflow.workflowType}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Tab>
      <Tab eventKey={2} title="Workflow Creator">
        <Card>
          <CardHeader title={props.title}>
            <CardHeaderToolbar>
              <PreviousButton handlePrevious={() => handleToggleTab(1)} />
              <CustomLoadingOverlay isLoading={visible}>
                <SaveButton handleSave={handleSave} value={props.title === 'Add Workflow' ? 'Save' : 'Update'} />
              </CustomLoadingOverlay>
            </CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Form>
              <Row className="align-items-center">
                <Col md={3}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Users or Groups</Form.Label>
                    <Multiselect
                      ref={multiSelectRef}
                      options={availableGroups}
                      onSelect={handleMultiSelect}
                      onRemove={handleMultiRemove}
                      displayValue="name"
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Sub-Form</Form.Label>
                    <Input className="rounded" type="select" onChange={handleSubFormChange} value={selectedSubForm.id || ''}>
                      <option value="0">SELECT SUB-FORM</option>
                      {subForms &&
                        subForms.map(data => {
                          let isSelected = false;
                          if (workflow.workflow_users) {
                            workflow.workflow_users.forEach(workflowUser => {
                              if (workflowUser.groupId === data.id) {
                                isSelected = true;
                              }
                            });
                          }
                          return (
                            <option key={data.id} value={data.id}>
                              {data.form}
                            </option>
                          );
                        })}
                    </Input>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Select Trigger</Form.Label>
                    <Input className="rounded" type="select" onChange={handleTriggerChange} value={selectedTrigger || ''}>
                      <option value="0">SELECT Trigger</option>
                      {triggerList.map(data => {
                        let isSelected = false;
                        return (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        );
                      })}
                    </Input>
                  </Form.Group>
                </Col>

                {workflow.workflow.workflowType ? null : (
                  <>
                    <Col md={3}>
                      <Form.Group>
                        <Form.Label>
                          <input
                            type="checkbox"
                            checked={multiPick || false}
                            name="isMultiPick"
                            onChange={handleMultiPickCheckbox}
                          />
                          <span className="mr-2" />
                          Multiple Picker
                        </Form.Label>
                        {multiPick ? (
                          <Input
                            className="rounded"
                            type="number"
                            onChange={handleMultiplePick}
                            value={multiplePicker}
                            placeholder="Number of picker"
                          ></Input>
                        ) : null}
                      </Form.Group>
                    </Col>

                    <Col md={2}>
                      <Form.Group className="mb-0" check>
                        <label className="checkbox">
                          <input
                            type="checkbox"
                            checked={approv || false}
                            name="isApprov"
                            required
                            onChange={({ target: { checked } }) => {
                              return setApprov(checked);
                            }}
                          />
                          <span className="mr-2" />
                          Is Approver
                        </label>
                      </Form.Group>
                    </Col>
                  </>
                )}
                <Col md={2}>
                  {!hasApprover && !(workflow.workflow.workflowType==="open" && workflow.workflow_users.length >= 1) ? (
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (multiSelectGroup.length > 0) {
                          if (multiSelectGroup.length > 1 && !approv && !workflow.workflow.workflowType) {
                            toast.info('Multiple group must be approver.');
                          } else {
                            buttonAction('add', multiSelectGroup);
                          }
                        } else {
                          toast.info('Group must be selected');
                        }
                      }}
                    >
                      <i title="Add Group" className="fa fa-plus text-white" />
                      Add Group
                    </Button>
                  ) : null}
                </Col>
              </Row>
            </Form>
          </CardBody>

          {workflow && workflow.workflow_users != null ? (
            <CardFooter>
              <div className="row text-center">
                {workflow.workflow_users.map((label, index) => {
                  return (label && label.level == 0 && label.isApprover) || (label && label.level && label.isApprover) ? (
                    <div className="col" key="">
                      <div className="approver-group">
                        <h6 className="mt-3 mb-3">
                          {getData(label.groupId, groups).name} {''}
                        </h6>
                        <p>
                          <strong>Level - </strong> {label.level}
                        </p>
                        <p>
                          <strong>Sub-form - </strong> {getData(label.subformId, subForms).form}
                        </p>
                        <p>
                          <strong>Multiple Pick - </strong> {label.multiplePicker}
                        </p>
                        <Icon
                          title="Delete User"
                          className="fa fa-trash text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            buttonAction('delete', {
                              index: index,
                              groupId: label.groupId
                            });
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col" key="">
                      <div className="non-approver-group">
                        <h6 className="mt-3 mb-3">
                          {getData(label.groupId, groups).name} {''}
                        </h6>
                        <p>
                          <strong>Level - </strong> {label.level}
                        </p>
                        <p>
                          <strong>Sub-form - </strong> {getData(label.subformId, subForms).form}
                        </p>
                        <p>
                          <strong>Multiple Pick - </strong> {label.multiplePicker}
                        </p>
                        <Icon
                          title="Delete User"
                          className="fa fa-trash text-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            buttonAction('delete', {
                              index: index,
                              groupId: label.groupId
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardFooter>
          ) : null}

          {workflow && workflow.workflow_users != null ? (
            <CardFooter>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-muted">
                        S.N
                      </th>
                      <th scope="col" className="text-muted">
                        User or Group
                      </th>
                      <th scope="col" className="text-muted">
                        Level
                      </th>
                      <th scope="col" className="text-muted">
                        Approver
                      </th>
                      <th scope="col" className="text-muted">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workflow.workflow_users.map((label, index) => {
                      return (
                        <tr key="">
                          <td>{index + 1}</td>
                          <td>
                            {getData(label.groupId, groups).name} {''}
                          </td>
                          <td>{label.level}</td>
                          <td>
                            {' '}
                            <small>{label.isApprover ? 'Yes' : 'No'}</small>
                          </td>
                          <td>
                            <Icon
                              title="Delete User"
                              className="fa fa-trash text-danger"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                buttonAction('delete', {
                                  index: index,
                                  groupId: label.groupId
                                });
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardFooter>
          ) : null}
          <CardFooter>
            <Row className="align-items-center">
              <Col md={3}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Select View Users or Groups</Form.Label>
                  <Multiselect
                    options={availableGroups}
                    onSelect={handleMultiViewSelect}
                    onRemove={handleMultiViewRemove}
                    displayValue="name"
                  />
                </Form.Group>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Tab>
    </Tabs>
  );
};

export default WorkflowAdd;
