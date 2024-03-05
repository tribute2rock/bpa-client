import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { addPrintTemplate } from './api/printTemplate';
import { toast } from 'react-toastify';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { Switch, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AddForm from '../../../Forms/pages/forms/components/TemplateField';
import { SignalCellularNull } from '@material-ui/icons';
import MyEditor from '../../../../components/TemplateEditor/Editor';
import { copyTextToClipboard } from '../../../../../util';
export function PrintTemplateAdd(props) {
  const [tempName, setTempName] = useState();
  const [output, setOutput] = useState({});
  const [templateField, setTemplateField] = useState();
  const [templateFieldHtml, setTemplateFieldHtml] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const outputFormat = [{ output: 'PDF' }, { output: 'TXT' }];
  const tempType = [
    { text: '--none--' },
    { text: 'Bid Bond' },
    { text: 'Performance Bond' },
    { text: 'Custom Guarantee' },
    { text: 'Advance Payment' },
    { text: 'Supply Credit Guarantee' },
    { text: 'Line of Credit Commitment' },
    { text: 'Other Guarantee' }
  ];

  const optionsBG = [
    { label: 'SOL ID', value: 'sol_id' },
    { label: 'Branch Name', value: 'branch_name' },
    { label: 'Beneficiary Name', value: 'beneficiary_name' },
    { label: 'Beneficiary Address', value: 'beneficiary_address' },
    { label: 'Company Name', value: 'company_name' },
    { label: 'Company Address', value: 'company_address' },
    { label: 'Salutation', value: 'salutation' },
    { label: 'Salutation Account', value: 'salutation_account' },
    { label: 'Letterhead Number', value: 'letterhead_number' },
    { label: 'Reference Number', value: 'reference_number' },
    { label: 'Contract Number', value: 'contract_number' },
    { label: 'Contract Number Final', value: 'contract_number_final' },
    { label: 'Currency', value: 'currency' },
    { label: 'In Words', value: 'in_words' },
    { label: 'In Figures', value: 'in_figures' },
    { label: 'Margin Amount', value: 'margin_amount' },
    { label: 'Customer Group', value: 'customer_group' },
    { label: 'Borrowers Address', value: 'borrowers_address' },
    { label: 'Commission Amount', value: 'commission_amount' },
    { label: 'Benificiary Type', value: 'benificiary_type' },
    { label: 'Company Type', value: 'company_type' },
    { label: 'CUSTOMER ID', value: 'customer_id' },
    { label: 'Project Address', value: 'project_address' },
    { label: 'CUSTOMER NAME', value: 'customer_name' },
    { label: 'Bid Submission Date', value: 'bid_submission_date' },
    { label: 'Bid Date', value: 'bid_date' },
    { label: 'Issue Date', value: 'issuedate' },
    { label: 'Final Issue Date', value: 'final_issuedate' },
    { label: 'Validity Date', value: 'validityDate' },
    { label: 'Validity1 Date', value: 'validity1Date' },
    { label: 'Validity2 Date', value: 'validity2Date' },
    { label: 'Final Validity Date', value: 'final_validityDate' },
    { label: 'Claim Validity', value: 'claim_validity' },
    { label: 'Claim Validity1', value: 'claim_validity1' },
    { label: 'Claim Validity2', value: 'claim_validity2' },
    { label: 'Final Claim Validity', value: 'final_claim_validity' },
    { label: 'Total Days', value: 'total_days' },
    { label: 'Purpose', value: 'purpose_guarantee' },
    { label: 'Security Type', value: 'security_type' },
    { label: 'Authorized Signature Name 1', value: 'name1' },
    { label: 'Authorized Signature Designation 1', value: 'designation1' },
    { label: 'Authorized Signature Name 2', value: 'name2' },
    { label: 'Authorized Signature Designation 2', value: 'designation2' },
    { label: 'Industry Type', value: 'industry_type' },
    { label: 'Sub Sector', value: 'sub_sector' }
  ];

  const editorContent = content => {
    setTemplateFieldHtml(JSON.stringify(content));
  };

  const handleChange = e => {
    e.preventDefault();
    setTempName(e.target.value);
  };

  const handleToggle = e => {
    const toggle = e.target.checked;
    setIsAvailable(toggle);
  };

  const dataSet = value => {
    setTemplateField(JSON.stringify(value.html));
  };

  const handleSubmit = e => {
    e.preventDefault();
    let templateData = { ...output, name: tempName, fields: templateField, customerAccess: isAvailable };

    if (output && output.output == 'PDF') {
      templateData = { ...output, name: tempName, fields: templateFieldHtml, customerAccess: isAvailable };
    }
    addPrintTemplate(templateData, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while creating new Template.');
      }
      if (data) {
        props.history.push('/print-template');
        toast.success(data.message ?? 'New Template created successfully.');
      }
    });
  };

  return (
    <Card>
      <CardHeader title="Add New Template">
        <CardHeaderToolbar>
          <BackButton to="/print-template" />
          <SaveButton handleSave={handleSubmit} value="Save" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Template Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Template Name" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Template Type</Form.Label>
                <Autocomplete
                  id="combo-box-demo"
                  name="type"
                  options={tempType}
                  className="form-control pt-2"
                  getOptionLabel={option => option.text}
                  renderInput={params => <TextField {...params} placeholder="Select a Format" />}
                  onChange={(e, data, action) => {
                    if (action === 'clear') {
                      setOutput({ ...output, ['type']: '--none--' });
                    } else {
                      setOutput({ ...output, ['type']: data.text });
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Output format</Form.Label>
                <Autocomplete
                  id="combo-box-demo"
                  name="output"
                  options={outputFormat}
                  defaultValue={outputFormat[1]}
                  className="form-control pt-2"
                  getOptionLabel={option => option.output}
                  renderInput={params => <TextField {...params} placeholder="Select a Format" />}
                  onChange={(e, data, action) => {
                    if (action === 'clear') {
                      setOutput({ ...output, ['output']: 'TXT' });
                    } else {
                      setOutput({ ...output, ['output']: data.output });
                    }
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="d-block">Is accessible by customer</Form.Label>
                <Switch
                  checked={isAvailable}
                  name="customerAccess"
                  onChange={handleToggle}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>BG Value Options</Form.Label>
                <Autocomplete
                  id="combo-box-demo"
                  name="type"
                  options={optionsBG}
                  className="form-control pt-2"
                  getOptionLabel={option => option.label}
                  renderInput={params => <TextField {...params} placeholder="Select a value to copy" />}
                  onChange={(e, data, action) => {
                    console.log(data.value);
                    copyTextToClipboard(`{{subform.2.${data.value}}}`);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          {output && output.output == 'PDF' ? (
            <Row>
              <Col>
                <MyEditor setContentEditor={editorContent} />
                {/* <Editor
                  onChange={editorContent}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Create your templates here.</p>"
                  init={{
                    height: 900,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor ' +
                        'searchreplace visualblocks code fullscreen ' +
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                      'undo redo fontselect | ' +
                      'fontselect fontsizeselect | ' +
                      'bold italic forecolor backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat table ',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                /> */}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <AddForm dataSet={dataSet} />
              </Col>
            </Row>
          )}
        </Form>
      </CardBody>
    </Card>
  );
}
