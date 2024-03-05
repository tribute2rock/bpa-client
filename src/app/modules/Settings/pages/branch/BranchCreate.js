import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import query from 'querystring';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { createBranch, getSingleBranch, updateBranch, getBranches } from './api/branch';
import A from '../../../../../config/url';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export function BranchCreate(props) {
  const [branch, setBranch] = useState({ bg_decentralized: false, lc_decentralized: false });
  const [tabValue, setTabValue] = useState(1);
  const [bgChecked, setBgChecked] = useState(false);
  const [lcChecked, setLcChecked] = useState(false);
  const [allBranch, setAllBranch] = useState([]);
  const [mergeBranch, setMergeBranch] = useState(false);
  const [mergeBranchList, setMergeBranchList] = useState([]);
  const [visible, setVisible] = useState(false);

  const qs = query.parse(props.location.search);
  const key = A.getId(qs['?id']);

  const bgType = [
    { value: 'Bid Bond', label: 'Bid Bond' },
    { value: 'Performance Bond', label: 'Performance Bond' },
    { value: 'Advance Payment', label: 'Advance Payment' },
    { value: 'Supply Credit Guarantee', label: 'Supply Credit Guarantee' },
    { value: 'Line of Credit Commitment', label: 'Line of Credit Commitment' },
    { value: 'Custom Guarantee', label: 'Custom Guarantee' }
  ];

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setBranch({ ...branch, [name]: value });
  };

  const handleMerge = e => {
    e.preventDefault();
    if (mergeBranch) {
      setMergeBranchList([]);
    }
    setMergeBranch(!mergeBranch);
  };

  useEffect(() => {
    if (props.location.search !== '') {
      getSingleBranch(key, (err, data) => {
        if (err) return;
        if (data) {
          setBranch(data.branch);
          setLcChecked(data.branch.lc_decentralized);
          setBgChecked(data.branch.bg_decentralized);
        }
      });
    }
    getBranches({}, (err, data) => {
      if (!err) {
        data.map(branch => {
          branch.label = branch.name + ' (' + branch.sol + ')';
          branch.value = branch.sol;
        });
        setAllBranch(data.filter(item => item.id !== key));
      }
    });
  }, [mergeBranch]);

  const reset = () => {
    setBranch({ name: '', sol: '', bg_decentralized: false, lc_decentralized: false, bg_type: null });
    setLcChecked(false);
    setBgChecked(false);
  };

  const handleChecked = e => {
    const name = e.target.name;
    if (name == 'bg_decentralized') {
      setBgChecked(!bgChecked);
      setBranch({ ...branch, [name]: !bgChecked });
    } else {
      setLcChecked(!lcChecked);
      setBranch({ ...branch, [name]: !lcChecked });
    }
  };

  const handleSubmit = e => {
    setVisible(true);
    e.preventDefault();
    const value = branch.id;
    let final = {};
    if (emptyValidation()) {
      if (mergeBranch) {
        final = { ...branch, mergeBranchList: mergeBranchList };
      }
      if (!value) {
        createBranch(final, (err, data) => {
          if (err) {
            toast.error(err.response.data.message ?? 'Error while creating the Branch');
          }
          if (data) {
            toast.success(data.message);
            reset();
            props.history.push('/branch');
          }
          setVisible(false);
        });
      } else {
        updateBranch(final, (err, data) => {
          if (err) {
            toast.error(err.response.data.message ?? 'Error while creating the Branch');
          }
          if (data) {
            toast.success(data.message);
            reset();
            props.history.push('/branch');
          }
          setVisible(false);
        });
      }
    }
  };

  const emptyValidation = () => {
    if (!branch.name || branch.name.trim() == '') {
      setVisible(false);
      toast.info('Branch name is required');
      return false;
    }
    if (!branch.sol || branch.sol.trim() == '') {
      setVisible(false);
      toast.info('Branch code is required');
      return false;
    }
    return true;
  };

  const handleToggleTab = tab => {
    setTabValue(tab);
  };

  return (
    <>
      <Tabs activeKey={tabValue} onSelect={handleToggleTab}>
        <Tab eventKey={1} title="Branch">
          <Card>
            <CardHeader title={props.title}>
              <CardHeaderToolbar>
                <BackButton to="/branch" />
                <CustomLoadingOverlay isLoading={visible}>
                  <SaveButton handleSave={handleSubmit} value={props.title === 'Add New Branch' ? 'Save' : 'Update'} />
                </CustomLoadingOverlay>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col sm="6">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Branch Name</Form.Label>
                      <Form.Control
                        name="name"
                        type="text"
                        placeholder="Branch Name"
                        value={branch.name || ''}
                        onChange={handleChange}
                        maxLength="30"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm="6">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Branch Code</Form.Label>
                      <Form.Control
                        name="sol"
                        type="text"
                        placeholder="Branch Code"
                        value={branch.sol || ''}
                        onChange={e => handleChange(e)}
                        maxLength="30"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <div className="col-9 col-form-label">
                        <div className="checkbox-inline">
                          <Form.Label>LC Decentralized</Form.Label>
                          <label className="checkbox checkbox-primary pl-3">
                            <input
                              checked={lcChecked}
                              onClick={e => handleChecked(e)}
                              type="checkbox"
                              name="lc_decentralized"
                            />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <div className="col-9 col-form-label">
                        <div className="checkbox-inline">
                          <Form.Label>BG Decentralized</Form.Label>
                          <label className="checkbox checkbox-primary pl-3">
                            <input
                              checked={bgChecked}
                              onClick={e => handleChecked(e)}
                              type="checkbox"
                              name="bg_decentralized"
                            />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  {bgChecked && (
                    <Col md={4}>
                      <Select
                        options={bgType}
                        className="mb-2"
                        name="bg_type"
                        defaultValue={{ label: branch.bg_type, value: branch.bg_type }}
                        onChange={e => {
                          setBranch({ ...branch, bg_type: e.label });
                        }}
                        placeholder="Select BG Type"
                      />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <div className="col-9 col-form-label">
                        <div className="checkbox-inline">
                          <Form.Label>Merge Branch</Form.Label>
                          <label className="checkbox checkbox-primary pl-3">
                            <input checked={mergeBranch} onClick={e => handleMerge(e)} type="checkbox" name="merge_branch" />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  {mergeBranch && (
                    <>
                      <Col md={4}>
                        <Form.Label>Branches to Merge</Form.Label>
                        <Select
                          options={allBranch}
                          className="mb-2"
                          name="merge_branch"
                          onChange={e => {
                            setMergeBranchList(e);
                          }}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
