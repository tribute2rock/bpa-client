import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Card, CardBody } from '../../../../../_metronic/_partials/controls';

const BibiniFilterPanel = props => {
  const [filters, setFilters] = useState([{ field: 'copy', operator: 'like', value: '', value2: '' }]);

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

  const handleAddFilter = () => {
    setFilters([...filters, { field: 'copy', operator: 'like', value: '', value2: '' }]);
  };

  const handleRemoveFilter = index => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters([{ field: 'copy', operator: 'like', value: '', value2: '' }]);
    props.handleReset();
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Perform search or filter logic with the filters array
    props.reqSearch(filters);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Form.Group controlId="exampleForm.ControlSelect1">
            {filters.map((filter, index) => (
              <>
                <div key={index} className="row mb-3">
                  <div className="col-5">
                    <select
                      className="form-control"
                      value={filter.field}
                      onChange={event => handleFieldChange(index, event.target.value)}
                    >
                      <option value="a.copy">Bibini Number</option>
                      {/* <option value="a.lc">Reference Number</option> */}
                      <option value="a.form">Form</option>
                      <option value="a.branch">Branch</option>
                    </select>
                  </div>
                  <div className="col-2">
                    <select
                      className="form-control"
                      value={filter.operator}
                      onChange={event => handleOperatorChange(index, event.target.value)}
                    >
                      <option value="like">Like</option>
                      <option value="equals">Equals</option>
                      <option value="starts-with">Starts With</option>
                      <option value="ends-with">Ends With</option>
                      {/* <option value="date-range">Date Range</option> */}
                    </select>
                  </div>

                  {filter.operator === 'date-range' ? (
                    <div className="col-5">
                      <div className="row">
                        <input
                          type="date"
                          className="form-control col-6"
                          value={filter.value}
                          onChange={event => handleValueChange(index, event.target.value)}
                          placeholder="From Date"
                        />
                        <input
                          type="date"
                          className="form-control col-6"
                          value={filter.value2}
                          onChange={event => handleValueChange2(index, event.target.value)}
                          placeholder="To Date"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="col-5">
                      <input
                        type="text"
                        className="form-control"
                        value={filter.value}
                        onChange={event => handleValueChange(index, event.target.value)}
                        placeholder="Value"
                      />
                    </div>
                  )}
                  <div className="col-2">
                    {index > 0 && (
                      <button type="button" className="btn btn-danger" onClick={() => handleRemoveFilter(index)}>
                        <span className="fa fa-trash"></span>
                      </button>
                    )}
                  </div>
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
        </CardBody>
      </Card>
    </div>
  );
};

export default BibiniFilterPanel;
