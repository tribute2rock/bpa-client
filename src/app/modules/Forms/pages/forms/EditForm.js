import React, { useState, useEffect } from 'react';
import { Form, Tab, Tabs, Row, Col } from 'react-bootstrap';
import {  Switch } from '@material-ui/core';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import {
  addPrintTemplateForm,
  canEdit,
  countActiveForm,
  getFormById,
  getPrintTemp,
  updateForm,
  updatePrintTemp
} from './api/form';
import { getWorkflow } from '../../../Workflow/pages/workflow/api';
import { getCategories } from '../../../Settings/pages/category/api/category';
import A from '../../../../../config/url';
import AddForm from './components/AddForm';
import query from 'querystring';
import { BackButton, NextButton, PreviousButton, ResetButton, SaveButton } from '../../../../components/Buttons';
import CustomSelect from '../../../../components/CustomSelect';
import FormBuilder from 'dynamic-formbuilder-react';
import FormBuilder2 from './components/formBuilder';
import { toast } from 'react-toastify';
// import autoPopulateItems from './components/autoPopulateItems';
// import availableValidationRules from './components/validationRules';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, ContentState, convertFromHTML, EditorState } from 'draft-js';
import { Multiselect } from 'multiselect-react-dropdown';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';

export const EditForm = props => {
  const [getForm, setForm] = useState({});
  const [formData, setFormData] = useState({});
  const [resetForm, setResetForm] = useState();
  const [css, setCss] = useState();
  const [js, setJs] = useState();
  const [workflow, setWorkflow] = useState([]);
  const [category, setCategory] = useState([]);
  const [tabValue, setTabValue] = useState(1);
  const [limitvalue, setlimitvalues] = useState(false);
  const [formFee, setformFee] = useState();
  const [resetformFee, setresetformFee] = useState();
  const [formFeeTabNext, setformFeeTabNext] = useState(3);
  const [formFeeTabPrev, setformFeeTabPrev] = useState(3);
  const [amountType, setAmountType] = useState();
  const [hasTAC, sethasTAC] = useState();
  const [resetHasTAC, setResetHasTAC] = useState();
  const [tacType, setTACtype] = useState();
  // const [reAuthorization, setReAuthorization] = useState();
  const [editorValue, setEditorValue] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState([]);
  // const [availableForms, setAvailableForms] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [request, setRequest] = useState(false);
  const [visible, setVisible] = useState(false);
  const [checkCCMS, setCheckedCCMS] = useState();

  const qs = query.parse(props.location.search.slice(1));
  const id = A.getId(qs.id);
  const formlimitationType = [
    { id: 1, name: 'Unlimited' },
    { id: 2, name: 'Specific Count' },
    { id: 3, name: 'After Approval' }
  ];
  const availableFor = [
    { id: 'Internal', name: 'Internal' },
    { id: 'Customer', name: 'Customer' },
    { id: 'Both', name: 'Both' }
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
  const categoryTypeForm = [
    { id: 'Non-Financial', name: 'Non-Financial' },
    { id: 'Financial', name: 'Financial' },
    { id: 'General', name: 'General' }
  ];

  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator

  useEffect(() => {
    getFormById(id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        setlimitvalues(data.limitType && data.limitType == 2 ? true : false);
        setCheckedCCMS(data.ccmsUrl ? true : false);
        setForm({
          id: data.id,
          type: data.type,
          workflowId: data.workflow.id,
          categoryId: data.category.id,
          name: data.name,
          description: data.description,
          limitType: data.limitType,
          limitValues: data.limitValues,
          formFees: data.formFees,
          requireReAuth: data.requireReAuth,
          TACtype: data.TACtype,
          TAC: data.TAC,
          availableFor: data.availableFor,
          formData: data.formData,
          css: data.css,
          javascript: data.javascript,
          print_temps: data.print_temps,
          requests: data.requests,
          formCategory: data.formCategory,
          finalPreview:data.enablePreview,
          branchSeperation: data.enableBranchSeperation,
          formEditEnable: data.enableFormEdit,
          formEditResubmit:data.enableReSubmit,
          ccmsURL: data.ccmsUrl
        });
        const TACtyp = data.TACtype ? data.TACtype : null;
        const TAC = data.TAC ? data.TAC : null;
        const formFees = data.formFees ? data.formFees : null;
        if (formFees) {
          setresetformFee(true);
        }
        if (TACtyp) {
          setResetHasTAC(true);
        }
        if (TACtyp === 'editor') {
          setEditorValue(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(convertFromHTML(TAC.replace('&lt;p>', '').replace('&lt;/p>', '')))
            )
          );
        }
        // const reAuth = data.requireReAuth ? data.requireReAuth : null;
        const req = data.requests ? data.requests[0] : null;
        if (req) {
          setRequest(true);
        }
        if (formFees) {
          setformFee(formFees);
        }
        if (!isNaN(formFees)) {
          setAmountType('amount');
        } else {
          // else if (!!pattern.test(formFees)) {
          setAmountType('url');
        }
        if (TACtyp) {
          sethasTAC(true);
        }
        // if(TAC){
        //   setEditorValue(TAC);
        // }
        setSelectedTemplate(data.print_temps);
        // setformFeesAmount(formFees);
        setTACtype(TACtyp);
        // setReAuthorization(reAuth);
      }
      getData();

      // const req=data.requests?data.requests[0]:null

      // if(req){
      //   setRequest(true)
      // }
    });
  }, [id]);
  const handleMultiSelect = e => {
    setSelectedTemplate(e);
  };

  const handleMultiRemove = e => {
    if (e === 'reset') {
      setSelectedTemplate(null);
    } else {
      setSelectedTemplate(e);
    }
  };

  const getData = () => {
    getWorkflow({}, (err, data) => {
      setWorkflow(data);
    });
    getCategories({}, (err, data) => {
      setCategory(data.data);
    });
    getPrintTemp({}, (err, data) => {
      setTemplates(data);
    });
  };
  const handleChange = e => {
    if (e === 'reset') {
      setlimitvalues(getForm && getForm.limitValues ? true : false);
      setResetForm(null);
      // setForm(getForm);
    } else {
      if (e.target.name === 'flowCount' && e.target.value < 1) {
        toast.info(`${e.target.placeholder} can not be less than 1.`);
        return;
      }
      setResetForm({ ...resetForm, [e.target.name]: e.target.value });
    }
  };
  const handleChangeLimitationType = e => {
    if (e === 'reset') {
      setResetForm(null);
      // setForm(getForm);
    } else {
      setResetForm({ ...resetForm, [e.target.name]: e.target.value });
      setlimitvalues(e.target.value == 2 ? true : false);
    }
  };
  const handleChangeAmtType = e => {
    const value = e.target.value;
    if (value === 'amount') {
      setAmountType(value);
    } else if (value === 'url') {
      setAmountType(value);
    }
  };
  const handleChangeTermsAndCondtionType = e => {
    const value = e.target.value;
    setResetForm({ ...resetForm, [e.target.name]: e.target.value });
    if (value === 'url') {
      setTACtype(value);
    } else if (value === 'editor') {
      setTACtype(value);
    }
  };
  const onEditorStateChange = editorValue => {
    setEditorValue(editorValue);
    const editorHTML = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
    setResetForm({ ...resetForm, TAC: editorHTML });
  };

  const onChangeFormFee = e => {
    if (e === 'reset') {
      setformFee(resetformFee);
      if (formFee === false) {
        setformFeeTabNext(4);
        setformFeeTabPrev(2);
      } else if (formFee === true) {
        setformFeeTabNext(3);
        setformFeeTabPrev(3);
      }
    } else {
      const formFeeStatus = e.target.checked;
      setformFee(formFeeStatus);
      if (formFeeStatus === false) {
        setformFeeTabNext(4);
        setformFeeTabPrev(2);
        setResetForm({ ...resetForm, formFees: null });
      } else if (formFeeStatus === true) {
        setformFeeTabNext(3);
        setformFeeTabPrev(3);
      }
    }
  };
  // const ReAuthorization = e => {
  //   const reAuthStatus = e.target.checked;
  //   setReAuthorization(reAuthStatus);
  // };
  const TermsCondition = (e, hasTAC) => {
    if (e === 'reset') {
      sethasTAC(resetHasTAC);
    } else {
      const tacStatus = e.target.checked;
      sethasTAC(tacStatus);
      if (tacStatus === false) {
        setResetForm({ ...resetForm, TACtype: null, TAC: null });
      }
    }
  };
  // const multiSelectRef = React.createRef();
  const htmlFormsData = {
    html: getForm.formData ? getForm.formData.replace(/\\n/g, ' ').replace(/\\/g, '') : '',
    css: getForm.css ? getForm.css : '',
    javascript: getForm.javascript ? getForm.javascript.replace('&lt;', '<').replace('&gt;', '>') : ''
  };
  const dynamicFormsData = getForm.formData ? getForm.formData : null;

  const onPost = data => {
    setFormData(data.task_data);
  };
  const onLoad = async () => {
    setFormData(JSON.parse(dynamicFormsData));
    return JSON.parse(dynamicFormsData);
  };
  const dataSet = data => {
    setFormData(data.html);
    setCss(data.css);
    setJs(data.js);
  };
  const handleSubmit = () => {
    setVisible(true);
    // countActiveForm(id, (err, data) => {
    // if (data.data) {
    //   toast.info('This form is in use. You cannot modify/delete this form.');
    //   // props.history.push('/forms');
    //   return;
    // }
    const formId = getForm.id;
    const updateData = {
      type: resetForm && resetForm.type ? resetForm.type : getForm.type,
      workflowId: resetForm && resetForm.workflowId ? resetForm.workflowId : getForm.workflowId,
      categoryId: resetForm && resetForm.categoryId ? resetForm.categoryId : getForm.categoryId,
      name: resetForm && resetForm.name ? resetForm.name : getForm.name,
      description: resetForm && resetForm.description ? resetForm.description : getForm.description,
      limitType: resetForm && resetForm ? resetForm.limitType : getForm.limitType,
      limitValues:
        resetForm && resetForm ? resetForm.limitValues : resetForm && resetForm.limitType == 2 ? getForm.limitValues : null,
      formFees: resetForm && resetForm ? resetForm.formFees : getForm.formFees,
      // requireReAuth:getForm.requireReAuth,
      // requireReAuth: false,
      TACtype: resetForm && resetForm ? resetForm.TACtype : getForm.TACtype,
      TAC: resetForm && resetForm.TAC ? resetForm.TAC : getForm.TAC,
      availableFor: resetForm && resetForm.availableFor ? resetForm.availableFor : getForm.availableFor,
      formData: JSON.stringify(formData),
      javascript: js,
      css: css,
      formCategory: resetForm && resetForm.formCategory ? resetForm.formCategory : getForm.formCategory,
      flowCount: resetForm && resetForm.flowCount ? resetForm.flowCount : getForm.flowCount,
      finalPreview:getForm.finalPreview ? true : false,
      branchSeperation: getForm.branchSeperation ? true : false,
      formEditEnable:  getForm.formEditEnable ? true : false,
      formEditResubmit: getForm.formEditResubmit ? true : false,
      ccmsURl: getForm.ccmsUrl
    };
    updateForm({ formId, updateData, selectedTemplate }, err => {
      if (!err) {
        // TODO: Display message which is given by backend.
        toast.success('Form has been updated.');
        props.history.push('/forms');
      } else {
        toast.error('Error!!');
      }
    });
    setVisible(false);
  };
  const handleToggleTab = tab => {
    setTabValue(tab);
  };
  const handleFormCategoryChange = e => {
    if (e === 'reset') {
      setResetForm(null);
    } else {
      setResetForm({ ...resetForm, [e.target.name]: e.target.value });
    }
  };
  const handlePreview = (e) => {
    setForm({ ...getForm, finalPreview: e.target.checked });
  };
  const handleBranchWiseSeperation = (e) => { 
    setForm({ ...getForm, branchSeperation: e.target.checked});
  };
  const handleFormEdit = (e) => {
    setForm({ ...getForm, formEditEnable:  e.target.checked });
  };
  const handleFormResubmit = (e) => {
    setForm({ ...getForm, formEditResubmit: e.target.checked });
  }
  const funCCMS = (val) => {
    setCheckedCCMS(val => !val);
  }
  const handleCcmsUrlChange = e => {
    console.log("=====hhandjhfhuj====");
  }
  return (
    <>
      {request ? (
        <div className="alert bg-light-danger border-light-danger text-dark">Cannot change Editor Field ..</div>
      ) : null}
      <Tabs activeKey={tabValue} onSelect={handleToggleTab} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Form">
          <Card>
            <CardHeader title="Edit Form">
              <CardHeaderToolbar>
                <ResetButton
                  value="Reset"
                  handleReset={() => {
                    handleChange('reset');
                    onChangeFormFee('reset', formFee);
                    TermsCondition('reset', hasTAC);
                    handleMultiRemove('reset');
                  }}
                />
                <BackButton to="/forms" />
                {/* {formFee === true || hasTAC === true ? ( */}
                <NextButton
                  handleNext={() => {
                    handleToggleTab(2);
                    // handleToggleTab(hasTAC && formFee ? formFeeTabNext : 3);
                  }}
                />
                {/* ) : (
                <SaveButton handleSave={handleSubmit} value="Update" />
              )} */}
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
                      placeholder="Form Name"
                      value={resetForm ? resetForm.name : getForm ? getForm.name : null}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Category</Form.Label>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      name="categoryId"
                      value={resetForm ? resetForm.categoryId : getForm ? getForm.categoryId : null}
                      handleChange={handleChange}
                      options={category}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Workflow</Form.Label>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      name="workflowId"
                      value={resetForm ? resetForm.workflowId : getForm ? getForm.workflowId : null}
                      handleChange={handleChange}
                      request={request}
                      options={workflow}
                    />
                    {request ? <small className="text-warning">WorkFlow is in use</small> : null}
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Limitation type</Form.Label>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      id="limitType"
                      name="limitType"
                      value={resetForm ? resetForm.limitType : getForm ? getForm.limitType : null}
                      handleChange={handleChangeLimitationType}
                      options={formlimitationType}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Form Category</Form.Label>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      id="categoryType"
                      name="formCategory"
                      value={resetForm ? resetForm.formCategory : getForm ? getForm.formCategory : null}
                      handleChange={handleFormCategoryChange}
                      options={categoryTypeForm}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Available For</Form.Label>
                    <CustomSelect
                      {...props}
                      className="form-control pt-2"
                      name="availableFor"
                      placeholder="Select Availability"
                      value={resetForm ? resetForm.availableFor : getForm ? getForm.availableFor : null}
                      handleChange={handleChange}
                      options={availableFor}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Select Download Template</Form.Label>
                    <Multiselect
                      // ref={resetForm?resetForm.print_temps:getForm ? getForm.print_temps : null}
                      options={templates}
                      selectedValues={selectedTemplate ? selectedTemplate : null}
                      onSelect={handleMultiSelect}
                      onRemove={handleMultiRemove}
                      displayValue="name"
                    />
                  </Form.Group>
                </Col>
                {limitvalue ? (
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Limit Values</Form.Label>
                      <Form.Control
                        type="number"
                        name="limitValues"
                        placeholder="Form Limit Values"
                        value={resetForm ? resetForm.limitValues : getForm ? getForm.limitValues : null}
                        onChange={handleChange}
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
                      rows="5"
                      placeholder="Form Description"
                      value={resetForm ? resetForm.description : getForm ? getForm.description : null}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Flow Count</Form.Label>
                    <Form.Control
                      required
                      value={resetForm ? resetForm.flowCount : getForm ? getForm.flowCount : null}
                      type="number"
                      name="flowCount"
                      placeholder="Flow Count"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Push to CCMS</Form.Label>
                    <div className="col-9 col-form-label">
                      <div className="checkbox-inline">
                        <label className="checkbox checkbox-primary">
                          <input
                            checked={checkCCMS}
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
                {checkCCMS ? (
                    <Col md = {6}>
                      <Form.Group>
                        <Form.Label>Enter Api</Form.Label>
                        <Form.Control 
                          type="text"
                          value = {getForm?.ccmsURL ? getForm.ccmsURL : ''}
                          onChange = {handleCcmsUrlChange}
                        />
                      
                      </Form.Group>
                    </Col>
                  ): null
                }
                <Col md={12}>
                  <div className="form-group row">
                    <label className="col-3 col-form-label">Form Fee</label>
                    <div className="col-9 col-form-label">
                      <div className="checkbox-inline">
                        <label className="checkbox checkbox-primary">
                          <input onChange={onChangeFormFee} type="checkbox" name="formFee" checked={formFee} />
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
                          <input onChange={TermsCondition} type="checkbox" name="toc" checked={hasTAC} />
                          <span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </Col>
                {/* REMOVE Requires Re-Authorization Feature */}

                {/* <Col md={12}>
                <div className="form-group row">
                  <label className="col-3 col-form-label">Requires Re-Authorization</label>
                  <div className="col-9 col-form-label">
                    <div className="checkbox-inline">
                      <label className="checkbox checkbox-primary">
                      <input onChange={ReAuthorization} type="checkbox" name="requireReAuth" checked={reAuthorization} />
                        <span></span>
                      </label>
                    </div>
                  </div>
                </div>
              </Col> */}
              </Row>
            </CardBody>
          </Card>
        </Tab>

        {/* REMOVE EDITOR FOR FORM EDIT */}
        <Tab eventKey={2} title="Editor">
          <Card>
            <CardHeader title="Editor">
              <CardHeaderToolbar>
                <PreviousButton handlePrevious={() => handleToggleTab(1)} />
                {formFee === true || hasTAC === true ? (
                  <NextButton
                    handleNext={() => {
                      handleToggleTab(formFee ? formFeeTabNext : 4);
                    }}
                  />
                ) : (
                  <CustomLoadingOverlay isLoading={visible}>
                    <SaveButton handleSave={handleSubmit} value="Update" />
                  </CustomLoadingOverlay>
                )}
              </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
              {getForm.type === 'html' ? (
                <AddForm dataSet={dataSet} data={htmlFormsData} request={request} />
              ) : getForm.formData ? (
                !request ? (
                  <>
                    <FormBuilder2
                      answer_data={[]}
                      data={JSON.parse(dynamicFormsData || '{}')}
                      onLoad={onLoad}
                      onPost={onPost}
                      // autoPopulateItems={autoPopulateItems}
                      // availableValidationRules={availableValidationRules}
                    />
                  </>
                ) : (
                  <div className="body-overlay">
                    <FormBuilder.ReactFormGenerator
                      answer_data={[]}
                      data={JSON.parse(dynamicFormsData || '{}')}
                      hide_actions
                      read_only
                    />
                  </div>
                )
              ) : null}
            </CardBody>
          </Card>
        </Tab>
        {formFee ? (
          <Tab eventKey={3} title="Form Fee">
            <Card>
              <CardHeader title="Form Fee">
                <CardHeaderToolbar>
                  <PreviousButton handlePrevious={() => handleToggleTab(2)} />
                  {!hasTAC ? (
                    <SaveButton handleSave={handleSubmit} value="Update" />
                  ) : (
                    <NextButton
                      handleNext={() => {
                        handleToggleTab(4);
                      }}
                    />
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
                        value={amountType || ''}
                        handleChange={handleChangeAmtType}
                        options={formAmount}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      {amountType === 'amount' ? (
                        <>
                          <Form.Label>Amount(in Rs):</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            name="formFees"
                            placeholder="Enter Amount"
                            value={
                              (!isNaN(getForm.formFees) === true || (resetForm && !isNaN(resetForm.formFees) === true)
                                ? resetForm
                                  ? resetForm.formFees
                                  : getForm.formFees
                                : null) || ''
                            }
                            onChange={handleChange}
                          />
                        </>
                      ) : null}
                      {amountType === 'url' ? (
                        <>
                          <Form.Label>URL</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="formFees"
                            placeholder="Enter your Url"
                            value={
                              // getForm && (!!pattern.test(getForm.formFees) === true) || resetForm && (!!pattern.test(resetForm.formFees) === true)
                              getForm ? (resetForm ? resetForm.formFees : getForm.formFees) : null || ''
                            }
                            onChange={handleChange}
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
        {hasTAC === true ? (
          <Tab eventKey={4} title="Terms And Condition">
            <Card>
              <CardHeader title="Terms & Condition">
                <CardHeaderToolbar>
                  <PreviousButton handlePrevious={() => handleToggleTab(hasTAC && formFee ? formFeeTabPrev : 2)} />
                  <SaveButton handleSave={handleSubmit} value="Update" />
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
                        value={tacType ? tacType : ''}
                        handleChange={handleChangeTermsAndCondtionType}
                        options={tcType}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {tacType === 'url' ? (
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>URL</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="TAC"
                          placeholder="Form Url"
                          onChange={handleChange}
                          value={(tacType === 'url' ? (resetForm ? resetForm.TAC : getForm.TAC) : null) || ''}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ) : null}
                {tacType === 'editor' ? (
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Editor</Form.Label>
                        <Editor
                          editorState={editorValue ? editorValue : null}
                          // initialContentState={editorValue}
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
                          // mention={{
                          //   separator: ' ',
                          //   trigger: '@',
                          //   suggestions: [
                          //     { text: 'APPLE', value: 'apple', url: 'apple' },
                          //     { text: 'BANANA', value: 'banana', url: 'banana' },
                          //     { text: 'CHERRY', value: 'cherry', url: 'cherry' },
                          //     { text: 'DURIAN', value: 'durian', url: 'durian' },
                          //     { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
                          //     { text: 'FIG', value: 'fig', url: 'fig' },
                          //     { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
                          //     { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
                          //   ],
                          // }}
                          // defaultEditorState={(getForm.TAC? getForm.TAC : null)||''}
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
                {formFee === true || hasTAC === true ? (
                  <NextButton
                    handleNext={() => {
                      handleToggleTab(formFee ? formFeeTabNext : 4);
                    }}
                  />
                ) : (
                  <CustomLoadingOverlay isLoading={visible}>
                    <SaveButton handleSave={handleSubmit} value="Update" />
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
                        checked={getForm.finalPreview? true : false}
                        onChange={handlePreview}
                        color="primary"
                        name={`switch-enable-preview`}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable BranchWise Seperation</Form.Label>
                    <Switch
                        checked={getForm.branchSeperation ? true : false}
                        onChange={handleBranchWiseSeperation}
                        color="primary"
                        name={`switch-branchWise`}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Form Edit</Form.Label>
                    <Switch
                        checked={getForm.formEditEnable ? true : false}
                        onChange={handleFormEdit}
                        color="primary"
                        name={`switch-FormEdit`}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Enable Form Re-Submit</Form.Label>
                    <Switch
                        checked={getForm.formEditResubmit? true : false}
                        onChange={handleFormResubmit}
                        color="primary"
                        name={`switch-reSubmit`}
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
