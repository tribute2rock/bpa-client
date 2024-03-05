import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import { Form, Tab, Tabs, Row, Col } from 'react-bootstrap';
import { BackButton, NextButton, PreviousButton, SaveButton } from '../../../components/Buttons';
import AddForm from '../../Forms/pages/forms/components/AddForm';
import FormBuilder2 from '../../Forms/pages/forms/components/formBuilder';
import { getSubformById, updateSubForm } from '../api/subform';
import A from '../../../../config/url';
import query from 'querystring';
import { toast } from 'react-toastify';
import CustomLoadingOverlay from '../../../components/CustomLoadingOverlay';
export const EditSubForm = props => {
  const [tabValue, setTabValue] = useState(1);
  const [subFormData, setSubFormData] = useState({});
  const qs = query.parse(props.location.search.slice(1));
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [formData, setFormData] = useState('');
  const [visible, setVisible] = useState(false);
  const id = A.getId(qs.id);
  const handleChange = e => {
    setSubFormData({ ...subFormData, [e.target.name]: e.target.value });
    // console.log('SUB FORM DATA', subFormData);
  };
  // const funCCMS = () => {};
  const dynamicFormsData = subFormData.formData ? subFormData.formData : null;
  const dataSet = data => {
    setFormData(data.html);
    setCss(data.css);
    setJs(data.js);
  };
  const onLoad = async () => {
    setFormData(JSON.parse(dynamicFormsData));
    return JSON.parse(dynamicFormsData);
  };
  const onPost = data => {
    setFormData(data.task_data);
  };
  const htmlFormsData = {
    html: subFormData.formData ? subFormData.formData.replace(/\\n/g, ' ').replace(/\\/g, '') : '',
    css: subFormData.css ? subFormData.css : '',
    javascript: subFormData.javascript ? subFormData.javascript.replace('&lt;', '<').replace('&gt;', '>') : ''
  };
  const handleToggleTab = tab => {
    setTabValue(tab);
  };
  const getData = () => {
    getSubformById(id, (err, data) => {
      if (err) {
        toast.error('Error!!');
      } else {
        // console.log('FORM DATATAT=>', data);
        setSubFormData({
          id: data.id,
          name: data.name,
          description: data.description,
          javascript: data.javascript,
          type: data.type,
          css: data.css,
          formData: data.formData
        });
      }
    });
  };
  const handleSubmit = e => {
    // setVisible(true);
    // const subFormId = subFormData.id;
    // console.log('SUBFORM ID=>', subFormId);
    const updateData = {
      id: subFormData.id ? subFormData.id : id,
      type: subFormData.type ? subFormData.type : '',
      name: subFormData.name ? subFormData.name : '',
      description: subFormData.description ? subFormData.description : '',
      javascript: js,
      css: css,
      formData: JSON.stringify(formData)
    };
    updateSubForm(updateData, err => {
      if (!err) {
        toast.success('Sub Form Updated Successfully!!');
        props.history.push('/sub-form');
      } else {
        console.log('ERROR=>', err);
        toast.error('Error!!');
      }
    });
  };
  useEffect(() => {
    getData();
  }, [id]);
  // console.log('SUB FORM DATA=>', subFormData);

  return (
    <>
      <Tabs activeKey={tabValue} id="uncontrolled-tab-example" onSelect={handleToggleTab}>
        <Tab eventKey={1} title="Sub Form">
          <Card>
            <CardHeader title="Edit Sub Form">
              <CardHeaderToolbar>
                <BackButton to="/sub-form" />
                <NextButton
                  handleNext={() => {
                    handleToggleTab(2);
                  }}
                />
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Sub Form Name"
                      value={subFormData ? subFormData.name : ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      rows="5"
                      placeholder="Form Description"
                      value={subFormData ? subFormData.description : ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={4}>
                  <Form.Group>
                    <Form.Label>Push to CCMS</Form.Label>
                    <div className="col-9 col-form-label">
                      <div className="checkbox-inline">
                        <label className="checkbox checkbox-primary">
                          <input
                            // checked={CCMS}
                            onClick={e => {
                              funCCMS(e.target.checked);
                            }}
                            type="checkbox"
                            name="Checkboxes5"
                          />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enter Api Name</Form.Label>
                    <Form.Control
                      // className={message ? 'is-invalid' : null}
                      required
                      type="text"
                      name="ccmsUrl"
                      placeholder="Form Name"
                      // value={form.ccmsUrl || ''}
                      onChange={handleChange}
                      maxLength="30"
                    />
                  </Form.Group>
                </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey={2} title="Editor">
          <Card>
            <CardHeader title="Editor">
              <CardHeaderToolbar>
                <PreviousButton handlePrevious={() => handleToggleTab(1)} />
                <CustomLoadingOverlay isLoading={visible}>
                  <SaveButton handleSave={handleSubmit} value="Update" />
                </CustomLoadingOverlay>
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {subFormData.type === 'html' ? (
                <AddForm dataSet={dataSet} data={htmlFormsData} />
              ) : subFormData.formData ? (
                <>
                  <FormBuilder2
                    answer_data={[]}
                    data={JSON.parse(dynamicFormsData || '{}')}
                    onLoad={onLoad}
                    onPost={onPost}
                  />
                </>
              ) : (
                ''
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};
