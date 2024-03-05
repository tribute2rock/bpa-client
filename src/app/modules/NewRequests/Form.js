import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '../../../_metronic/_partials/controls';
import WorkflowFilterPanel from '../Workflow/pages/workflow/WorkflowFilterPanel';
import query from 'querystring';
import A from '../../../config/url';
import { getFormData } from '../../../config/form';
import { getFormById, addRequest, addDraft, newDynamicRequest, newDynamicDraft } from './api/newrequest';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import HTMLFormRender from './components/HTMLFormRender';
import { CLIENT_USER } from '../../../config/values';
import FormBuilder from 'dynamic-formbuilder-react';
import metaRoutes from '../../../config/meta_routes';
import { useDispatch, useSelector } from 'react-redux';
import { addRedirectUrl } from '../../../redux/user/userSlice';
import RequestStatus from '../../../constants/request';
import { isEmpty } from 'lodash';

const Form = props => {
  const [getFormField, setGetFormField] = useState(false);
  const [getForm, setGetForm] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState([]);
  const [css, setCss] = useState([]);
  const [javascript, setJavascript] = useState([]);
  const [submitType, setSubmitType] = useState();
  const [selectedFiles, setSelectedFiles] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const qs = query.parse(props.location.search);
  const id = A.getId(qs['?i']);
  const userInfo = useSelector(state => state.user?.data.user);
  const userToken = useSelector(state => state.user?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectUrl = props.history.location.pathname + props.history.location.search;
    if (userInfo) {
      getData();
    } else {
      dispatch(addRedirectUrl(redirectUrl));
      toast.info('Please login to proceed');
      props.history.push(metaRoutes.login);
    }
  }, [userInfo, userToken]);

  // useEffect(() => {
  //   getData();
  // }, []);

  const getData = () => {
    setGetFormField(true);
    const categoryId = id;
    if (categoryId !== null) {
      getFormById(categoryId, (err, data) => {
        if (err) return;
        const formOutput = data.data;
        setIsMounted(true);
        switch (formOutput.type) {
          case 'html':
            setGetForm(formOutput);
            setFormData(formOutput.formData.slice(1, -1));
            setCss(formOutput.css);
            setJavascript(formOutput.javascript);
            break;
          case 'dynamic':
            setGetForm(formOutput);
            setFormData(JSON.parse(formOutput.formData));
            break;
          default:
            toast.warn('Error occurred!');
            break;
        }
      });
    } else {
      toast.error('Error!');
    }
  };

  const submitFormHTML = e => {
    e.preventDefault();
    const formData = getFormData(e);
    delete formData.proceedForm;
    delete formData.saveAsDraft;
    const requestValues = Object.keys(formData).map(key => ({
      name: key,
      value: formData[key]
    }));
    let requestData;

    if (submitType === 'saveAsDraft') {
      requestData = {
        formId: getForm.id,
        requestSenderId: userInfo.id,
        statusId: RequestStatus.drafts,
        isDraft: submitType === 'saveAsDraft',
        requestValues: requestValues
      };
    } else {
      requestData = {
        formId: getForm.id,
        statusId: RequestStatus.pending,
        requestSenderId: userInfo.id,
        isDraft: submitType === 'saveAsDraft',
        requestValues: requestValues
      };
    }
    submitForm(requestData);
  };

  const formbuilderSubmitHandler = data => {
    submitDynamicForm(data);
  };

  const formbuilderDraftHandler = data => {
    submitDynamicForm(data, true);
  };

  const formbuilderFileSelectHandler = (e, props) => {
    if (e && e.target && e.target.files && e.target.files.length > 0) {
      const fieldName = props.data.field_name;
      const label = props.data.label;
      const file = {};
      file[fieldName] = {
        label,
        fieldName,
        files: e.target.files
      };
      setSelectedFiles({
        ...selectedFiles,
        ...file
      });
    }
  };

  const submitDynamicForm = (data, isDraft = false) => {
    let requestData;
    if (isDraft) {
      requestData = {
        formId: getForm.id,
        requestSenderId: userInfo.id,
        statusId: RequestStatus.drafts,
        isDraft: isDraft,
        isDynamic: true
      };
    } else {
      requestData = {
        formId: getForm.id,
        requestSenderId: userInfo.id,
        statusId: RequestStatus.pending,
        isDraft: isDraft,
        isDynamic: true
      };
    }
    const formData = new FormData();
    for (const property in requestData) {
      formData.append(property, requestData[property]);
    }
    formData.append('requestValues', JSON.stringify(data));
    const fileList = [];
    for (const item in selectedFiles) {
      const files = selectedFiles[item].files;
      for (const fileProperty in files) {
        if (files.hasOwnProperty(fileProperty)) {
          formData.append(item, files[fileProperty]);
        }
      }
      fileList.push({
        label: selectedFiles[item].label,
        fieldName: selectedFiles[item].fieldName
      });
    }

    formData.append('fileList', JSON.stringify(fileList));
    if (!isDraft) {
      newDynamicRequest(formData, (err, response) => {
        if (err) {
          if (err.response?.status && err.response.status === 412) {
            setValidationErrors(err.response.data.data);
          }
          toast.error(
            err.response?.data?.message ? err.response.data.message : 'Failed to submit request. Please try again later.'
          );
        } else {
          toast.success(response.message);
          props.history.push('/requests');
        }
      });
    } else {
      newDynamicDraft(formData, (err, response) => {
        if (err) {
          if (err.response?.status && err.response.status === 412) {
            setValidationErrors(err.response.data.data);
          }
          toast.error(
            err.response?.data?.message ? err.response.data.message : 'Failed to submit request. Please try again later.'
          );
        } else {
          toast.success(response.message);
          props.history.push('/requests');
        }
      });
    }
  };

  const submitForm = requestData => {
    if (submitType !== 'saveAsDraft') {
      addRequest(requestData, (err, json) => {
        if (err) toast.error('Error!');
        else {
          toast.success(json.message);
          props.history.push('/requests');
        }
      });
    } else {
      addDraft(requestData, (err, json) => {
        if (!err) {
          toast.success(json.message);
          props.history.push('/requests');
        }
      });
    }
  };

  return !isMounted ? null : (
    <Card>
      <WorkflowFilterPanel />
      <CardHeader title="Please Fill The Form"></CardHeader>
      <CardBody>
        {getFormField === false ? (
          <>
            <div className="form-title plr-30">
              <h6>
                <span className="text-info">NOTE: Cannot load form</span>
              </h6>
            </div>
          </>
        ) : (
          <>
            {/*  */}
            <div className="inner-item-box">
              {!isEmpty(validationErrors) && (
                <div className="row">
                  <div className="col-12">
                    <ul className="validation-errors">
                      {Object.keys(validationErrors).map(key => {
                        return <li>{validationErrors[key]}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-12">
                  <div className="react-form-builder-form">
                    {getForm.type === 'html' ? (
                      <form onSubmit={submitFormHTML} encType="multipart/form-data">
                        <HTMLFormRender type={CLIENT_USER} formData={formData} css={css} javascript={javascript} />
                        <div className="btn-toolbar">
                          <input
                            type="submit"
                            name="saveAsDraft"
                            className="btn btn-custom ml-2"
                            onClick={e => {
                              setSubmitType(e.target.name);
                            }}
                            value="Save as draft"
                          />
                          <input
                            type="submit"
                            name="proceedForm"
                            className="btn btn-custom"
                            onClick={e => {
                              setSubmitType(e.target.name);
                            }}
                            value="Submit"
                          />
                        </div>
                      </form>
                    ) : null}
                    {getForm.type === 'dynamic' ? (
                      <>
                        <FormBuilder.ReactFormGenerator
                          answer_data={[]}
                          action_name="Submit"
                          draft_action_name="Save as Draft"
                          data={formData}
                          onSubmit={formbuilderSubmitHandler}
                          onSaveDraft={formbuilderDraftHandler}
                          onFileSelect={formbuilderFileSelectHandler}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default Form;
