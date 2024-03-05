import React, { useState, useEffect } from 'react';
import { addRequest } from '../../../NewRequests/api/newrequest';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Col } from 'react-bootstrap';
import { BackButton, SaveButton, NextButton, PreviousButton } from '../../../../components/Buttons';
import A from '../../../../../config/url';
import { toast } from 'react-toastify';
import { getFormData } from '../../../../../config/form';
import query from 'querystring';
import FormBuilder from 'dynamic-formbuilder-react';
import { getDraftFormsByRequestId, editDraftRequest } from './api';
import is from 'date-fns/locale/is/index';
import HTMLFormRender from '../../../NewRequests/components/HTMLFormRender';
import status from '../../../../../../src/constants/request';
import { useSelector } from 'react-redux';

export const DraftRequestEdit = props => {
  const qs = query.parse(props.location.search.slice(1));
  const key = A.getId(qs.id);
  const userInfo = useSelector(state => state.user?.data.user);
  const type = 'draft';
  const [getRequest, setGetRequest] = useState();
  const [submitType, setSubmitType] = useState();

  const fetchForm = () => {
    const qs = query.parse(props.location.search.slice(1));
    const id = A.getId(qs.id);

    getDraftFormsByRequestId(id, (data, err) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching the data');
      } else {
        setGetRequest(data);
      }
    });
  };

  const onSubmitHTML = e => {
    e.preventDefault();
    // let innerForm = e.target.children[0].lastElementChild;
    const formData = getFormData(e);
    delete formData.proceedForm;
    delete formData.saveAsDraft;
    const requestValues = Object.keys(formData).map(key => ({
      name: key,
      value: formData[key]
    }));
    const requestData = {
      id: key,
      requestSenderId: userInfo.id,
      formId: getRequest ? getRequest.form.id : null,
      statusId: submitType === 'saveAsDraft' ? 5 : 1,
      isDraft: submitType === 'saveAsDraft',
      requestValues
    };
    editRequestData(requestData);
  };

  const formbuilderSubmitHandler = data => {
    const requestData = {
      id: key,
      requestSenderId: userInfo.id,
      formId: getRequest ? getRequest.form.id : null,
      statusId: status.pending,
      isDraft: false,
      requestValues: data
    };
    editRequestData(requestData);
  };

  const formbuilderDraftHandler = data => {
    const requestData = {
      id: key,
      requestSenderId: userInfo.id,
      formId: getRequest ? getRequest.form.id : null,
      statusId: status.drafts,
      isDraft: true,
      isDynamic: true,
      requestValues: data
    };
    editRequestData(requestData);
  };

  const editRequestData = requestValues => {
    // Checks if the user clicks Save as Draft button.
    if (requestValues.statusId === status.drafts) {
      editDraftRequest(requestValues, err => {
        if (!err) {
          props.history.push('/requests');
          toast.success('Request updated successfully.');
        } else {
          // props.history.push('/requests');
          toast.error('Failed to update request.');
        }
      });
    } else {
      addRequest(requestValues, (err, json) => {
        if (err) toast.error('Error!');
        else {
          toast.success(json.message);
          props.history.push('/requests');
        }
      });
    }
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <Card>
      <CardHeader title="Edit Draft Request">
        <CardHeaderToolbar>
          <BackButton to="/requests" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/*  */}
        <div className="inner-item-box">
          <div className="row">
            <div className="col-12">
              <div className="react-form-builder-form">
                {getRequest && getRequest.form.type === 'html' ? (
                  <form onSubmit={onSubmitHTML} encType="multipart/form-data">
                    <HTMLFormRender
                      requestValues={getRequest?.request_values || getRequest?.draft_request_values}
                      formData={getRequest.form ? getRequest.form.formData.slice(1, -1) : []}
                    />

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
                  </form>
                ) : null}

                {getRequest && getRequest.form.type === 'dynamic' ? (
                  <>
                    <FormBuilder.ReactFormGenerator
                      action_name="Submit"
                      draft_action_name="Save as Draft"
                      onSubmit={formbuilderSubmitHandler}
                      onSaveDraft={formbuilderDraftHandler}
                      answer_data={
                        getRequest.request_values
                          ? getRequest.request_values.map(reqVal => ({
                              id: reqVal.id,
                              name: reqVal.name,
                              value: JSON.parse(reqVal.value)
                            }))
                          : getRequest.draft_request_values
                          ? getRequest.draft_request_values.map(reqVal => ({
                              id: reqVal.id,
                              name: reqVal.name,
                              value: JSON.parse(reqVal.value)
                            }))
                          : []
                      }
                      data={JSON.parse(getRequest.form.formData || '{}')}
                    />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
