import React, { useState, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Autocomplete } from '@material-ui/lab';
import { Switch, TextField } from '@material-ui/core';
import CustomSelect from '../../../../components/CustomSelect';
import { getSinglePrintTemplate, updatePrintTemplate } from './api/printTemplate';
import A from '../../../../../config/url';
import query from 'querystring';
import { BackButton, SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';
import AddForm from '../../../Forms/pages/forms/components/TemplateField';
import MyEditor from '../../../../components/TemplateEditor/Editor';
import { copyTextToClipboard } from '../../../../../util';

export function PrintTemplateEdit(props) {
  const [printTemplate, setPrintTemplate] = useState({});
  const [tempName, setTempName] = useState();
  const [output, setOutput] = useState();
  const [templateField, setTemplateField] = useState();
  const [templateFieldHtml, setTemplateFieldHtml] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const qs = query.parse(props.location.search.slice(1));
  const id = A.getId(qs.id);
  const outputFormat = [
    { id: 'PDF', name: 'PDF' },
    { id: 'TXT', name: 'TXT' }
  ];
  const tempType = [
    { id: '--none--', name: '--none--' },
    { id: 'Bid Bond', name: 'Bid Bond' },
    { id: 'Performance Bond', name: 'Performance Bond' },
    { id: 'Custom Guarantee', name: 'Custom Guarantee' },
    { id: 'Advance Payment', name: 'Advance Payment' },
    { id: 'Supply Credit Guarantee', name: 'Supply Credit Guarantee' },
    { id: 'Line of Credit Commitment', name: 'Line of Credit Commitment' },
    { id: 'Other Guarantee', name: 'Other Guarantee' }
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

  useEffect(() => {
    getSinglePrintTemplate(id, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching printTemplate.');
      } else {
        setPrintTemplate(data);
        if (data.customerAccess) {
          setIsAvailable(data.customerAccess);
        }
      }
    });
  }, [id]);

  const handleChange = e => {
    e.preventDefault();
    setTempName(e.target.value);
  };
  const handleToggle = e => {
    const toggle = e.target.checked;
    setIsAvailable(toggle);
  };

  const handleOutputChange = e => {
    e.preventDefault();
    setOutput({ ...output, [e.target.name]: e.target.value });
  };

  const dataSet = value => {
    setTemplateField(JSON.stringify(value.html));
  };

  const editorContent = content => {
    setTemplateFieldHtml(JSON.stringify(content));
  };
  /**
   * Removes double quotes and replaces \\n with \n
   *
   * @param template
   * @returns {*}
   */
  const sanitizeTextTemplate = template => {
    let temp = template.slice(1, -1);
    temp = temp.replace(/\\n/gm, '\n');
    temp = temp.replace(/&lt;/g, '<');
    temp = temp.replace(/\\"/g, '"');
    return temp;
  };

  /**
   * Sanitizes the template for displaying on editor.
   *
   * @param template
   * @returns {*|UnpackedLocaleFieldsData}
   */
  const sanitizeTemplate = template => {
    switch (template.output) {
      case 'TXT':
        return sanitizeTextTemplate(template.fields);
      default:
        return sanitizeTextTemplate(template.fields);
    }
  };

  const sanitizeGeneratedTemplate = template => {
    return template.length >= 2 && template[0] === '"' && template[template.length - 1] === '"'
      ? template.slice(1, -1)
      : template;
  };

  const handleSubmit = () => {
    let templateData = {
      ...output,
      id: id,
      name: tempName ? tempName : printTemplate.name,
      // output: output ? output : printTemplate.output,
      fields: templateField && templateField !== 'null' ? templateField : printTemplate.fields,
      customerAccess: isAvailable
    };
    if ((output && output.output == 'PDF') || (!output && printTemplate.output == 'PDF')) {
      templateData = {
        ...output,
        id: id,
        name: tempName ? tempName : printTemplate.name,
        fields: templateFieldHtml && templateFieldHtml !== 'null' ? templateFieldHtml : printTemplate.fields,
        customerAccess: isAvailable
      };
    }
    updatePrintTemplate(templateData, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while updating Template.');
      }
      if (data) {
        props.history.push('/print-template');
        toast.success(data.message ?? 'Template updated successfully.');
      }
    });
  };
  return (
    <Card>
      <CardHeader title="Update Template">
        <CardHeaderToolbar>
          <BackButton to="/print-template" />
          <SaveButton handleSave={handleSubmit} value="Update" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Form>
          <Row>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Template Name</Form.Label>
                <Form.Control
                  value={tempName ? tempName : printTemplate.name}
                  name="name"
                  type="text"
                  placeholder="Template Name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Type</Form.Label>
                <CustomSelect
                  {...props}
                  className="form-control pt-2"
                  name="type"
                  placeholder="Select File Format"
                  value={output ? output.type : printTemplate.type}
                  handleChange={handleOutputChange}
                  options={tempType}
                />
              </Form.Group>
            </Col>
            <Col sm="3">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Output format</Form.Label>
                <CustomSelect
                  {...props}
                  className="form-control pt-2"
                  name="output"
                  placeholder="Select File Format"
                  value={output ? output.output : printTemplate.output}
                  handleChange={handleOutputChange}
                  options={outputFormat}
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
          {(output && output.output == 'PDF') || (!output && printTemplate.output == 'PDF') ? (
            <Row>
              <Col>
                <MyEditor
                  setContentEditor={editorContent}
                  fillEditor={printTemplate.fields ? sanitizeGeneratedTemplate(printTemplate.fields) : null}
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <AddForm dataSet={dataSet} getHtml={printTemplate.fields ? sanitizeTemplate(printTemplate) : null} />
              </Col>
            </Row>
          )}
        </Form>
      </CardBody>
    </Card>
  );
}
