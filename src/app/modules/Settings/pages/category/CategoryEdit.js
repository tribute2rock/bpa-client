import React, { useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { getSingleCategory, updateCategory } from './api/category';
import A from '../../../../../config/url';
import query from 'querystring';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';
import { FormControlLabel, Switch } from '@material-ui/core';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export function CategoryEdit(props) {
  const [category, setCategory] = React.useState({});
  const [otherService, setOtherService] = React.useState(false);
  const [getfile, getFile] = React.useState();
  const [file, setFile] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [filePath, setFilePath] = React.useState();
  const qs = query.parse(props.location.search.slice(1));
  const id = A.getId(qs.id);

  useEffect(() => {
    getSingleCategory(id, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching category.');
      } else {
        getFile(data.iconFile);
        setCategory(data);
        setOtherService(data.otherServices);
      }
    });
  }, []);

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
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setCategory({ ...category, [name]: value });
  };
  const handleSubmit = e => {
    setVisible(true);
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('File', file);
    } else {
      formData.append('originalFile', getfile);
    }
    formData.append('Category', JSON.stringify(category));
    formData.append('OtherServices', otherService);
    updateCategory(id, formData, (err, data) => {
      if (err) {
        setVisible(false);
        toast.error(err.response.data.message ?? 'Error while updating category.');
      }
      if (data) {
        // setVisible(false);
        props.history.push('/categories');
        toast.success(data.message ?? 'Category updated successfully.');
      }
    });
  };
  return (
    <Card>
      <CardHeader title="Edit Category">
        <CardHeaderToolbar>
          <BackButton to="/categories" value="Back" />
          <CustomLoadingOverlay isLoading={visible}>
            <SaveButton handleSave={handleSubmit} value="Update" />
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
                      value={category ? category.name : category.name}
                      onChange={handleChange}
                    />
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
                        checked={otherService}
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
                        name="otherServicesUrl"
                        type="text"
                        placeholder="Url"
                        onChange={handleChange}
                        value={category ? category.otherServicesUrl : category.otherServicesUrl}
                      />
                    </Form.Group>
                  </Col>
                ) : null}
                {/*<Col sm="12">*/}
                {/*  <Form.Group controlId="exampleForm.ControlInput1">*/}
                {/*    <Form.Label>Description</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*      name="description"*/}
                {/*      as="textarea"*/}
                {/*      rows="3"*/}
                {/*      placeholder="Category Description"*/}
                {/*      value={category ? category.description : category.description}*/}
                {/*      onChange={handleChange}*/}
                {/*    />*/}
                {/*  </Form.Group>*/}
                {/*</Col>*/}
              </Row>
            </Col>
            <Col sm="4">
              <Form.Group>
                <img
                  src={
                    filePath
                      ? file
                        ? filePath
                        : process.env.PUBLIC_URL + './images/icons/' + file
                      : process.env.PUBLIC_URL + './images/icons/' + getfile
                  }
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

          {/* <div className="text-right">
            <hr className="mt-0" />
            <Button onClick={handleSubmit}>Save</Button>
          </div> */}
        </Form>
      </CardBody>
    </Card>
  );
}
