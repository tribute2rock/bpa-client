import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Form, Tab, Tabs, Row, Col } from 'react-bootstrap';
import query from 'querystring';
import AddForm from './components/AddForm';
import FormBuilder2 from './components/formBuilder';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Switch } from '@material-ui/core';
import { addForm, addSubForm, getPrintTemp } from './api/form';
import { getWorkflow } from '../../../Workflow/pages/workflow/api';
import { getCategories } from '../../../Settings/pages/category/api/category';
import { BackButton, NextButton, PreviousButton, ResetButton, SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';
import CustomSelect from '../../../../components/CustomSelect';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState } from 'draft-js';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

const FormBuilder = props => {
  const formlimitationType = [
    { id: 1, type: 'Unlimited' },
    { id: 2, type: 'Specific Count' },
    { id: 3, type: 'After Approval' }
  ];
  const availableCustomer = [
    { id: 1, type: 'Internal' },
    { id: 2, type: 'Customer' },
    { id: 3, type: 'Both' }
  ];
  const categoryTypeForm = [
    { id: 1, type: 'Non-Financial' },
    { id: 2, type: 'Financial' },
    { id: 3, type: 'General' }
  ];
  const finalPreview = [
    { id: 1, type: 'Yes' },
    { id: 2, type: 'No' }
  ];
  const tcType = [
    { id: '', name: 'Select Type' },
    { id: 'url', name: 'Link' },
    { id: 'editor', name: 'Text' }
  ];
  const formAmount = [
    { id: '', name: 'Select Type' },
    { id: 'amount', name: 'Amount' },
    { id: 'url', name: 'Link' }
  ];
  const [visible, setVisible] = useState(false);

  const [formType, setFormType] = useState(null);
  const [formNature, setFormNature] = useState(null);
  const [form, setForm] = useState({ flowCount: 1 });
  const [formData, setFormData] = useState({});
  const [css, setCss] = useState();
  const [js, setJs] = useState();
  const [workflow, setWorkflow] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryState, setCategoryState] = useState([]);
  const [workflowState, setWorkflowState] = useState([]);
  const [formLimitationState, setFormLimitationState] = useState([]);
  const [availabilityState, setAvailabilityState] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  const [availability, setAvailability] = useState(availableCustomer);
  const [checkedState, setCheckedState] = useState();
  const [formFee, setFormFee] = useState();
  const [formAmt, setFormAmt] = useState();
  const [customeSelect, setCustomeSelect] = useState();
  const [reAuthorization, setReAuthorization] = useState(false);
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());
  const [templates, setTemplates] = useState([]);
  const [templateSelect, setTemplateSelect] = useState([]);
  const [message, setMessage] = useState();
  const [spinner, setSpinner] = useState(false);
  const [formDataType, setFormDataType] = useState({});
  const [CCMS, setCCMS] = useState(false);
  const [categoryFormState, setCategoryFormState] = useState([]);
  useEffect(() => {
    const qs = query.parse(props.location.search.slice(1));
    const type = qs.type;
    funCCMS();
    setFormNature(qs.formNature);
    setFormType(type);
    getData();
    setForm({
      ...form,
      limitType: formlimitationType[0] ? formlimitationType[0].id : null,
      categoryType: categoryTypeForm[0] ? categoryTypeForm[0].type : null,
      finalPreview: false,
      branchWiseSep: false,
      canFormEdit: false,
      canFormReSubmit: false,
      canviewTimeline:false,
    });
  }, []);

  const getData = () => {
    getWorkflow({}, (err, data) => {
      if (!err) setWorkflow(data);
    });
    getCategories({}, (err, data) => {
      if (!err) setCategory(data.data);
    });
    getPrintTemp({}, (err, data) => {
      setTemplates(data);
    });
  };

  const funCCMS = params => {
    setCCMS(params);
  };

  const onPost = data => {
    setFormData(data.task_data);
  };

  // handling template select changes
  const handleTemplateSelect = e => {
    setTemplateSelect(e);
  };

  const handleTemplateRemove = e => {
    setTemplateSelect(e);
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const { maxLength } = e.target;
    if (name === 'flowCount' && e.target.value < 1) {
      toast.info(`${e.target.placeholder} can not be less than 1.`);
      return;
    }
    setForm({ ...form, [name]: value });
    setMessage(null);
    if (value.length === maxLength && name === 'name') {
      toast.info(`The maximum character limit for form ${e.target.name} has reached.`);
    }
    if (value === 'url') {
      setCustomeSelect(true);
    } else if (value === 'editor') {
      setCustomeSelect(false);
    } else {
      return;
    }
  };

  const handleChangeAmt = e => {
    const formFees = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [formFees]: value });
    if (value === 'amount') {
      setFormAmt(true);
    } else if (value === 'url') {
      setFormAmt(false);
    } else {
      return;
    }
  };

  const handleAvailabilityChange = (event, value) => {
    setAvailabilityState(value);
    setForm({ ...form, availableFor: value ? value.type : null });
  };

  const handleCategoryChange = (event, value) => {
    setCategoryState(value);
    setForm({ ...form, categoryId: value ? value.id : null });
  };

  const handleWorkflowChange = (event, value) => {
    setWorkflowState(value);
    setForm({ ...form, workflowId: value ? value.id : null });
  };

  const handleFormLimitationChange = (event, value) => {
    setFormLimitationState(value);
    setForm({ ...form, limitType: value ? value.id : null });
  };

  const handleFormCategoryChange = (e, val) => {
    setCategoryFormState(val);
    setForm({ ...form, categoryType: val ? val.type : null });
  };

  const handlePreview = e => {
    let val = e.target.value === 'true';
    setForm({ ...form, finalPreview: !val });
  };
  const handleBranchWiseSeperation = e => {
    let val = e.target.value === 'true';

    setForm({ ...form, branchWiseSep: !val });
  };
  const handleFormTimeline = e =>{
    let val = e.target.value === 'true';

    setForm({ ...form, canviewTimeline: !val });
  }
  const handleFormEdit = e => {
    let val = e.target.value === 'true';
    setForm({ ...form, canFormEdit: !val });
  };
  const handleFormResubmit = e => {
    let val = e.target.value === 'true';
    setForm({ ...form, canFormReSubmit: !val });
  };

  const dataSet = value => {
    const formdata = value && value.html ? value.html : null;
    // console.log(data);
    let obj = {};
    let obj1 = {};
    let obj2 = {};
    let obj3 = {};
    let res;
    let res1;
    let res2;
    let res3;
    let data;
    let data1;
    let data2;
    let data3;
    if (formdata) {
      let result = formdata.split('></input>');
      result.pop();

      let result1 = formdata.split('><option');
      result1.pop();

      let result2 = formdata.split('></textarea>');
      result2.pop();

      res = result.map(row => {
        data = row
          .split('name=')
          .pop()
          .split('"');
        return (obj = { label: data[1] });
      });
      res1 = [...new Map(res.map(item => [item['label'], item])).values()];
      // const unique = [...new Set(res.map(item => item.label))];
      // console.log(unique);
      // res1 = unique.map(row => {
      //   return (obj1 = { label: row });
      // });
      // console.log(res1);

      res2 = result1.map(row => {
        data2 = row
          .split('name=')
          .pop()
          .split('"');
        return (obj2 = { label: data2[1] });
      });

      res3 = result2.map(row => {
        data3 = row
          .split('name=')
          .pop()
          .split('"');
        return (obj3 = { label: data3[1] });
      });

      res2.map(item => {
        res1.push(item);
      });
      res3.map(item => {
        res1.push(item);
      });
    }
    // console.log(res1);
    setFormDataType(res1 ? res1 : null);
    setFormData(JSON.stringify(value.html));
    setCss(value.css);
    setJs(value.js);
  };

  const handleSubmit = e => {
    // setVisible(true);
    if (formData === 'null' || formData === '""' || Object.keys(formData).length === 0) {
      setVisible(false);
      toast.error('Form editor cannot be empty');
    } else {
      if (formType === 'html') {
        const htmlFormData = {
          ...form,
          type: formType,
          formDataType: formDataType,
          formData: formData?.replace(/\s/g, ' '),
          css: css?.replace(/\s/g, ' '),
          js: js ? js.replace('&lt;', '<').replace('&gt;', '>') : '',
          requireReAuth: reAuthorization,
          templateData: templateSelect
        };
        if (!formNature) {
          addForm(htmlFormData, (err, json) => {
            // TODO: Display message which is given by backend.
            if (err) {
              setVisible(false);
              toast.error('Failed to create new form.');
            } else {
              toast.success('Form created');
              props.history.push('/forms');
            }
            // setVisible(false);
          });
        } else {
          addSubForm(htmlFormData).then(response => {
            setVisible(false);
            if (response.status === 'Success') {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
            // setVisible(false);
            props.history.push('/sub-form');
          });
        }
      } else {
        const dynamicFormData = {
          ...form,
          type: formType,
          formData: JSON.stringify(formData),
          requireReAuth: reAuthorization,
          templateData: templateSelect
        };
        if (!formNature) {
          addForm(dynamicFormData, async (err, json) => {
            // TODO: Display message which is given by backend.
            if (err) {
              setVisible(false);
              toast.error(err);
            } else {
              toast.success(json?.message ? json.message : 'New form created successfully.');
              props.history.push('/forms');
            }
            // setVisible(false);
          });
        } else {
          addSubForm(dynamicFormData).then(response => {
            // setVisible(false);
            if (response.status === 'Success') {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
            // setVisible(false);
            props.history.push('/sub-form');
          });
        }
      }
    }
    // setVisible(false);
  };

  const handleToggleTab = tab => {
    for (const propName in form) {
      if (form[propName] === null || form[propName] === undefined || form[propName] === '') {
        delete form[propName];
      }
    }
    if (Object.keys(form).length === 0) {
      setMessage('Please enter form name');
    } else {
      setTabValue(tab);
    }
  };
  const TermsCondition = e => {
    if (checkedState === false) {
      setCheckedState(true);
    } else {
      setCheckedState(false);
    }
  };
  const ReAuthorization = e => {
    if (reAuthorization === false) {
      setReAuthorization(true);
    } else {
      setReAuthorization(false);
    }
  };
  const FormFee = e => {
    if (formFee === false) {
      setFormFee(true);
    } else {
      setFormFee(false);
    }
  };
  const onEditorStateChange = editorValue => {
    setEditorValue(editorValue);
    const editorHTML = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
    setForm({ ...form, TAC: editorHTML });
  };

  const reset = () => {
    setForm({
      ...form,
      name: [],
      categoryId: [],
      workflowId: [],
      limitType: [],
      limitValues: [],
      availableFor: [],
      description: [],
      formFees: [],
      TACtype: [],
      TAC: []
    });
    setFormFee(false);
    setCheckedState(false);
    setCategoryState([]);
    setWorkflowState([]);
    setAvailabilityState([]);
    setTemplateSelect([]);
    setFormLimitationState([]);
    setFormData({});
  };
  return (
    <>
      {/* {spinner ? <div className="animated fadeIn pt-1 text-center">Loading...</div> : null} */}
      <Tabs activeKey={tabValue} onSelect={handleToggleTab}>
        <Tab eventKey={1} title="Form">
          <Card>
            <CardHeader title="New Form">
              <CardHeaderToolbar>
                <ResetButton value="Reset" handleReset={reset} />
                <BackButton to="/forms" />
                <NextButton
                  handleNext={() => {
                    for (const propName in form) {
                      if (form[propName] === null || form[propName] === undefined || form[propName] === '') {
                        delete form[propName];
                      }
                    }
                    if (Object.keys(form).length === 0) {
                      setMessage('Please enter form name');
                    } else {
                      return handleToggleTab(2);
                    }
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
                      className={message ? 'is-invalid' : null}
                      required
                      type="text"
                      name="name"
                      placeholder="Form Name"
                      value={form.name || ''}
                      onChange={handleChange}
                      maxLength="30"
                    />
                    <small className="text-danger">{message}</small>
                  </Form.Group>
                </Col>
                {!formNature ? (
                  <>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Category</Form.Label>
                        <Autocomplete
                          id="category"
                          name="categoryId"
                          options={category}
                          className="form-control pt-2"
                          getOptionLabel={option => option.name}
                          defaultValue={category.find(option => option.name)}
                          value={categoryState}
                          renderInput={params => <TextField {...params} placeholder="Select Category" />}
                          onChange={handleCategoryChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Workflow</Form.Label>
                        <Autocomplete
                          id="combo-box-demo"
                          name="workflowId"
                          options={workflow}
                          className="form-control pt-2"
                          getOptionLabel={option => option.name}
                          value={workflowState}
                          renderInput={params => <TextField {...params} placeholder="Select Workflow" />}
                          onChange={handleWorkflowChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Limitation type</Form.Label>
                        <Autocomplete
                          className="form-control pt-2"
                          id="limitType"
                          name="limitType"
                          options={formlimitationType}
                          defaultValue={
                            formLimitationState && formLimitationState.length !== 0
                              ? formLimitationState
                              : formlimitationType[0]
                          }
                          getOptionLabel={option => option.type}
                          renderInput={params => (
                            <TextField {...params} placeholder="Select Limit Type" defaultValue="Unlimited" />
                          )}
                          onChange={handleFormLimitationChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Form Category</Form.Label>
                        <Autocomplete
                          className="form-control pt-2"
                          id="limitType"
                          name="limitType"
                          options={categoryTypeForm}
                          defaultValue={
                            categoryFormState && categoryFormState.length !== 0 ? categoryFormState : categoryTypeForm[0]
                          }
                          getOptionLabel={option => option.type}
                          renderInput={params => (
                            <TextField {...params} placeholder="Select Form Category Type" defaultValue="Financial" />
                          )}
                          onChange={handleFormCategoryChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Available For</Form.Label>
                        <Autocomplete
                          id="combo-box-demo"
                          name="workflowId"
                          options={availability}
                          className="form-control pt-2"
                          getOptionLabel={option => option.type}
                          value={availabilityState}
                          renderInput={params => <TextField {...params} placeholder="Select Availability" />}
                          onChange={handleAvailabilityChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Download Template</Form.Label>
                        <Multiselect
                          options={templates}
                          onSelect={handleTemplateSelect}
                          onRemove={handleTemplateRemove}
                          selectedValues={templateSelect}
                          displayValue="name"
                        />
                      </Form.Group>
                    </Col>
                  </>
                ) : null}
                {formLimitationState && formLimitationState.id == 2 ? (
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Limit Value</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="limitValues"
                        placeholder="Enter Limit Values"
                        // value={form.name || ''}
                        onChange={handleChange}
                        maxLength="3"
                      />
                    </Form.Group>
                  </Col>
                ) : null}
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      required
                      rows="5"
                      placeholder="Form Description"
                      value={form.description || ''}
                      onChange={handleChange}
                      maxLength="300"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Flow Count</Form.Label>
                    <Form.Control
                      className={message ? 'is-invalid' : null}
                      required
                      type="number"
                      name="flowCount"
                      placeholder="Flow Count"
                      value={form.flowCount || ''}
                      onChange={handleChange}
                    />
                    <small className="text-danger">{message}</small>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Push to CCMS</Form.Label>
                    <div className="col-9 col-form-label">
                      <div className="checkbox-inline">
                        <label className="checkbox checkbox-primary">
                          <input
                            checked={CCMS}
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
                {CCMS ? (
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Enter Api</Form.Label>
                      <Form.Control
                        className={message ? 'is-invalid' : null}
                        required
                        type="text"
                        name="ccmsUrl"
                        value={form.ccmsUrl || ''}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                ) : null}

                {!formNature ? (
                  <>
                    <Col md={12}>
                      <div className="form-group row">
                        <label className="col-3 col-form-label">Form Fee</label>
                        <div className="col-9 col-form-label">
                          <div className="checkbox-inline">
                            <label className="checkbox checkbox-primary">
                              <input checked={formFee} onClick={FormFee} type="checkbox" name="Checkboxes5" />
                              <span></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="form-group row">
                        <label className="col-3 col-form-label">Has Terms & Condition</label>
                        <div className="col-9 col-form-label">
                          <div className="checkbox-inline">
                            <label className="checkbox checkbox-primary">
                              <input checked={checkedState} onClick={TermsCondition} type="checkbox" name="tac" />
                              <span></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                ) : null}
                <Col md={12}>
                  {/* <div className="form-group row">
                  <label className="col-3 col-form-label">Requires Re-Authorization</label>
                  <div className="col-9 col-form-label">
                    <div className="checkbox-inline">
                      <label className="checkbox checkbox-primary">
                        <input onChange={ReAuthorization} type="checkbox" name="requireReAuth" />
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div> */}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey={2} title="Editor">
          <Card>
            <CardHeader title="Editor">
              <CardHeaderToolbar>
                <PreviousButton handlePrevious={() => handleToggleTab(1)} />
                {/* <SaveButton handleSave={handleSubmit} value="Save" /> */}
                {formFee === true || checkedState === true ? (
                  <NextButton
                    handleNext={() => {
                      handleToggleTab(3);
                    }}
                  />
                ) : (
                  <CustomLoadingOverlay isLoading={visible}>
                    <SaveButton handleSave={handleSubmit} disabled value="Save" />
                  </CustomLoadingOverlay>
                )}
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {formType === 'html' ? (
                <AddForm dataSet={dataSet} />
              ) : (
                <FormBuilder2 answer_data={[]} data={formData} onPost={onPost} />
              )}
            </CardBody>
          </Card>
        </Tab>
        {formFee === true ? (
          <Tab eventKey={3} title="Form Fee">
            <Card>
              <CardHeader title="Form Fee">
                <CardHeaderToolbar>
                  <PreviousButton handlePrevious={() => handleToggleTab(2)} />
                  {checkedState === true ? (
                    <NextButton
                      handleNext={() => {
                        handleToggleTab(4);
                      }}
                    />
                  ) : (
                    <CustomLoadingOverlay isLoading={visible}>
                      <SaveButton handleSave={handleSubmit} value="Save" />
                    </CustomLoadingOverlay>
                  )}
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Fees Type</Form.Label>
                      <CustomSelect
                        {...props}
                        className="form-control pt-2"
                        name="formFees"
                        // value={getForm ? getForm.workflowId : ''}
                        handleChange={handleChangeAmt}
                        options={formAmount}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      {formAmt === true ? (
                        <>
                          <Form.Label>Amount(in Rs):</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            name="formFees"
                            placeholder="Enter Amount"
                            // value={form.formFees || ''}
                            onChange={handleChangeAmt}
                          />
                        </>
                      ) : null}
                      {formAmt === false ? (
                        <>
                          <Form.Label>URL</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="formFees"
                            placeholder="Enter your Url"
                            onChange={handleChangeAmt}
                          />
                        </>
                      ) : null}
                    </Form.Group>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Tab>
        ) : null}
        {checkedState === true ? (
          <Tab eventKey={4} title="Terms And Condition">
            <Card>
              <CardHeader title="Terms & Condition">
                <CardHeaderToolbar>
                  <PreviousButton handlePrevious={() => handleToggleTab(3)} />
                  <CustomLoadingOverlay isLoading={visible}>
                    <SaveButton handleSave={handleSubmit} value="Save" />
                  </CustomLoadingOverlay>
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Type</Form.Label>
                      <CustomSelect
                        {...props}
                        className="form-control pt-2"
                        name="TACtype"
                        // value={getForm ? getForm.workflowId : ''}
                        handleChange={handleChange}
                        options={tcType}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {customeSelect === true ? (
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>URL</Form.Label>
                        <Form.Control required type="text" name="TAC" placeholder="Form Url" onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : null}
                {customeSelect === false ? (
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Editor</Form.Label>
                        <Editor
                          editorState={editorValue}
                          wrapperClassName="border border-dark"
                          placeholder="Enter comment"
                          onEditorStateChange={onEditorStateChange}
                          toolbar={{
                            options: [
                              'inline',
                              'blockType',
                              'fontSize',
                              'fontFamily',
                              'list',
                              'textAlign',
                              'colorPicker',
                              'link',
                              'history'
                            ]
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : null}
              </CardBody>
            </Card>
          </Tab>
        ) : null}
        <Tab eventKey={5} title="Settings">
          <Card>
            <CardHeader title="Editor">
              <CardHeaderToolbar>
                <PreviousButton handlePrevious={() => handleToggleTab(1)} />
                {/* <SaveButton handleSave={handleSubmit} value="Save" /> */}
                {formFee === true || checkedState === true ? (
                  <NextButton
                    handleNext={() => {
                      handleToggleTab(3);
                    }}
                  />
                ) : (
                  <CustomLoadingOverlay isLoading={visible}>
                    <SaveButton handleSave={handleSubmit} disabled value="Save" />
                  </CustomLoadingOverlay>
                )}
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Preview</Form.Label>
                    <Switch
                      checked={form.finalPreview}
                      onChange={handlePreview}
                      color="primary"
                      name={`switch-enable-preview`}
                      value={form.finalPreview}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable BranchWise Seperation</Form.Label>
                    <Switch
                      checked={form.branchWiseSep}
                      onChange={handleBranchWiseSeperation}
                      color="primary"
                      name={`switch-branchWise`}
                      value={form.branchWiseSep}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Form Edit</Form.Label>
                    <Switch
                      checked={form.canFormEdit}
                      onChange={handleFormEdit}
                      color="primary"
                      name={`switch-FormEdit`}
                      value={form.canFormEdit}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Form Re-Submit</Form.Label>
                    <Switch
                      checked={form.canFormReSubmit}
                      onChange={handleFormResubmit}
                      color="primary"
                      name={`switch-reSubmit`}
                      value={form.canFormReSubmit}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Form Timeline Preview</Form.Label>
                    <Switch
                      checked={form.canviewTimeline}
                      onChange={handleFormTimeline}
                      color="primary"
                      name={`switch-reSubmit`}
                      value={form.canviewTimeline}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
};

export default FormBuilder;
