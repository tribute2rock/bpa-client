import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Form, Row, Tab, Table, Tabs, Dropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Card, CardBody, CardFooter, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { useParams, Link, NavLink } from 'react-router-dom';
import { StepLabel, Stepper, TextField, Step } from '@material-ui/core';
import DocIcon from '../../../../../_metronic/_assets/img/doc.svg';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  getActions,
  getOneRequest,
  getReturnGroups,
  getReferGroups,
  submitRequestAction,
  getSubform,
  newSubformRequest,
  createAndDownloadPdf,
  getRequestTemplate,
  verifyRequestItem,
  customerRegistration,
  getSendMail,
  getBranchLists,
  downloadEdited
} from './api';
// import { getFormData } from './api';
import { getSubformById, getSubForms } from '../../../SubForm/api/subform';
import { useDispatch, useSelector } from 'react-redux';
import {
  BackButton,
  NextButton,
  PickButton,
  PreviousButton,
  SaveButton,
  RollBackButton
} from '../../../../components/Buttons';
import _, { isEmpty } from 'lodash';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import Dropzone from '../../../../components/Dropzone';
import File from '../../../../components/File';
import File1 from '../../../../components/File1';
// sub fomr imports
import HTMLFormRender from '../../../NewRequests/components/HTMLFormRender';
import FormBuilder from 'dynamic-formbuilder-react';
import query from 'querystring';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { server } from '../../../../../config/server';
import { FormPreview } from './FormPreview';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';
import Swal from 'sweetalert2';
import ReactToPrint from 'react-to-print';
import purify from 'dompurify';
import MyEditor from '../../../../components/TemplateEditor/Editor';
import { removeRequestMultipick } from '../../../../../redux/user/multiPickSlice';
import A from '../../../../../config/url';

export const RequestView = props => {
  const dispatch = useDispatch();
  const multipickIdArray = useSelector(state => state.multipick?.multipickIds);
  let componentRef = useRef();
  let componentRefs = useRef();
  let modalRefs = useRef();
  const printStyle = { size: 'A4', marginTop: '2.54cm', textAlign: 'justify', orientation: 'portrait', scale: '100%;' };
  const [actions, setActions] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [returnUsers, setReturnUsers] = useState([]);
  const [referGroups, setReferGroups] = useState([]);
  const [requestsList, setRequestList] = useState([]);
  const [workFlowType, setWorkFlowType] = useState([]);
  //  sub form
  const [modalShow, setModalShow] = useState(false);
  const [dbSubform, setDbSubForm] = useState({});
  const [dbSubformData, setDbSubformData] = useState([]);
  const [dbAllSubformValue, setDbAllSubformValue] = useState([]);
  const [subformId, setSubformId] = useState();
  const [getSubForm, setGetSubForm] = useState([]);
  const [subFormData, setSubFormData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [displaySubform, setDisplaySubform] = useState([]);
  const [typeOfGurantee, setTypeOfGurantee] = useState();
  const [isBG, setIsBG] = useState(false);
  const [mailCheck, setMailCheck] = useState(false);
  const toggleSubModal = params => {
    setModalShow(!modalShow);
    if (dbAllSubformValue.length > 0) {
      if (params.currentUserId) {
        const temp = dbAllSubformValue.find(element => element.senderId == params.currentUserId);
        setDisplaySubform(temp.sub_request_values);
      } else {
        setDisplaySubform(dbAllSubformValue[0].sub_request_values);
      }
    }
  };

  const closeSubModal = (
    <button className="close" onClick={toggleSubModal}>
      &times;
    </button>
  );
  const [requestTimeline, setRequestTimeline] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [canEditTemplate, setCanEditTemplate] = useState(false);
  const [requestStatus, setRequestStatus] = useState();
  const [modal, setModal] = useState(false);
  const [requestData, setRequestData] = useState();
  const [activeStep, setActiveStep] = React.useState(0);
  const [levels, setLevels] = useState([]);
  const [form, setForm] = useState({});
  const [formData, setFormData] = useState([]);
  const [workflowFiles, setWorkflowFiles] = useState([]);
  const [customerDetails, setcustomerDetails] = useState({});
  const [visible, setVisible] = useState(false);
  const server_url = process.env.REACT_APP_SERVER_URL;
  const validationURL = process.env.REACT_APP_VALIDATION_URL;
  const populateURL = 'http://localhost:8181/api/auto-populate';

  const [allGroups, setAllGroups] = useState([]);
  const { id } = useParams();
  const userInfo = useSelector(state => state.user?.data.user);
  const userToken = useSelector(state => state.user?.data.accessToken);
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());
  const [tabName, setTabName] = useState('request');
  const { buttonLabel, className } = props;
  const [modalTimeLine, setModalTimeLine] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [branchLists, setBranchLists] = useState([]);

  const toggleTimeLine = params => {
    setModalTimeLine(!modalTimeLine);
    setUserDetails(params);
  };
  const closeBtn = (
    <button className="close" onClick={toggleTimeLine}>
      &times;
    </button>
  );
  const toggle = () => setModal(!modal);
  const [css, setCss] = useState([]);
  const [javascript, setJavascript] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitType, setSubmitType] = useState();
  const [selectedFiles, setSelectedFiles] = useState({});
  const [requestTemplates, setRequestTemplates] = useState([]);
  const [canPick, setCanPick] = useState([]);
  const [triggerRequest, setTriggerRequest] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);
  const [success, setSuccess] = useState(false);
  const [swiftUpload, setSwiftUpload] = useState(false);
  const [signatureVerification, setSignatureVerification] = useState(false);
  const [localLC, setLocalLC] = useState(false);
  const [swiftClosed, setSwiftClosed] = useState(false);
  const [reqId, setReqId] = useState();
  const [senderType, setSenderType] = useState('');
  //Preview detail for download confirmation
  const [modalPreview, setModalPreview] = useState(false);
  const [previewData, setPreviewData] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const togglePreview = params => {
    setEditTemplate(false);
    setModalPreview(!modalPreview);
  };
  const [formModel, setFormModelShow] = useState(false);
  const [formForPreview, setFormForPreview] = useState({});
  const toggleFormPreview = params => {
    setFormModelShow(!formModel);
  };

  const [finalEditedTemplate, setFinalEditedTemplate] = useState('');
  const [editTemplate, setEditTemplate] = useState(false);
  const closePreviewBtn = (
    <button className="close" onClick={toggleFormPreview}>
      &times;
    </button>
  );

  const qs = query.parse(props.location.search);
  const tabStatus = qs['?s'];
  const branchId = qs['?b'];

  /**
   * Checks if any request value has a file field.
   *
   * @param rows
   * @returns {boolean}
   */
  const checkHasFiles = rows => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].type === 'file') {
        return true;
      }
    }
    return false;
  };

  // Sub form modal
  const handleModal = () => {
    setModalShow(true);
  };

  const editorContent = content => {
    setFinalEditedTemplate(content);
  };

  const checkSubFormVisibility = formName => {
    if (
      (['BG Form Decentralized', 'BG Form Centralized'].includes(formName) &&
        userInfo.permissions.includes('view-sub-form-bg')) ||
      (['LC Form Decentralized', 'LC Form Centralized'].includes(formName) &&
        userInfo.permissions.includes('view-sub-form-lc')) ||
      !['LC Form Decentralized', 'LC Form Centralized', 'BG Form Decentralized', 'BG Form Centralized'].includes(formName)
    ) {
      return true;
    }
    return false;
  };

  const handleTrigger = async () => {
    // take form data and then register new user
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure to create this corporate customer?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      let reqData = {};
      requestsList.map(row => {
        if (
          row.type === 'text' &&
          (row.name == 'registration_email' ||
            row.name == 'registration_mobile_number' ||
            row.name == 'registration_account_name' ||
            row.name == 'registration_account_number')
        ) {
          reqData[row.name] = JSON.parse(row.value);
        }
      });
      const formData = new FormData();
      formData.append('actionId', 10);
      formData.append('verify', 'customerRegistration');
      formData.append('reqData', JSON.stringify(reqData));
      submitRequestAction(id, formData, (err, data) => {
        if (err || data.data.code == 0) {
          return toast.error(data?.message || 'Failed to create new customer.');
        }
        return toast.success(data?.message || 'New customer registered successfully');
      });
      // const register = await customerRegistration(formData);
      // if (register && register.data?.data?.email) {
      //   return toast.success(register?.data?.message || 'New customer registered successfully');
      // } else {
      //   return toast.error(register?.data?.message || 'Failed to create new customer.');
      // }
    }
  };

  const handleSwiftCheckbox = async () => {
    const confirmValue = await Swal.fire({
      title: '',
      text: swiftUpload ? 'Are you sure to disprove swift upload?' : 'Are you sure to confirm swift upload?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      // const result = await verifyRequestItem(id, 'swiftUpload');
      // if (result.status == 'Success') {
      //   setSwiftUpload(!swiftUpload);
      //   toast.success(result.message ?? 'Swift upload updated.');
      // }
      const formData = new FormData();
      formData.append('actionId', 10);
      formData.append('verify', 'swiftUpload');
      submitRequestAction(id, formData, (err, data) => {
        if (!err) {
          setSwiftUpload(!swiftUpload);
          toast.success(data.message ?? 'Swift verification updated successfully');
          window.location.reload(true);
        } else {
          toast.error(err.response.data.message ?? 'Failed to perform swift verification.');
        }
      });
    }
  };

  const handleLocalLcCheckbox = async () => {
    const confirmValue = await Swal.fire({
      title: '',
      text: localLC ? 'Are you sure to revert this LC?' : 'Are you sure this is a local LC?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      const formData = new FormData();
      formData.append('actionId', 10);
      formData.append('verify', 'localLC');
      submitRequestAction(id, formData, (err, data) => {
        if (!err) {
          setLocalLC(!localLC);
          toast.success(data.message ?? 'LC transferred to local');
          window.location.reload(true);
        } else {
          toast.error(err.response.data.message ?? 'Failed to transfer to Local LC.');
        }
      });
    }
  };

  const handleSwiftClose = async () => {
    const confirmValue = await Swal.fire({
      title: '',
      text: swiftClosed ? 'Are you sure to revert swift close?' : 'Are you sure to confirm swift close?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      const formData = new FormData();
      formData.append('actionId', 10);
      formData.append('verify', 'swiftClosed');
      submitRequestAction(id, formData, (err, data) => {
        if (!err) {
          setSwiftClosed(!swiftClosed);
          toast.success(data.message ?? 'Swift closed successfully');
          window.location.reload(true);
        } else {
          toast.error(err.response.data.message ?? 'Failed to close swift request.');
        }
      });
    }
  };

  const handleSignatureCheckbox = async () => {
    const confirmValue = await Swal.fire({
      title: '',
      text: signatureVerification
        ? 'Are you sure to disprove verified signature?'
        : 'Are you sure to confirm signature verification?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      // const result = await verifyRequestItem(id, 'signatureVerified');
      // if (result.status == 'Success') {
      //   setSignatureVerification(!signatureVerification);
      //   toast.success(result.message ?? 'Signature verification updated.');
      // }
      const formData = new FormData();
      formData.append('actionId', 10);
      formData.append('verify', 'signatureVerified');

      submitRequestAction(id, formData, (err, data) => {
        if (!err) {
          setSignatureVerification(!signatureVerification);
          toast.success(data.message ?? 'Signature verification updated successfully');
          window.location.reload(true);
        } else {
          toast.error(err.response.data.message ?? 'Failed to perform Signature verification.');
        }
      });
    }
  };
  const handleMailSend = async e => {
    e.preventDefault();
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure to confirm send Email?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (confirmValue.value) {
      setMailCheck(prev => !prev);
      const templateIds = requestTemplates.map(data => data.id);
      getSendMail(id, templateIds, requestTimeline, userInfo.id, (err, data) => {
        if (!err) {
          toast.info('Mail send to swift successfully!');
        } else {
          toast.error('Error Occured!!! Mail not send');
        }
      });
    }
  };

  const handleRollBackModel = async params => {
    <Col md="12">
      <Form.Group>
        <Form.Label>Comment :</Form.Label>
        <Editor
          wrapperClassName="border border-dark"
          placeholder="Enter comment"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history']
          }}
        />
      </Form.Group>
    </Col>;

    const rollback = await Swal.fire({
      title: 'Are you sure?',
      text: `The Selected Request will be RollBack to you.`,
      html: `<h6>The Selected Request will be RollBack to you.</h6>
      <div class="form-group">
      <label class="float-start text-start" for="exampleFormControlTextarea1">Reason</label>
      <textarea id="comments" name="comments" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>`,
      preConfirm: () => {
        const comments = Swal.getPopup().querySelector('#comments').value;
        if (!comments) {
          Swal.showValidationMessage(`Please enter Comments`);
        }
        return { ...params, comments: comments };
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    });
    if (rollback.value) {
      const formData = new FormData();
      formData.append('actionId', 9);
      formData.append('comment', rollback.value?.comments);

      submitRequestAction(id, formData, (err, data) => {
        if (!err) {
          toast.success(data.message ?? 'Request rollback successfully.');
        } else {
          toast.error(err.response?.data?.message ?? 'Failed to perform action on request.');
        }
      });
    }
  };

  const getData = () => {
    setVisible(true);
    /**** Get Form Data0 *****/
    // getFormData(id, (err, data) => {
    //   if (!err) {
    //     setRequestedFormData(data);
    //   }
    // });
    getOneRequest(id, (err, data) => {
      if (!err) {
        setReqId(data.data.key);
        setFormForPreview(data.data.form);
        if (data.data.form.type === 'dynamic') {
          let formData = JSON.parse(data.data.form.formData);
          /**
           * Replacing all - with underscore as it was giving problems during
           * object filter while extracting values.
           */
          formData.map(item => {
            if (item.hasOwnProperty('field_name')) {
              item.field_name = item.field_name.replaceAll('-', '_');
              return true;
            }
            return false;
          });
          setFormData(formData);
        }
        setSenderType(data.data.reqSenderType);
        setForm(data.data.form);
        const sortedData = data.data.fields
          .filter(obj => obj.value && obj.value.trim() !== '""') // exclude objects with null or empty string values
          .sort((a, b) => {
            // First, sort by the lowest labelOrder (if available)
            if (a.labelOrder && b.labelOrder) {
              return parseInt(a.labelOrder) - parseInt(b.labelOrder);
            } else if (a.labelOrder) {
              return -1; // Place object 'a' before object 'b'
            } else if (b.labelOrder) {
              return 1; // Place object 'b' before object 'a'
            }

            // If labelOrder is not available for both objects, sort by label
            if (a.label && b.label) {
              const labelComparison = a.label.localeCompare(b.label);
              if (labelComparison !== 0) {
                return labelComparison;
              }
            } else if (a.label) {
              return -1; // Place object 'a' before object 'b'
            } else if (b.label) {
              return 1; // Place object 'b' before object 'a'
            }

            // If label is also not available for both objects, sort by name
            return a.name.localeCompare(b.name);
          });
        setRequestList(sortedData);
        setHasFiles(checkHasFiles(data.data.fields));
        setCanEdit(data.data.canEdit);
        setCanEditTemplate(data.data.canEditTemplate);
        setLevels(data.data.levels);
        setActiveStep(_.findLastIndex(data.data.levels, o => o.status === 1));
        setRequestTimeline(data.data.timeline);
        setRequestStatus(data.data.status);
        setSwiftUpload(data.data.swiftUpload);
        setSignatureVerification(data.data.signatureVerification);
        setLocalLC(data.data.localLC);
        setSwiftClosed(data.data.swiftClosed);
        setCanPick(data.data.canPick);
        setcustomerDetails(data.data.customer);
        setTriggerRequest(data.data.canTrigger);
        setWorkFlowType(data.data.form.workflow.workflowType);

        if (data.data.subform.id && data.data.subform.type === 'dynamic') {
          let formData = JSON.parse(data.data.subform.formData);
          formData.map(item => {
            if (item.hasOwnProperty('field_name')) {
              item.field_name = item.field_name.replaceAll('-', '_');
              return true;
            }
            return false;
          });
          setDbSubformData(formData);
        }
        if (data.data.subform.id) {
          setDbAllSubformValue(data.data.allSubRequest);
          setDisplaySubform(data.data.allSubRequest[0].sub_request_values);
          setDbSubForm(data.data.subform);
        }
        setVisible(false);
      } else {
        setVisible(false);
      }
    });

    getActions(Number(id), (err, data) => {
      if (!err) {
        setActions(data);
      } else {
        setVisible(false);
      }
    });

    // sub form section
    getSubform(id, (err, data) => {
      if (data) {
        getSubformById(data, (err, subform) => {
          setSubformId(subform.id);
          if (err) return;
          const formOutput = subform;
          setIsMounted(true);
          switch (formOutput.type) {
            case 'html':
              setGetSubForm(formOutput);
              setSubFormData(formOutput.formData.slice(1, -1));
              setCss(formOutput.css);
              let js = formOutput.javascript.replace(':requestId', id);
              setJavascript(js);
              break;
            case 'dynamic':
              setGetSubForm(formOutput);
              setSubFormData(JSON.parse(formOutput.formData));
              break;
            default:
              toast.warn('Error occurred!');
              break;
          }
        });
      } else {
        setVisible(false);
      }
    });
    // sub form end

    // setRequestTemplates([]);
    getRequestTemplate(id, (err, data) => {
      if (!err) {
        setRequestTemplates(data);
      } else {
        setVisible(false);
      }
    });
  };

  const getActionsData = level => {
    const lastIndexUserId = level[level.length - 1].userId;
    let isApprover = false;
    if (lastIndexUserId === userInfo.id) {
      isApprover = true;
    }
    getActions(isApprover, (err, data) => {
      if (!err) {
        setActions(data);
      }
    });
  };

  const setIcons = action => {
    switch (action) {
      case 1:
        return (
          <span className="svg-icon svg-icon-warning svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M18,15 L18,13.4774152 C18,13.3560358 18.0441534,13.2388009 18.1242243,13.147578 C18.3063883,12.9400428 18.622302,12.9194754 18.8298372,13.1016395 L21.7647988,15.6778026 C21.7814819,15.6924462 21.7971714,15.7081846 21.811763,15.7249133 C21.9932797,15.933015 21.9717282,16.2488631 21.7636265,16.4303797 L18.828665,18.9903994 C18.7375973,19.0698331 18.6208431,19.1135979 18.5,19.1135979 C18.2238576,19.1135979 18,18.8897403 18,18.6135979 L18,17 L16.445419,17 C14.5938764,17 12.8460429,16.1451629 11.7093057,14.6836437 L7.71198984,9.54423755 C6.95416504,8.56989138 5.7889427,8 4.55458097,8 L2,8 L2,6 L4.55458097,6 C6.40612357,6 8.15395708,6.85483706 9.29069428,8.31635632 L13.2880102,13.4557625 C14.045835,14.4301086 15.2110573,15 16.445419,15 L18,15 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                />
                <path
                  d="M18,6 L18,4.4774157 C18,4.3560363 18.0441534,4.23880134 18.1242243,4.14757848 C18.3063883,3.94004327 18.622302,3.9194759 18.8298372,4.10163997 L21.7647988,6.67780304 C21.7814819,6.69244668 21.7971714,6.70818509 21.811763,6.72491379 C21.9932797,6.93301548 21.9717282,7.24886356 21.7636265,7.43038021 L18.828665,9.99039986 C18.7375973,10.0698336 18.6208431,10.1135984 18.5,10.1135984 C18.2238576,10.1135984 18,9.88974079 18,9.61359842 L18,8 L16.445419,8 C15.2110573,8 14.045835,8.56989138 13.2880102,9.54423755 L9.29069428,14.6836437 C8.15395708,16.1451629 6.40612357,17 4.55458097,17 L2,17 L2,15 L4.55458097,15 C5.7889427,15 6.95416504,14.4301086 7.71198984,13.4557625 L11.7093057,8.31635632 C12.8460429,6.85483706 14.5938764,6 16.445419,6 L18,6 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </span>
        );
      case 2:
        return (
          <span className="svg-icon svg-icon-danger svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path
                  d="M8.29606274,4.13760526 L1.15599693,10.6152626 C0.849219196,10.8935795 0.826147139,11.3678924 1.10446404,11.6746702 C1.11907213,11.6907721 1.13437346,11.7062312 1.15032466,11.7210037 L8.29039047,18.333467 C8.59429669,18.6149166 9.06882135,18.596712 9.35027096,18.2928057 C9.47866909,18.1541628 9.55000007,17.9721616 9.55000007,17.7831961 L9.55000007,4.69307548 C9.55000007,4.27886191 9.21421363,3.94307548 8.80000007,3.94307548 C8.61368984,3.94307548 8.43404911,4.01242035 8.29606274,4.13760526 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                />
                <path
                  d="M23.2951173,17.7910156 C23.2951173,16.9707031 23.4708985,13.7333984 20.9171876,11.1650391 C19.1984376,9.43652344 16.6261719,9.13671875 13.5500001,9 L13.5500001,4.69307548 C13.5500001,4.27886191 13.2142136,3.94307548 12.8000001,3.94307548 C12.6136898,3.94307548 12.4340491,4.01242035 12.2960627,4.13760526 L5.15599693,10.6152626 C4.8492192,10.8935795 4.82614714,11.3678924 5.10446404,11.6746702 C5.11907213,11.6907721 5.13437346,11.7062312 5.15032466,11.7210037 L12.2903905,18.333467 C12.5942967,18.6149166 13.0688214,18.596712 13.350271,18.2928057 C13.4786691,18.1541628 13.5500001,17.9721616 13.5500001,17.7831961 L13.5500001,13.5 C15.5031251,13.5537109 16.8943705,13.6779456 18.1583985,14.0800781 C19.9784273,14.6590944 21.3849749,16.3018455 22.3780412,19.0083314 L22.3780249,19.0083374 C22.4863904,19.3036749 22.7675498,19.5 23.0821406,19.5 L23.3000001,19.5 C23.3000001,19.0068359 23.2951173,18.2255859 23.2951173,17.7910156 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </span>
        );
      case 3:
        return (
          <span className="svg-icon svg-icon-success svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path
                  d="M9.26193932,16.6476484 C8.90425297,17.0684559 8.27315905,17.1196257 7.85235158,16.7619393 C7.43154411,16.404253 7.38037434,15.773159 7.73806068,15.3523516 L16.2380607,5.35235158 C16.6013618,4.92493855 17.2451015,4.87991302 17.6643638,5.25259068 L22.1643638,9.25259068 C22.5771466,9.6195087 22.6143273,10.2515811 22.2474093,10.6643638 C21.8804913,11.0771466 21.2484189,11.1143273 20.8356362,10.7474093 L17.0997854,7.42665306 L9.26193932,16.6476484 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                  transform="translate(14.999995, 11.000002) rotate(-180.000000) translate(-14.999995, -11.000002) "
                />
                <path
                  d="M4.26193932,17.6476484 C3.90425297,18.0684559 3.27315905,18.1196257 2.85235158,17.7619393 C2.43154411,17.404253 2.38037434,16.773159 2.73806068,16.3523516 L11.2380607,6.35235158 C11.6013618,5.92493855 12.2451015,5.87991302 12.6643638,6.25259068 L17.1643638,10.2525907 C17.5771466,10.6195087 17.6143273,11.2515811 17.2474093,11.6643638 C16.8804913,12.0771466 16.2484189,12.1143273 15.8356362,11.7474093 L12.0997854,8.42665306 L4.26193932,17.6476484 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  transform="translate(9.999995, 12.000002) rotate(-180.000000) translate(-9.999995, -12.000002) "
                />
              </g>
            </svg>
          </span>
        );
      case 4:
        return (
          <span className="svg-icon svg-icon-secondary svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path
                  d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                />
                <path
                  d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </span>
        );
      case 5:
        return (
          <span className="svg-icon svg-icon-success svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path
                  d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                />
                <path
                  d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </span>
        );
      case 6:
        return (
          <span className="svg-icon svg-icon-primary svg-icon-2x">
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24" />
                <path
                  d="M8,7 C7.44771525,7 7,6.55228475 7,6 C7,5.44771525 7.44771525,5 8,5 L16,5 C18.209139,5 20,6.790861 20,9 C20,11.209139 18.209139,13 16,13 L8,13 C6.8954305,13 6,13.8954305 6,15 C6,16.1045695 6.8954305,17 8,17 L17,17 C17.5522847,17 18,17.4477153 18,18 C18,18.5522847 17.5522847,19 17,19 L8,19 C5.790861,19 4,17.209139 4,15 C4,12.790861 5.790861,11 8,11 L16,11 C17.1045695,11 18,10.1045695 18,9 C18,7.8954305 17.1045695,7 16,7 L8,7 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  opacity="0.3"
                />
                <path
                  d="M9.79289322,3.79289322 C10.1834175,3.40236893 10.8165825,3.40236893 11.2071068,3.79289322 C11.5976311,4.18341751 11.5976311,4.81658249 11.2071068,5.20710678 L8.20710678,8.20710678 C7.81658249,8.59763107 7.18341751,8.59763107 6.79289322,8.20710678 L3.79289322,5.20710678 C3.40236893,4.81658249 3.40236893,4.18341751 3.79289322,3.79289322 C4.18341751,3.40236893 4.81658249,3.40236893 5.20710678,3.79289322 L7.5,6.08578644 L9.79289322,3.79289322 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  transform="translate(7.500000, 6.000000) rotate(-270.000000) translate(-7.500000, -6.000000) "
                />
                <path
                  d="M18.7928932,15.7928932 C19.1834175,15.4023689 19.8165825,15.4023689 20.2071068,15.7928932 C20.5976311,16.1834175 20.5976311,16.8165825 20.2071068,17.2071068 L17.2071068,20.2071068 C16.8165825,20.5976311 16.1834175,20.5976311 15.7928932,20.2071068 L12.7928932,17.2071068 C12.4023689,16.8165825 12.4023689,16.1834175 12.7928932,15.7928932 C13.1834175,15.4023689 13.8165825,15.4023689 14.2071068,15.7928932 L16.5,18.0857864 L18.7928932,15.7928932 Z"
                  fill="#000000"
                  fill-rule="nonzero"
                  transform="translate(16.500000, 18.000000) scale(1, -1) rotate(270.000000) translate(-16.500000, -18.000000) "
                />
              </g>
            </svg>
          </span>
        );
      default:
        return;
    }
  };

  //sub form HTML form submission
  const submitFormHTML = e => {
    e.preventDefault();
    const requestValues = prepareRequestValues(e);
    const data = filterUniqueObjects(requestValues['data']);
    submit(data);
  };

  //sub form Dynamic (Form Builder) form submission
  const formbuilderSubmitHandler = data => {
    submit(data);
  };

  const prepareRequestValues = event => {
    let requestValues = {
      data: [],
      files: {}
    };
    let form = event.target;
    for (let i = 0; i < form.length; i++) {
      const element = form.elements[i];
      const name = element.name;
      const value = element.value;
      const type = element.type;
      const label = element.dataset.label;
      let data = {
        name,
        label
      };
      switch (type) {
        case 'file':
          const file = {};
          file[name] = {
            name,
            label,
            files: element.files
          };
          requestValues.files = {
            ...requestValues.files,
            ...file
          };
          data.value = '';
          break;
        case 'checkbox':
          data.value = element.checked ? element.checked : false;
          break;
        case 'radio':
          const els = document.getElementsByName(name);
          els.forEach(e => {
            if (e.checked) {
              data.value = e.value;
            }
          });
          break;
        default:
          data.value = value ? value : '';
      }
      // Prevents adding submit fields into request values.
      if (type !== 'submit') {
        requestValues['data'].push(data);
      }
    }
    return requestValues;
  };

  const filterUniqueObjects = haystack => {
    let names = [];
    return haystack.filter(item => {
      if (names.includes(item.name)) {
        return false;
      }
      names.push(item.name);
      return true;
    });
  };

  const submit = data => {
    let requestData;
    requestData = {
      requestId: id,
      subFormId: subformId
    };
    const formData = new FormData();
    for (const property in requestData) {
      formData.append(property, requestData[property]);
    }
    formData.append('requestValues', JSON.stringify(data));
    newSubformRequest(formData, (err, response) => {
      if (err) {
        if (err.response?.status && err.response.status === 412) {
          setValidationErrors(err.response.data.data);
        }
        toast.error(
          err.response?.data?.message ? err.response.data.message : 'Failed to submit request. Please try again later.'
        );
      } else {
        const formData = new FormData();
        formData.append('actionId', 7);
        submitRequestAction(id, formData, (err, data) => {
          if (!err) {
            toast.success(response.message);
            window.location.reload();
          }
        });
      }
    });
  };

  const getGroups = () => {
    server
      .get('/groups')
      .then(res => {
        setAllGroups(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getBranchess = () => {
    getBranchLists((err, data) => {
      if (!err) {
        setBranchLists(data.data);
      }
    });
  };

  useEffect(() => {
    getData();
    getGroups();
    getBranchess();
  }, [id]);

  useEffect(() => {}, [previewData, finalEditedTemplate]);

  const handleActionChange = (event, data, action) => {
    setSelectedAction(data?.name);
    if (action !== 'clear') {
      if (data.name == 'Return') {
        getReturnGroups({ requestId: id, userId: userInfo.id }, (err, data) => {
          if (!err) {
            setReturnUsers(data);
          } else {
            setVisible(false);
          }
        });
        setRequestData({ ...requestData, actionId: data.id });
      } else if (data.name == 'Refer' || data.name == 'Forward') {
        getReferGroups({ requestId: id }, (err, data) => {
          if (!err) {
            setReferGroups(data);
          } else {
            setVisible(false);
          }
        });
        let newData = { ...requestData };
        delete newData.returnUserId;
        setRequestData({ ...newData, actionId: data.id });
      } else {
        let newData = { ...requestData };
        delete newData.returnUserId;
        setRequestData({ ...newData, actionId: data.id });
      }
    } else {
      let newData = { ...requestData };
      delete newData.actionId;
      delete newData.returnUserId;
      setRequestData(newData);
    }
  };

  const handleReturnUserChange = (event, data, action) => {
    if (action === 'clear') {
      let newData = { ...requestData };
      delete newData.returnGroupId;
      setRequestData(newData);
    } else {
      setRequestData({ ...requestData, returnGroupId: data.id });
    }
  };

  const handleReferGroupChange = (event, data, action) => {
    if (action === 'clear') {
      let newData = { ...requestData };
      delete newData.referGroupId;
      setRequestData(newData);
    } else {
      setRequestData({ ...requestData, referGroupId: data.id });
    }
  };

  const handleExistingGroupChange = (e, data, action) => {
    if (action === 'clear') {
      let newData = { ...requestData };
      delete newData.existingGroup;
      setRequestData(newData);
    } else {
      setRequestData({ ...requestData, existingGroup: data.groupId, actionId: 6 });
    }
  };

  const handleNewGroupChange = (e, data, action) => {
    if (action === 'clear') {
      let newData = { ...requestData };
      delete newData.newGroup;
      setRequestData(newData);
    } else {
      setRequestData({ ...requestData, newGroup: data.id, actionId: 6 });
    }
  };

  const handleSubmit = async () => {
    setVisible(true);
    if (emptyValidation()) {
      const formData = new FormData();
      formData.append('actionId', requestData.actionId);
      formData.append('comment', requestData.comment ? requestData.comment : '<p></p>');
      formData.append('returnGroupId', requestData.returnGroupId);
      formData.append('referGroupId', requestData.referGroupId);
      if (requestData.actionId == 8 && (!requestData.comment || requestData.comment == '<p>\n')) {
        toast.info('Please comment the reason to close');
        setVisible(false);
        return;
      }
      if (requestData.actionId == 6) {
        if (!requestData.existingGroup || !requestData.newGroup) {
          toast.info('Please select group to replace!');
          return false;
        }
        formData.append('existingGroup', requestData.existingGroup);
        if (requestData.newGroup == '0') {
          formData.append('newGroup', requestData.existingGroup);
        } else {
          formData.append('newGroup', requestData.newGroup);
        }
      }
      if (requestData.returnGroupId && requestData.returnGroupId == 0 && requestData.returnGroupId !== 'undefined') {
        formData.append('isInitiator', 'true');
      }
      workflowFiles.map(file => {
        formData.append('files', file);
      });
      await  submitRequestAction(Number(id), formData, (err, data) => {
        if (!err) {
          setVisible(false);
          setSuccess(data.status);
          toast.success(data.message ?? 'Action performed on request successfully.');
          if(multipickIdArray.includes(Number(id))){
            dispatch(removeRequestMultipick(Number(id)));
            const remainingRequestIdMultipick = multipickIdArray.filter(itemId => itemId !== Number(id));
            if(remainingRequestIdMultipick?.length>0){
              setDbAllSubformValue([])
              setDisplaySubform([])            
              props.history.push(`/requests/view/${remainingRequestIdMultipick[0]}?i=${A.getHash(remainingRequestIdMultipick[0])}&s=${tabStatus}&b=${branchId}`)
              setTabName('request')
            }else{
              if (senderType == 'user') {
                props.history.push({
                  pathname: '/internal-requests',
                  search: '?type=internal',
                  state: { tab: tabStatus }
                });
              } else {
                props.history.push({
                  pathname: '/requests',
                  state: { tab: tabStatus }
                });
              }
            }
            }else{
              if (senderType == 'user') {
                props.history.push({
                  pathname: '/internal-requests',
                  search: '?type=internal',
                  state: { tab: tabStatus }
                });
              } else {
                props.history.push({
                  pathname: '/requests',
                  state: { tab: tabStatus }
                });
              }
            }
         
        } else {
          setVisible(false);
          toast.error(err.response.data.message ?? 'Failed to perform action on request.');
        }
      });
    }
  };

  const handleSubmitComment = () => {
    const formData = new FormData();
    formData.append('actionId', 11);
    formData.append('comment', requestData.comment ? requestData.comment : '<p></p>');

    workflowFiles.map(file => {
      formData.append('files', file);
    });
    submitRequestAction(Number(id), formData, (err, data) => {
      if (!err) {
        setSuccess(data.status);
        toast.success(data.message ?? 'Action performed on request successfully.');
        window.location.reload();
      } else {
        toast.error(err.response.data.message ?? 'Failed to perform action on request.');
      }
    });
  };

  let filteredGroup = levels.filter(level => !level.status == 0);
  let groupId = levels.map(level => level.groupId);
  let allGroup = allGroups.filter(item => !groupId.includes(item.id));
  allGroup.unshift({ name: 'Same Group', id: '0' });

  const emptyValidation = () => {
    if (!requestData?.actionId || requestData?.actionId == '') {
      setVisible(false);
      toast.info('Please select an Action to proceed!');
      return false;
    }

    return true;
  };

  // const sendValidationRequest = (name, value)

  /**
   * Returns an alert for specific fields.
   *
   * @param row
   * @returns {*}
   */
  const getAlert = row => {
    switch (row.name) {
      case 'hs_codedddd':
        let request = new XMLHttpRequest();
        request.open('GET', `${validationURL}?field=${row.name}&value=${getValue(row).value}`, false); // `false` makes the request synchronous
        request.send(null);
        if (request.status === 200) {
          const response = request.responseText ? JSON.parse(request.responseText) : '';
          if (!response.status) {
            return response.message;
          }
          if (!response.valid) {
            return response.message;
          }
          return null;
        }
        return 'Failed to test value with the validation server.';
      default:
        return null;
    }
  };

  /**
   * Get title and value from specific field of main form.
   *
   * @param rowItem
   * @returns {{title: string, value: string}}
   */
  const getValue = rowItem => {
    return getFormTitleAndValue(form.type, formData, rowItem);
  };

  /**
   * Get title and value from specific field of sub form.
   *
   * @param rowItem
   * @returns {{title: string, value: string}}
   */
  const getSubValue = rowItem => {
    return getFormTitleAndValue(dbSubform.type, dbSubformData, rowItem);
  };

  /**
   * Extracts title and value from a specific field.
   *
   * @param type
   * @param formData
   * @param rowItem
   * @returns {{title: string, value: string}}
   */
  const getFormTitleAndValue = (type, formData, rowItem) => {
    let value;
    let title;
    if (type === 'dynamic') {
      const formValue = JSON.parse(rowItem.value);
      const fieldObject = _.find(formData, { field_name: rowItem.name });
      if (Array.isArray(formValue)) {
        let values = [];
        formValue.map(item => {
          // const radioValue = _.find(fieldObject.options || [], { key: item });
          // values.push(radioValue.text);
          values.push(item);
          return true;
        });
        values = values.join(', ');
        title = fieldObject.label;
        value = values;
      } else {
        value = formValue;
        title = fieldObject?.label;
      }
    } else {
      if (rowItem.label) {
        title = rowItem.label;
      } else {
        let name = rowItem.name;
        let result = name.replace(/[A-Z]/g, match => {
          return ` ${match}`;
        });
        title = result.charAt(0).toUpperCase() + result.slice(1);
      }
      if (rowItem.value && rowItem.value.slice(-1) === '"') {
        value = rowItem.value.slice(1, -1);
      } else {
        value = rowItem.value;
      }
    }
    if (value) {
      value = value.replaceAll('\\n', ' ');
      value = value.replaceAll('false', 'No');
      value = value.replaceAll('true', 'Yes');
    }
    return { title, value };
  };

  const onEditorStateChange = editorValue => {
    setEditorValue(editorValue);
    const editorHTML = draftToHtml(convertToRaw(editorValue.getCurrentContent()));
    // var str = editorHTML.replace(/<p>(.*)<\/p>/g, '');
    const str = editorHTML.replace('</p>', '');
    setRequestData({ ...requestData, comment: str });
  };

  const handleToggleTab = tab => {
    setTabName(tab);
  };

  /**
   * Redirects a user to new tab for downloading the contents of the request template.
   *
   * @param {*} requestId
   * @param {*} templateId
   */
  const handleRequestTemplatePreview = async (requestId, templateId) => {
    // let downloadUrl =
    //   server_url +
    //   '/download-request/:requestId/:templateId'.replace(':requestId', requestId).replace(':templateId', templateId);
    let fileRequest = await createAndDownloadPdf(requestId, templateId);
    let data = fileRequest.data.replace(/\n/g, '<br/>');
    setPreviewData(data);

    setSelectedTemplate(templateId);
    togglePreview();
  };

  const toggleTemplateDownload = value => {
    if (value === 'edit') {
      setEditTemplate(true);
      setFinalEditedTemplate(previewData);
    } else {
      setEditTemplate(false);
      setFinalEditedTemplate();
    }
  };
  const handleFinalDownloadEdit = async () => {
    await downloadEdited(finalEditedTemplate);
  };
  function handleTestInputChange(event) {
    setFinalEditedTemplate(event.target.innerHTML);
  }
  const handleRequestTemplateDownload = async (requestId, templateId) => {
    let downloadUrl =
      server_url +
      '/download-request/:requestId/:templateId?action=download'
        .replace(':requestId', requestId)
        .replace(':templateId', templateId);
    window.open(downloadUrl, '_blank');
  };

  const Pick = () => {
    setVisible(true);
    const formData = new FormData();
    formData.append('actionId', 4);
    submitRequestAction(id, formData, (err, data) => {
      if (!err) {
        setVisible(false);
        toast.success(data.message ?? 'Pick performed on request successfully');
        props.history.push('/requests/view/' + id);
        window.location.reload();
      } else {
        setVisible(false);
        toast.error(err.response.data.message ?? 'Failed to perform action on request.');
      }
    });
  };

  const getVAl = x => {
    const value = requestsList?.filter(y => y.label == x);
    return value[0]?.value;
  };
  const checkLC = () => requestsList?.find(y => y.label == 'Nature of LC');
  const checkBG = () => {
    if (form.name == 'BG Form Centralized' || form.name == 'BG Form Decentralized') {
      return true;
    } else {
      return false;
    }
  };
  const findBranchLabel = branch => {
    if (branch) {
      const labelBranch = branchLists.find(data => data.sol == branch);

      return `${labelBranch?.name}(${labelBranch?.sol})`;
    }

    return '';
  };
  return (
    <>
      {userInfo.permissions.includes('view-preview') ? (
        <Modal size="xl" isOpen={formModel} toggle={toggleFormPreview}>
          <ModalHeader toggle={toggleFormPreview} close={closePreviewBtn}>
            {form?.name}
            {form && form.name && !form.name.includes('BIBINI') && userInfo.permissions.includes('view-preview') ? (
              <>
                <p>Customer Name:{customerDetails?.accountName}</p>
                <ReactToPrint
                  bodyClass="my-printed-component"
                  trigger={() => <span className="btn btn-secondary btn-sm mr-1">Print this out!</span>}
                  content={() => componentRefs.current}
                  // onBeforeGetContent={handlePreLoad}
                />
              </>
            ) : null}
          </ModalHeader>
          <ModalBody>
            <div ref={componentRefs}>
              <small className="d-block d-md-inline-block ml-4">
                <b>Branch:</b> {findBranchLabel(branchId)}
              </small>
              <>
                <small className="d-block d-md-inline-block pl-5">
                  {' '}
                  <b> Key :</b> {reqId}
                </small>
              </>
              {formForPreview?.viewScript?.length > 5 ? (
                <FormPreview getRequest={requestsList} getformData={formForPreview} printform={true} formPreview={true} />
              ) : (
                <FormPreview getRequest={requestsList} getformData={formForPreview} printform={true} formPreview={false} />
              )}
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <></>
      )}
      <Modal isOpen={modalTimeLine} toggle={toggleTimeLine} className={className}>
        <ModalHeader toggle={toggleTimeLine} close={closeBtn}>
          Bank Employee Details
        </ModalHeader>
        <ModalBody>
          <Table hover bordered>
            <thead>
              <tr>
                <td className="bg-light-primary text-primary" style={{ width: '400px' }}>
                  User Information
                </td>
                <td className="bg-light-primary text-primary"></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="50%">Empolyee Id</td>
                <td width="50%">{userDetails.employeeCD}</td>
              </tr>
              <tr>
                <td width="50%">Branch</td>
                <td width="50%">{userDetails.branch}</td>
              </tr>
              <tr>
                <td width="50%">Department</td>
                <td width="50%">{userDetails.department}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
      {modalPreview && previewData ? (
        <Modal size="xl" isOpen={modalPreview} toggle={togglePreview}>
          <ModalHeader>
            {!editTemplate ? (
              <>
                <button
                  className="btn-custom bg-secondary ml-5"
                  onClick={() => handleRequestTemplateDownload(id, selectedTemplate)}
                >
                  Download
                </button>
              </>
            ) : null}
            {userInfo.permissions.includes('edit-request-template') && editTemplate ? (
              <>
                <button className="btn-custom bg-secondary ml-5" onClick={() => handleFinalDownloadEdit()}>
                  Download
                </button>
              </>
            ) : null}
            {checkBG() && canEditTemplate ? (
              editTemplate ? (
                <>
                  <button
                    className="bg-danger fa fa-times ml-5 p-1"
                    onClick={() => toggleTemplateDownload('cancel')}
                  ></button>
                </>
              ) : (
                <button className="btn btn-secondary fa fa-edit ml-5 " onClick={() => toggleTemplateDownload('edit')}>
                  Edit
                </button>
              )
            ) : null}
          </ModalHeader>
          <ModalBody>
            {editTemplate ? (
              <MyEditor setContentEditor={editorContent} fillEditor={previewData} />
            ) : (
              <div
                className="print-this-out"
                ref={modalRefs}
                dangerouslySetInnerHTML={{ __html: previewData }}
                style={printStyle}
              />
            )}
            {/* <style media="print">
              {`
            @page{
              margin-bottom:100px;
              margin-top:150px;
              orientation: portrait;
            }
            @media print{
              size: A4;
                margin-top:2.54cm;
                text-align: justify;
                orientation: portrait;
                scale: 100%;
                
              body {
                text-align: justify;

               
              }
           
            }
            `}
            </style> */}
          </ModalBody>
        </Modal>
      ) : (
        <Modal isOpen={modalPreview} toggle={togglePreview}>
          <ModalBody> Sorry no preview available!</ModalBody>
        </Modal>
      )}
      {/* Modal for sub form */}
      {form && checkSubFormVisibility(form.name) ? (
        <Modal size="xl" isOpen={modalShow} toggle={toggleSubModal}>
          <ModalHeader toggle={toggleSubModal} close={closeSubModal}>
            Sub Form...
          </ModalHeader>
          <ModalBody>
            <div className="container content-section">
              <div className="inner-content-border h-100">
                <div className="vertical-tab-body">
                  <div className="tab-content">
                    <div className="tab-cnt-single">
                      <div className="inner-item-box">
                        <div className="row">
                          <div className="col-12">
                            {!isMounted ? (
                              <h2> No Sub Form Associated</h2>
                            ) : (
                              <div className="react-form-builder-form">
                                {/* Checking if the user is available to perform action the request */}
                                {canEdit ? (
                                  <>
                                    {getSubForm.type === 'html' ? (
                                      <form onSubmit={submitFormHTML} encType="multipart/form-data">
                                        <HTMLFormRender
                                          requestValues={
                                            !isEmpty(dbSubform) && displaySubform.length > 0 ? displaySubform : []
                                          }
                                          formData={subFormData}
                                          css={css}
                                          javascript={javascript}
                                        />
                                        <div className="btn-toolbar">
                                          <input
                                            type="submit"
                                            name="Submit"
                                            className="btn btn-custom"
                                            onClick={e => {
                                              setSubmitType(e.target.value);
                                            }}
                                            value={
                                              !isEmpty(dbSubform) && displaySubform.length > 0
                                                ? displaySubform.length > 0
                                                  ? 'Update'
                                                  : 'Submit'
                                                : 'Submit'
                                            }
                                          />
                                        </div>
                                      </form>
                                    ) : (
                                      <div>
                                        <FormBuilder.ReactFormGenerator
                                          answer_data={
                                            !isEmpty(dbSubform) && displaySubform.length > 0
                                              ? displaySubform.map(reqVal => ({
                                                  id: reqVal.id,
                                                  name: reqVal.name,
                                                  value: JSON.parse(reqVal.value)
                                                }))
                                              : null
                                          }
                                          action_name={
                                            !isEmpty(dbSubform) && displaySubform.length > 0 ? 'Update' : 'Submit'
                                          }
                                          onSubmit={formbuilderSubmitHandler}
                                          data={subFormData}
                                          accessToken={userToken}
                                          autoPopulateUrl={populateURL}
                                        />
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div className="body-overlay">
                                    {getSubForm.type === 'html' ? (
                                      <HTMLFormRender
                                        requestValues={
                                          !isEmpty(dbSubform) && displaySubform.length > 0 ? displaySubform : []
                                        }
                                        formData={subFormData}
                                        css={css}
                                        javascript={javascript}
                                      />
                                    ) : (
                                      <FormBuilder.ReactFormGenerator
                                        answer_data={
                                          !isEmpty(dbSubform) && displaySubform.length > 0
                                            ? displaySubform.map(reqVal => ({
                                                id: reqVal.id,
                                                name: reqVal.name,
                                                value: JSON.parse(reqVal.value)
                                              }))
                                            : null
                                        }
                                        hide_actions
                                        read_only
                                        data={subFormData}
                                        accessToken={userToken}
                                        autoPopulateUrl={populateURL}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        ''
      )}
      <Stepper style={{ width: '100%' }} activeStep={activeStep} alternativeLabel>
        {levels.map((item, index) => {
          return (
            <Step key={index}>
              <StepLabel>{item.name}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <hr />
      <Form>
        <Tabs activeKey={tabName} onSelect={handleToggleTab}>
          <Tab eventKey="request" title="Request">
            <CustomLoadingOverlay isLoading={visible}>
              <Card className="sticky-header-card">
                <CardHeader title="Request Detail Information">
                  <small className="mt-4">
                    Key : <b>{reqId}</b> Category : <b>{form?.category?.name}</b> Request Type : <b> {form?.name}</b>
                  </small>
                  <CardHeaderToolbar>
                    {canPick && canPick.length > 0 ? (
                      <CustomLoadingOverlay isLoading={visible}>
                        <PickButton handlePick={Pick} />
                      </CustomLoadingOverlay>
                    ) : null}

                    <button onClick={e => toggleFormPreview()} type="button" className="btn btn-secondary btn-sm mr-1">
                      <i className="fa fa-eye"></i> Pre-view
                    </button>
                    {form && form.name && form.name.includes('BIBINI') ? (
                      <Link to={`/bibini-requests`}>
                        <button type="button" className="btn btn-light">
                          <i className="fa fa-arrow-left" />
                          Back
                        </button>
                      </Link>
                    ) : senderType == 'user' ? (
                      <Link to={`/internal-requests?type=internal`}>
                        <button type="button" className="btn btn-light">
                          <i className="fa fa-arrow-left" />
                          Back
                        </button>
                      </Link>
                    ) : (
                      <NavLink to={{ pathname: '/requests', tab: tabStatus }}>
                        <button type="button" className="btn btn-light">
                          <i className="fa fa-arrow-left" />
                          Back
                        </button>
                      </NavLink>
                    )}

                    <NextButton
                      handleNext={() => {
                        setTabName('timeline');
                      }}
                    />
                    {form && form.name && !form.name.includes('BIBINI')
                      ? requestTemplates &&
                        requestTemplates.length > 0 && (
                          <Dropdown className="ml-3">
                            <Dropdown.Toggle variant="secondary" id="dropdown-download">
                              Download
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                              {requestTemplates.map(template => {
                                return (
                                  <Dropdown.Item onClick={() => handleRequestTemplatePreview(id, template.id)}>
                                    {template.name}
                                  </Dropdown.Item>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        )
                      : null}
                    {/* <PrintButton handlePrint={Print} /> */}
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  {form && checkSubFormVisibility(form.name) ? (
                    <span className="ml-4 btn btn-sm btn-secondary" onClick={handleModal}>
                      {' Sub Form '}
                    </span>
                  ) : (
                    ''
                  )}
                  {requestStatus == 4 && triggerRequest ? (
                    <span className="ml-4 btn btn-sm btn-secondary" onClick={handleTrigger}>
                      {' Confirm Registration '}
                    </span>
                  ) : null}

                  {checkLC() && userInfo?.permissions.includes('swift-user') && requestStatus == 4 && !swiftClosed ? (
                    <span className="ml-5">
                      <input
                        type="checkbox"
                        checked={swiftUpload || false}
                        name="swiftUpload"
                        onChange={handleSwiftCheckbox}
                      />
                      {' Uploaded to Swift '}
                    </span>
                  ) : null}

                  {checkLC() && userInfo?.permissions.includes('local-lc') && requestStatus != 6 ? (
                    <span className="ml-5">
                      <input type="checkbox" checked={localLC || false} name="localLC" onChange={handleLocalLcCheckbox} />
                      {' Local LC '}
                    </span>
                  ) : null}

                  {checkLC() && userInfo?.permissions.includes('swift-user') && requestStatus == 4 && !swiftUpload ? (
                    <span className="ml-5">
                      <input type="checkbox" checked={swiftClosed || false} name="swiftClosed" onChange={handleSwiftClose} />
                      {' Not transmitted & Closed '}
                    </span>
                  ) : null}

                  {userInfo?.permissions.includes('signature-verifier') && requestStatus != 6 ? (
                    <span className="ml-5">
                      <input
                        type="checkbox"
                        checked={signatureVerification || false}
                        name="signatureVerification"
                        onChange={handleSignatureCheckbox}
                      />
                      {' Verify Signature '}
                    </span>
                  ) : null}
                  {userInfo?.permissions.includes('send-mail') && checkLC() ? (
                    <span className="ml-5">
                      <button className="btn btn-sm btn-secondary" onClick={handleMailSend} name="sendMail">
                        Send Mail to Swift
                      </button>
                    </span>
                  ) : null}

                  <Row className="mt-5">
                    <Col className="col-md-12">
                      {senderType == 'customer' ? (
                        <Table hover bordered>
                          <thead>
                            <tr>
                              <td className="bg-light-primary text-primary" style={{ width: '400px' }}>
                                Customer Information
                              </td>
                              <td className="bg-light-primary text-primary"></td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Full Name</td>
                              <td>{customerDetails?.accountName}</td>
                            </tr>
                            <tr>
                              <td>Account Number</td>
                              <td>{customerDetails?.accountNumber}</td>
                            </tr>
                            <tr>
                              <td>Mobile Number</td>
                              <td>{customerDetails?.mobileNumber}</td>
                            </tr>
                          </tbody>
                        </Table>
                      ) : (
                        <br></br>
                      )}
                    </Col>
                    <Col className="col-md-12">
                      {hasFiles ? (
                        <>
                          <h6>Uploaded Files</h6>
                          <Row className="mt-5 mb-5">
                            {requestsList.map((row, index) => {
                              if (row.type === 'file') {
                                const fileInfo = JSON.parse(row?.value ? row?.value : '');
                                return (
                                  <File
                                    fileKey={`request-file-${index}`}
                                    toolTipId={`request-file-tooltip-${index}`}
                                    fileName={row.label}
                                    fileFullName={row.label}
                                    fileType={fileInfo.mimetype}
                                    fileDest={'request'}
                                    fileSize={fileInfo.size}
                                    fileUrlId={row.id}
                                    fileUrlName={fileInfo.filename}
                                    fileRedirectUrl={fileInfo.url ? fileInfo.url : null}
                                  />
                                );
                              }
                            })}
                          </Row>
                        </>
                      ) : null}
                      <Table hover bordered>
                        <thead>
                          <tr>
                            <td className="bg-light-primary text-primary" style={{ width: '400px' }}>
                              Field
                            </td>
                            <td className="bg-light-primary text-primary">Value</td>
                          </tr>
                        </thead>
                        <tbody>
                          {requestsList.map(row => {
                            const alert = getAlert(row);
                            return row.type === 'text' ? (
                              <tr>
                                <td>{getValue(row).title}</td>
                                <td>
                                  <span>{getValue(row).value}</span>
                                  {alert ? (
                                    <OverlayTrigger
                                      placement="left"
                                      overlay={<Tooltip id={row.name + '_tooltip'}>{alert}</Tooltip>}
                                    >
                                      <span className="float-right">
                                        <i className="fa fa-exclamation-triangle text-danger" />
                                      </span>
                                    </OverlayTrigger>
                                  ) : null}
                                </td>
                              </tr>
                            ) : null;
                          })}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
          {/* request */}
          <Tab eventKey="timeline" title="Timeline & Actions">
            <Card className="sticky-header-card">
              <CardHeader title="Timeline Information">
                <CardHeaderToolbar>
                  <ReactToPrint
                    bodyClass="p-5"
                    trigger={() => <span className="btn btn-secondary btn-sm mr-1">Print this out!</span>}
                    content={() => componentRef.current}
                    // onBeforeGetContent={handlePreLoad}
                  />
                  <PreviousButton
                    handlePrevious={() => {
                      setTabName('request');
                    }}
                  />
                  {canEdit ? (
                    <CustomLoadingOverlay isLoading={visible}>
                      <SaveButton handleSave={handleSubmit} value="Save" />
                    </CustomLoadingOverlay>
                  ) : null}
                </CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <div className="timeline timeline-3" ref={componentRef}>
                  <div className="timeline-items">
                    {checkLC() && (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                          <h7>Flow ID: {reqId && reqId} </h7>
                          <h7>Beneficiary Name: {getVAl('Beneficiary Name').slice(1, -1)} </h7>
                          <h7>Applicant Name: {getVAl('Applicant Name').slice(1, -1)}</h7>
                          <h7>Currency: {getVAl('Currency').slice(1, -1)} </h7>
                          <h7>Amount: {getVAl('Currency Amount').slice(1, -1)} </h7>
                        </div>
                        <hr />
                      </>
                    )}
                    {checkBG() && (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                          <h7>Flow ID: {reqId && reqId} </h7>
                          <h7>Beneficiary Name: {getVAl('Beneficiary Name')?.slice(1, -1)} </h7>
                          <h7>Currency: {getVAl('Currency')?.slice(1, -1)} </h7>
                          <h7>Amount: {getVAl('Currency Amount')?.slice(1, -1)} </h7>
                        </div>
                        <hr />
                      </>
                    )}
                    {/* TODO: Add no time line text or design */}
                    {requestTimeline.map((data, index) => {
                      return (
                        <div className="timeline-item">
                          <div className="timeline-media">{setIcons(data.action)}</div>
                          {data.groupId == null && data.currendUserId == null ? (
                            <div className="timeline-content customer-comment">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="mr-2 text-dark-75  font-weight-bold">
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip"></Tooltip>}>
                                    <div dangerouslySetInnerHTML={{ __html: purify.sanitize(data.title) }} />
                                  </OverlayTrigger>
                                  <span className="text-muted ml-2">{data.timestamp}</span>
                                </div>
                              </div>
                              <p className="ml-2 p-0">
                                <div dangerouslySetInnerHTML={{ __html: purify.sanitize(data.comment) }} />
                                <p className="row">
                                  {data.workflowFiles && data.workflowFiles.length > 0
                                    ? data.workflowFiles.map((row, index) => (
                                        <>
                                          <File1
                                            fileKey={`request-file-${index}`}
                                            toolTipId={`request-file-tooltip-${index}`}
                                            fileName={row.originalName}
                                            fileFullName={row.originalName}
                                            fileType={row.mimeType}
                                            fileDest={'workflow'}
                                            fileSize={row.size}
                                            fileUrlId={row.id}
                                            fileUrlName={row.filename}
                                            fileRedirectUrl={row.url ? data.workflowFiles.url : null}
                                          />
                                        </>
                                      ))
                                    : null}
                                </p>
                              </p>
                            </div>
                          ) : (
                            <div className="timeline-content">
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="mr-2 text-dark-75  font-weight-bold">
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      <Tooltip id="quick-panel-tooltip">
                                        <div className="d-flex" style={{ flexWrap: 'wrap' }}>
                                          <div>
                                            <span>Empolyee Id : </span>
                                            <b>{data.employeeCD}</b>
                                          </div>
                                          <div>
                                            <span>Branch : </span>
                                            <b>{data.branch}</b>
                                          </div>
                                          <div>
                                            <span>Department : </span>
                                            <b>{data.department}</b>
                                          </div>
                                        </div>
                                      </Tooltip>
                                    }
                                  >
                                    <button className="btn-custom" onClick={e => toggleTimeLine(data)}>
                                      {data.title}
                                    </button>
                                  </OverlayTrigger>
                                  <span className="text-muted ml-2">{data.timestamp}</span>
                                  {data.action === 7 ? (
                                    <span className="ml-5" onClick={e => toggleSubModal(data)}>
                                      {' Sub Form '}
                                    </span>
                                  ) : (
                                    <> </>
                                  )}
                                  {data.canRollback == true ? (
                                    <RollBackButton handleRoleBack={() => handleRollBackModel(id)} />
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <p className="ml-2 p-0">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: purify.sanitize(
                                      data.comment && data.comment.trim != '' ? data.comment.replace(/&lt;/g, '<') : ''
                                    )
                                  }}
                                />
                                <p className="row">
                                  {data.workflowFiles && data.workflowFiles.length > 0
                                    ? data.workflowFiles.map((row, index) => (
                                        <>
                                          <File1
                                            fileKey={`request-file-${index}`}
                                            toolTipId={`request-file-tooltip-${index}`}
                                            fileName={row.originalName}
                                            fileFullName={row.originalName}
                                            fileType={row.mimeType}
                                            fileDest={'workflow'}
                                            fileSize={row.size}
                                            fileUrlId={row.id}
                                            fileUrlName={row.filename}
                                            fileRedirectUrl={row.url ? data.workflowFiles.url : null}
                                          />
                                        </>
                                      ))
                                    : null}
                                </p>
                              </p>
                            </div>
                          )}

                          {data.files &&
                            data.files.map(item => (
                              <Button variant="contained" color="secondary" className="btn" onClick={toggle}>
                                <img src={DocIcon} alt="" style={{ height: '50px' }} />
                                <span style={{ display: 'block' }}>{item}</span>
                              </Button>
                            ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardBody>
              {userInfo?.permissions.includes('assign-workflow-user') && requestStatus == 2 ? (
                <CardBody>
                  <h5> Assign New Group </h5>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <Form.Group>
                        <Form.Label>Select Group</Form.Label>
                        <Autocomplete
                          id="existingGroup"
                          options={levels ? levels : []}
                          className="form-control pt-2"
                          getOptionLabel={option => option?.name}
                          renderInput={params => <TextField {...params} placeholder="Select existing group" />}
                          onChange={handleExistingGroupChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col sm="3">
                      <Form.Group>
                        <Form.Label>Assign To</Form.Label>
                        <Autocomplete
                          id="newGroup"
                          options={allGroup ? allGroup : []}
                          className="form-control pt-2"
                          getOptionLabel={option => option?.name}
                          renderInput={params => <TextField {...params} placeholder="Select new group" />}
                          onChange={handleNewGroupChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Button className=" mx-7 my-7" onClick={handleSubmit}>
                        Re-Assign
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
              {canEdit ? (
                <CardFooter>
                  <Row>
                    <Col sm="3">
                      <Form.Group>
                        <Form.Label>Action</Form.Label>
                        <Autocomplete
                          id="actionId"
                          options={actions}
                          className="form-control pt-2"
                          getOptionLabel={option => option.name}
                          renderInput={params => <TextField {...params} placeholder="Select an Action" />}
                          onChange={handleActionChange}
                        />
                      </Form.Group>
                    </Col>
                    {selectedAction === 'Return' ? (
                      <Col sm="3">
                        <Form.Group>
                          <Form.Label>Return To</Form.Label>
                          <Autocomplete
                            id="returnUserId"
                            options={returnUsers}
                            className="form-control pt-2"
                            getOptionLabel={option => option.name}
                            renderInput={params => <TextField {...params} placeholder="Select user to return" />}
                            onChange={handleReturnUserChange}
                          />
                        </Form.Group>
                      </Col>
                    ) : selectedAction === 'Refer' ? (
                      <Col sm="3">
                        <Form.Group>
                          <Form.Label>Refer To</Form.Label>
                          <Autocomplete
                            id="referGroupId"
                            options={referGroups}
                            className="form-control pt-2"
                            getOptionLabel={option => option.name}
                            renderInput={params => <TextField {...params} placeholder="Select user to refer" />}
                            onChange={handleReferGroupChange}
                          />
                        </Form.Group>
                      </Col>
                    ) : workFlowType === 'open' && selectedAction === 'Forward' ? (
                      <Col sm="3">
                        <Form.Group>
                          <Form.Label>Forward To</Form.Label>
                          <Autocomplete
                            id="referGroupId"
                            options={referGroups}
                            className="form-control pt-2"
                            getOptionLabel={option => option.name}
                            renderInput={params => <TextField {...params} placeholder="Select user to Forward" />}
                            onChange={handleReferGroupChange}
                          />
                        </Form.Group>
                      </Col>
                    ) : null}
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Comment :</Form.Label>
                        {requestData && requestData.actionId !== 3 && requestData.comment == '<p>\n' ? (
                          <div id="InfoBanner">
                            <span className="reversed reversedRight">
                              <span>&#9888;</span>
                            </span>
                            <span className="reversed reversedLeft">Warning Comment is Require!!</span>
                          </div>
                        ) : null}
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
                    <Col md="12">
                      <Form.Group>
                        <Form.Label>Files</Form.Label>
                        <Dropzone selectFiles={setWorkflowFiles} />
                      </Form.Group>
                    </Col>
                  </Row>
                </CardFooter>
              ) : null}
              {requestStatus == 4 ? (
                <>
                  <Col md="12">
                    <Form.Group>
                      <Form.Label>Comment :</Form.Label>
                      {requestData && requestData.actionId !== 3 && requestData.comment == '<p>\n' ? (
                        <div id="InfoBanner">
                          <span className="reversed reversedRight">
                            <span>&#9888;</span>
                          </span>
                          <span className="reversed reversedLeft">Warning Comment is Require!!</span>
                        </div>
                      ) : null}
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
                  <Col md="12">
                    <Form.Group>
                      <Form.Label>Files</Form.Label>
                      <Dropzone selectFiles={setWorkflowFiles} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button className=" mx-7 my-7" onClick={handleSubmitComment}>
                      Comment
                    </Button>
                  </Col>
                </>
              ) : null}
            </Card>
          </Tab>
        </Tabs>
      </Form>
    </>
  );
};
