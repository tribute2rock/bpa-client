import React, {useState, useEffect} from 'react';
import { Form, Col, Row, Tabs, Tab, Button, Select, InputGroup } from 'react-bootstrap';
import { Card, CardBody, CardHeader, CardFooter , CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Multiselect } from 'multiselect-react-dropdown';
import { server } from '../../../../../config/server';
import { SaveButton } from '../../../../components/Buttons';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {assignFormsPost} from "./api/assign"
export  function AssignFormAdd(){
    const [availableGroups, setAvailableGroups] = useState([]);
    const [multiSelectGroup, setMultiSelectGroup] = useState([]);
    const [selectedForm, setSelectedForm] = useState("");
    const [selectedValue, setSelectedValue] = useState([]);

    const [formsList, setFormsList] = useState([]);
    // const [formsMultiSelect, setMultipleSelectForms] = useState([]);
    const multiSelectUserRef = React.createRef();
    const history = useHistory();
    const handleSave = () =>{
        const body = {
            users:multiSelectGroup,
            formId:selectedForm
        };
        assignFormsPost(body, (err,data) => {
            if(err){
                toast.error("Error occured while assigning Forms");
            }else{
                toast.success("Forms Assigned Successfully");
            }
            
            history.goBack();
        });

    }
    const handleMultiSelect = e =>{
        setMultiSelectGroup(e);
    }

    const handleMultiRemove = e => {
        setMultiSelectGroup(e);
    };
    const getGroups = () =>{
        server
        .get('/groups')
        .then(res => {
        //   setGroups(res.data.data);
          setAvailableGroups(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    const getForms = () =>{
        server.get('/forms')
        .then(res => {
            setFormsList(res.data.data)
        })
        .catch(err => {
            console.log("Error",err )
        })
    }
    useEffect(()=>{
        getGroups();
        getForms();
    },[])

    const handleChangeSelect = (e) => {
        setSelectedForm(e.target.value);
        server
        .get(`/assignedForms/${e.target.value}`)
        .then(res => {
            setSelectedValue(res.data.data);
        })
        .catch(err => {
            console.log("Error ",err);
        })
    }
    return ( 
        <Tabs>
            <Tab eventKey={1} title="Assign Forms">
                <Card>
                    <CardHeader title="Assign Forms to User or Groups">
                         <SaveButton handleSave={handleSave} value= 'Save' />
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md={8}>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select Users or Groups</Form.Label>
                                        <Multiselect 
                                            ref={multiSelectUserRef}
                                            options={availableGroups}
                                            onSelect={handleMultiSelect}
                                            onRemove={handleMultiRemove}
                                            displayValue="name"
                                            selectedValues={selectedValue}
                                            
                                        />
                                        {/* <InputGroup >
                                            <InputGroup.Text>Hello I'm text</InputGroup.Text>
                                            <Form.Control aria-label="First name" />
                                        </InputGroup> */}
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    {/* <Form.Group controlId='exampleForm.ControlSelect2'> */}
                                        {/* <Form.Label>Select Forms</Form.Label>
                                        <Multiselect 
                                            ref={multiSelectFormsRef}
                                            options={availableForms}
                                            onSelect={handleMultiSelectForm}
                                            onRemove={handleMultiRemoveForm}
                                            displayValue="form"
                                        /> */}
                                    <label className="mt-2">Please select a Form: </label>
                                    <select
                                        // value={selectedForm}
                                        onChange={handleChangeSelect}
                                        className="form-control"
                                    >
                                        <option>Please Select Form</option>
                                        {formsList && formsList?.map((key) => <option value={key.id} key={key.id}>{key.form}</option>)}
                                    </select>
                                    {/* </Form.Group> */}
                                </Col>
                            </Row>
                            {/* {console.log(formsList)} */}
                            {/* {formsList && formsList?.map(dta => <>
                                <Row>
                                    <Col md={8}>
                                    </Col>
                                    <Col md={4}>
                                        <select disabled className='form-control mb-4'>
                                            <option value={dta.id}>
                                                {dta.form}
                                            </option>
                                        </select>
                                    </Col>
                                </Row>
                            </>)} */}
                        </Form>
                    </CardBody>
                </Card>
            </Tab>
        </Tabs>
     );
}
 