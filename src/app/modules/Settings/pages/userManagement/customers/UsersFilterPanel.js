/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SubmitButton } from '../../../../../components/Buttons';
import { getAllRoles } from '../roles/api';
import { getBranches } from '../../branches/api/branches';
import { getDepartments } from '../../departments/api/departments';

export const UsersFilterPanel = props => {
  const [filterData, setFilterData] = useState({});
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // getData();
  }, [filterData]);

  const getData = () => {
    getAllRoles((err, data) => {
      if (!err) {
        setRoles(data);
      }
    });
    getBranches((err, data) => {
      if (!err) {
        setBranches(data);
      }
    });
    getDepartments((err, data) => {
      if (!err) {
        setDepartments(data);
      }
    });
  };

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFilterData({ ...filterData, [name]: value });
  };
  const handleSelectChange = (e, value, action) => {
    const name = e.target.id.split('-')[0];
    if (action !== 'clear') {
      setFilterData({ ...filterData, [name]: value.id });
    } else {
      // let fd = { ...filterData };
      delete filterData[name];
      // setFilterData(fd);
    }
  };

  const handleSubmit = () => {
    const newData = { ...filterData };
    if (!newData.name) delete newData.name;
    if (!newData.mobile) delete newData.mobile;
    // This function passes filterData back to UserList component.
    props.parentCallback({ ...newData });
  };

  const handleReset = () => {
    setFilterData(
      ({} = () => {
        props.parentCallback({});
      })
    );
  };

  return (
    <div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
      <div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
        <Nav className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10">
          <Nav.Item as="li">
            <Nav.Link className={`nav-link active`}>Filter Your Search</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="offcanvas-close mt-n1 pr-5" style={{ position: 'absolute', top: '15px', right: '10px' }}>
          <a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
            <i className="ki ki-close icon-xs text-muted" />
          </a>
        </div>
      </div>
      <div className="offcanvas-content px-10">
        <div className="tab-content">
          <div id="kt_quick_panel_logs" role="tabpanel" className={`tab-pane fade pt-3 pr-5 mr-n5 scroll ps active show `}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                placeholder="First Name"
                value={filterData?.firstName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                placeholder="last Name"
                value={filterData?.lastName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                value={filterData?.phoneNumber || ''}
                onChange={handleChange}
              />
            </Form.Group>
            {/*<Form.Group>*/}
            {/*  <Form.Label>Role</Form.Label>*/}
            {/*  <Autocomplete*/}
            {/*    closeIcon={false}*/}
            {/*    id="roleId"*/}
            {/*    options={roles}*/}
            {/*    className="form-control pt-2"*/}
            {/*    getOptionLabel={option => option.name}*/}
            {/*    renderInput={params => <TextField {...params} />}*/}
            {/*    onChange={handleSelectChange}*/}
            {/*  />*/}
            {/*</Form.Group>*/}
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Department</Form.Label>
              <Autocomplete
                closeIcon={false}
                id="departmentId"
                options={departments}
                className="form-control pt-2"
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} placeholder={'Select Department'} />}
                onChange={handleSelectChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Branch</Form.Label>
              <Autocomplete
                closeIcon={false}
                id="branchId"
                options={branches || []}
                className="form-control pt-2"
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} placeholder={'Select Branch'} />}
                onChange={handleSelectChange}
              />
            </Form.Group>
            <div className="float-left">
              <SubmitButton color={'secondary'} handleSubmit={handleReset} value="Reset" />
            </div>
            <div className="text-right">
              <SubmitButton handleSubmit={handleSubmit} value="Filter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
