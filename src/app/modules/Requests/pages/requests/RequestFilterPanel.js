import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
// import { TextField } from '@material-ui/core';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import DateRangePicker from 'react-bootstrap-daterangepicker';
// import { Row, Col } from 'react-bootstrap';
// import { Button } from 'reactstrap';

const RequestFilterPanel = props => {
  const [selectedTab, setSelectedTab] = useState('TabLog');
  // const [date, setDate] = useState({});
  // const [search, setSearch] = useState('');
  // const [searchKey, setSearchKey] = useState('');
  // const searchFields = [
  //   { title: 'KEY', value: 'r.requestKey' },
  //   { title: 'SOL', value: 'r.requestedBranch' },
  //   { title: 'FORM', value: 'f.name' },
  //   { title: 'REFERENCE NO.', value: 'refNums' }
  // ];

  // const searchOperators = [
  //   { title: 'Equals', value: 'equals' },
  //   { title: 'Like', value: 'like' },
  //   { title: 'Starts with', value: 'starts' },
  //   { title: 'Ends with', value: 'ends' },
  //   { title: 'Date Range', value: 'date' }
  // ];

  const [filters, setFilters] = useState([{ field: 'requestKey', operator: 'like', value: '', value2: '' }]);

  const handleFieldChange = (index, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index].field = value;
    setFilters(updatedFilters);
  };

  const handleOperatorChange = (index, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index].operator = value;
    setFilters(updatedFilters);
  };

  const handleValueChange = (index, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value = value;
    setFilters(updatedFilters);
  };

  const handleValueChange2 = (index, value) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value2 = value;
    setFilters(updatedFilters);
  };

  // const handleClauseChange = (index, value) => {
  //   const updatedFilters = [...filters];
  //   updatedFilters[index].clause = value;
  //   setFilters(updatedFilters);
  // };

  const handleAddFilter = () => {
    setFilters([...filters, { field: 'requestKey', operator: 'like', value: '', value2: '' }]);
  };

  const handleRemoveFilter = index => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters([{ field: 'requestKey', operator: 'like', value: '', value2: '' }]);
    props.handleReset();
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Perform search or filter logic with the filters array
    props.reqSearch(filters);
  };

  const setTab = _tabName => {
    setSelectedTab(_tabName);
  };

  // const handleEvent = (event, picker) => {
  //   setDate({ startDate: picker.startDate._d, endDate: picker.endDate._d });
  // };

  // const handleCancel = (event, picker) => {
  //   setDate({ startDate: undefined, endDate: undefined });
  // };

  // const reqSearch = () => {
  //   props.reqSearch(search, searchKey, date);
  // };

  // const reqReset = () => {
  //   setSearch('');
  //   setDate({ startDate: undefined, endDate: undefined });
  //   props.handleReset();
  // };
  return (
    <div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
      <div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
        <Nav
          onSelect={setTab}
          as="ul"
          role="tablist"
          className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
        >
          <Nav.Item as="li">
            <Nav.Link eventKey="TabLog" className={`nav-link ${selectedTab === 'TabLog' ? 'active' : ''}`}>
              Filter Your Search
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="offcanvas-close mt-n1 pr-5" style={{ position: 'absolute', top: '15px', right: '10px' }}>
          <a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_panel_close">
            <i className="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>
      </div>
      <div className="offcanvas-content px-10">
        <div className="tab-content">
          <div
            id="kt_quick_panel_logs"
            role="tabpanel"
            className={`tab-pane fade pt-3 pr-5 mr-n5 scroll ps ${selectedTab === 'TabLog' ? 'active show' : ''}`}
          >
            <Form.Group controlId="exampleForm.ControlSelect1">
              {filters.map((filter, index) => (
                <>
                  <div key={index} className="row mb-3">
                    <div className="col-7">
                      <select
                        className="form-control"
                        value={filter.field}
                        onChange={event => handleFieldChange(index, event.target.value)}
                      >
                        <option value="a.requestKey">Request Key</option>
                        <option value="a.requestedBranch">Branch Sol</option>
                        <option value="a.refNums">Reference Number</option>
                        <option value="a.requestedDate">Created Date</option>
                      </select>
                    </div>
                    <div className="col-5">
                      <select
                        className="form-control"
                        value={filter.operator}
                        onChange={event => handleOperatorChange(index, event.target.value)}
                      >
                        <option value="like">Like</option>
                        <option value="equals">Equals</option>
                        <option value="starts-with">Starts With</option>
                        <option value="ends-with">Ends With</option>
                        <option value="date-range">Date Range</option>
                      </select>
                    </div>
                  </div>
                  <div key={index} className="row mb-3">
                    {filter.operator === 'date-range' ? (
                      <div className="col">
                        <input
                          type="date"
                          className="form-control"
                          value={filter.value}
                          onChange={event => handleValueChange(index, event.target.value)}
                          placeholder="From Date"
                        />
                        <input
                          type="date"
                          className="form-control"
                          value={filter.value2}
                          onChange={event => handleValueChange2(index, event.target.value)}
                          placeholder="To Date"
                        />
                      </div>
                    ) : (
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          value={filter.value}
                          onChange={event => handleValueChange(index, event.target.value)}
                          placeholder="Value"
                        />
                      </div>
                    )}
                    {/* <div className="col-4">
                      <select
                        className="form-control"
                        value={filter.clause}
                        onChange={event => handleClauseChange(index, event.target.value)}
                      >
                        <option value="and" selected>
                          AND
                        </option>
                        <option value="or">OR</option>
                        <option value="not">NOT</option>
                      </select>
                    </div> */}
                    {index > 0 && (
                      <div className="col-4">
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveFilter(index)}>
                          <span className="fa fa-trash"></span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <div className="row mb-3 mt-5">
                <div className="col-4 d-flex justify-content-center">
                  <button type="button" className="btn btn-primary" onClick={handleAddFilter}>
                    Add Filter
                  </button>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <button type="button" className="btn btn-danger" onClick={handleClearFilters}>
                    Clear
                  </button>
                </div>
              </div>
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFilterPanel;
