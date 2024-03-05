import React from 'react';

import { Button, Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { NavLink } from 'react-router-dom';
import { addCategory } from './api/category';
import { toast } from 'react-toastify';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { FormControlLabel, Switch } from '@material-ui/core';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export function CategoryAdd(props) {
  const [category, setCategory] = React.useState({});
  const [validationErrors, setValidationErrors] = React.useState({});
  const [otherService, setOtherService] = React.useState(false);
  const [file, setFile] = React.useState();
  const [filePath, setFilePath] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const { maxLength } = e.target;
    setCategory({ ...category, [name]: value });
    if (value.length === maxLength) {
      toast.info(`The maximum character limit for category ${e.target.name} has reached.`);
    }
  };
  const handleChangeFile = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleSwitch = e => {
    const value = e.target.value === 'true';
    const isActive = !value;
    setOtherService(isActive);
  };

  const handleSubmit = e => {
    setVisible(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('File', file);
    formData.append('Category', JSON.stringify(category));
    formData.append('OtherServices', otherService);
    addCategory(formData, (err, data) => {
      // console.log(err);
      if (err) {
        if (err?.response?.status === 412) {
          {
            err.response.data.data.errors
              ? setValidationErrors(err.response.data.data.errors)
              : setValidationErrors(err.response.data.message);
          }
        }
        setVisible(false);
        toast.error(err.response.data.message ?? 'Error while creating new category.');
      }
      if (data) {
        props.history.push('/categories');
        toast.success(data.message ?? 'New category created successfully.');
      }
    });
  };
  return (
    <Card>
      <CardHeader title="Add New Category">
        <CardHeaderToolbar>
          <BackButton to="/categories" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSubmit} value="Save" />
          </CustomLoadingOverlay>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="8">
              <Row>
                <Col sm="6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder="Category Name"
                      value={category.name || ''}
                      onChange={handleChange}
                      // maxLength="26"
                      className={validationErrors?.name ? 'is-invalid' : ''}
                    />
                    {validationErrors?.name ? (
                      <small className="text-danger">
                        {validationErrors.name.length > 0 ? validationErrors.name[0] : 'The name field is invalid.'}
                      </small>
                    ) : null}
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <Form.Group>
                    <Form.Label>Upload Icon</Form.Label>
                    <Form.Control name="iconFile" type="file" onChange={handleChangeFile} accept="image/png, image/jpeg" />
                  </Form.Group>
                </Col>

                <Col sm="6">
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={handleSwitch}
                        color="primary"
                        name={`other-services-switch`}
                        value={otherService}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        label="Primary"
                      />
                    }
                    label="Other Services"
                  />
                </Col>
                {otherService ? (
                  <Col sm="12">
                    <Form.Group>
                      <Form.Label>Url</Form.Label>
                      <Form.Control
                        name="serviceUrl"
                        type="text"
                        placeholder="Url"
                        onChange={handleChange}
                        // maxLength="50"
                      />
                    </Form.Group>
                  </Col>
                ) : null}
              </Row>
            </Col>

            <Col sm="4">
              <Form.Group>
                <img
                  src={filePath ? filePath : null}
                  alt=""
                  style={{
                    width: '194px',
                    height: '194px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #ccc',
                    borderRadius: '5px'
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
