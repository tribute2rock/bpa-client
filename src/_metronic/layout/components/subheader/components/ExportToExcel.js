import React, { useEffect, useState } from 'react';
import { getExportForms } from '../api';
import { toast } from 'react-toastify';
import { Button, Col, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { Input } from 'reactstrap';

const ExportToExcel = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState([]);
  const [exportData, setExportData] = useState({});
  const [dateError, setDateError] = useState({ error: false, msg: '' });
  const [formError, setFormError] = useState({ error: false, msg: '' });

  const server_url = process.env.REACT_APP_SERVER_URL;

  const [date, setDate] = useState({});

  const handleChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setExportData({ ...exportData, [name]: value });
  };

  const handleEvent = (event, picker) => {
    setDate({ startDate: picker.startDate._d, endDate: picker.endDate._d });
  };

  const handleClose = () => setShow(false);

  const handleShow = id => {
    setShow(true);
  };

  const getFormData = () => {
    getExportForms({}, (err, data) => {
      if (!err) {
        setForm(data);
      } else {
        toast.error(err.message);
      }
    });
  };

  const handleRequestTemplateDownload = exportData => {
    let downloadUrl =
      server_url +
      '/download-request/excel?formId=:formId&status=:status&startDate=:sDate&endDate=:eDate'
        .replace(':formId', exportData.formId)
        .replace(':status', exportData.status)
        .replace(':sDate', exportData.startDate)
        .replace(':eDate', exportData.endDate);
    window.open(downloadUrl, '_blank');
  };

  const handleFilterExportForm = () => {
    setDateError({ error: false });
    setFormError({ error: false });
    const filterData = exportData;
    filterData['startDate'] = date.startDate;
    filterData['endDate'] = date.endDate;
    if (exportData.startDate && exportData.endDate) {
      if (exportData?.formId) {
        handleRequestTemplateDownload(exportData);
      } else {
        setFormError({ error: true, msg: 'Please select form to export.' });
      }
    } else {
      setDateError({ error: true, msg: 'Please select date range.' });
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <>
      <OverlayTrigger placement="left" overlay={<Tooltip id="quick-actions-tooltip">Export to Excel</Tooltip>}>
        <a className="btn btn-light-success " onClick={() => handleShow()}>
          <i className="fa fa-file-excel pr-0" />
        </a>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm="12">
                <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                  <Form.Label>Select a start date</Form.Label>
                  <DateRangePicker onEvent={handleEvent}>
                    <input type="text" className="form-control" placeholder="click here to select the data range" />
                  </DateRangePicker>
                  <Form.Label>{dateError && <span style={{ color: 'red' }}>{dateError.msg}</span>}</Form.Label>
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                  <Form.Label>Form Name</Form.Label>
                  <Input
                    className="rounded"
                    name="formId"
                    type="select"
                    onChange={handleChange}
                    value={exportData.formId || ''}
                  >
                    <option selected disabled value="">
                      SELECT FORM
                    </option>

                    {form &&
                      form.map(data => {
                        return (
                          <option key={data.id} value={data.id}>
                            {data.form}
                          </option>
                        );
                      })}
                  </Input>
                  <Form.Label>{formError && <span style={{ color: 'red' }}>{formError.msg}</span>}</Form.Label>
                </Form.Group>
              </Col>
              <Col sm="12">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Select Status</Form.Label>
                  <Input
                    className="rounded"
                    name="status"
                    type="select"
                    onChange={handleChange}
                    value={exportData.status || ''}
                  >
                    <option selected disabled value="">
                      SELECT STATUS
                    </option>
                    <option value="1">Pending</option>
                    <option value="2">Processing</option>
                    <option value="3">Returned</option>
                    <option value="4">Completed</option>
                  </Input>
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Button onClick={() => handleFilterExportForm()}>Export</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExportToExcel;
