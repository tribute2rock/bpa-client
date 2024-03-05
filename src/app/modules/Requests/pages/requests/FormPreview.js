import React from 'react';
import FormBuilder from 'dynamic-formbuilder-react';
import InnerHTML from 'dangerously-set-html-content';
import HTMLFormRender from './HTMLFormRender';
import HTMLFormRenderPreview from './HTMLFormRenderPreview';
const populateURL = process.env.REACT_APP_POPULATE_URL;

export const FormPreview = props => {
  return (
    <>
      <InnerHTML html={props?.getformData?.viewScript ? props?.getformData?.viewScript : props?.getformData?.javascript} />
      <div className="container content-section">
        <div className="inner-content-border h-100">
          <div className="vertical-tab-body">
            <div className="tab-content">
              <div className="tab-cnt-single">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-title plr-30"></div>
                  </div>
                </div>
                <div className="inner-item-box">
                  <div className="row">
                    <div className="col-12">
                      <div className="react-form-builder-form">
                        {props.getRequest && props.getformData ? (
                          <>
                            {props.getformData.type && props.getformData.type === 'html' ? (
                              <>
                                <div className="body-overlay">
                                  {props?.formPreview && props?.getformData?.id===2 || props.getformData?.id===4? (
                                    <HTMLFormRenderPreview
                                      requestValues={props.getRequest || ''}
                                      formData={props.getformData.viewData}
                                      printform={props.printform ? props.printform : false}
                                    />
                                  ) : (
                                    <HTMLFormRender
                                      requestValues={props.getRequest || ''}
                                      formData={props.getformData.formData}
                                      printform={props.printform ? props.printform : false}
                                      javascript={props?.getformData?.javascript}
                                    />
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="body-overlay">
                                  <FormBuilder.ReactFormGenerator
                                    draft_action_name=""
                                    answer_data={
                                      props.getRequest
                                        ? props.getRequest.map(reqVal => ({
                                            id: reqVal.id,
                                            name: reqVal.name,
                                            value: JSON.parse(reqVal.value)
                                          }))
                                        : ''
                                    }
                                    data={JSON.parse(props.getformData.formData ? props.getformData.formData : null)}
                                    hide_actions
                                    read_only
                                    // accessToken={userToken.accessToken}
                                    // autoPopulateUrl={populateURL}
                                  />
                                </div>
                              </>
                            )}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
