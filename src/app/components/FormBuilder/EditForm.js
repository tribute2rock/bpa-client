import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Dropdown, Col, Tab, Tabs } from 'react-bootstrap';
import { apiselectlist } from './api-selection-list';
import { getObjectValueByPath } from './helper';




function EditForm({ apiChoosenRadio, setApiChoosenRadio, setFormbuilder3Data, modal, setModal, editableFields, editedId, setEeditedId, oneFormData, setOneFormdata, setFormData, formData }) {
  const [tabValue, setTabValue] = useState(1)
  const [oneFormDataEditable, setOneFormDataEditable] = useState(oneFormData)
  const [apiOption, setApiOption] = useState("")


  const toggle = () => {
    setModal(!modal)
    setEeditedId("")
    setOneFormDataEditable(oneFormData)
  };

  const handleFormSubmit = async () => {
    try {
      setModal(!modal)
      // history.push('/forms/new?type=dynamic')
      setEeditedId("")
      setOneFormdata(oneFormDataEditable)
      const indexOfClickedFields = formData.findIndex(item => item.id === editedId)
      if (indexOfClickedFields !== -1) {
        const newFormData = formData
        newFormData[indexOfClickedFields] = oneFormDataEditable
        setFormData(() => [...newFormData])
        setFormbuilder3Data(() => [...newFormData])
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleToggleTabs = (tab) => {
    setTabValue(tab)
  }


  const handleChangeForm = (e) => {
    setOneFormDataEditable({ ...oneFormDataEditable, [e.target.name]: e.target.value })
  }

  const handleChecked = (e) => {
    setOneFormDataEditable({ ...oneFormDataEditable, [e.target.name]: Boolean(e.target.checked) })
  }

  const handleFormOptions = (e) => {
    setOneFormDataEditable({ ...oneFormDataEditable, [e.target.name]: (e.target.value).split(', ') })
  }

  const handleRadioChangeForApi = (e) => {
    setOneFormDataEditable({ ...oneFormDataEditable, [e.target.name]: e.target.value })
    setApiChoosenRadio(e.target.value)
  }

  const handleApiOptionChange = (e) => {
    setOneFormDataEditable({ ...oneFormDataEditable, [e.target.name]: e.target.value })
    setApiOption(e.target.value)
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-6 w-100"
            activeKey={tabValue}
            onSelect={handleToggleTabs}
          >
            {/***********************************  for settings *********************************/}

            <Tab eventKey={1} title="Settings">
              <div className='d-flex flex-wrap'>
                  {editableFields?.filter(data => data.id === 1).map((list, i) => {
                    return (
                      <Col md={4} key={i}>
                        <Form.Group>
                          <Form.Label>{list.name}</Form.Label>
                          <select id="selectlist_1" name={list.type} class="form-control" onChange={handleChangeForm} value={oneFormDataEditable[list?.type]}>
                            {list.options.map((optionList, i) => {
                              return (
                                <>
                                  <option key={i} value={optionList}>{optionList}</option>
                                </>
                              )
                            })}
                          </select>

                        </Form.Group>
                      </Col>
                    )
                  })}

                  {editableFields?.filter(data => data.id !== 1 && data.id !== 13 && data.id !== 18 && data.id !== 14 && data.id !== 15 && data.id !== 24 && data.id !== 31 && data.id !== 33 && data.id !== 29 && data.id !== 32 && data.id !== 26 && data.id !== 11 && data.id !== 35 && data.id !== 8 && data.id !== 9 && data.id !== 12 && data.id !== 25 && data.id !== 27 && data.id !== 28 && data.id !== 4 && data.id !== 5 && data.id !== 7 && data.id !== 22 && data.id !== 30).map((field, i) => {
                    // console.log(oneFormData[field.type])
                    return (
                      <Col md={4} key={i}>
                        <Form.Group>
                          <Form.Label>{field.name}</Form.Label>
                          <Form.Control
                            md={12}
                            required
                            type="text"
                            name={field.type}
                            placeholder={field.placeholder}
                            value={oneFormDataEditable[field?.type]}
                            onChange={handleChangeForm}
                          />
                          <small className="text-danger">{""}</small>
                        </Form.Group>
                      </Col>
                    )
                  })
                  }

                  {/* for options */}
                  {editableFields?.filter(data => data.id === 18).map((list, i) => {
                    return (
                      <Col md={4} key={i}>
                        <Form.Group>
                          <Form.Label>{list.name}</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            // className={message ? 'is-invalid' : null}
                            className='w-100'
                            required
                            name={list.type}
                            placeholder={list.placeholder}
                            value={oneFormDataEditable[list?.type].join(', ')}
                            onChange={handleFormOptions}
                          />
                          <small className="text-danger">{""}</small>
                        </Form.Group>
                      </Col>
                    )
                  })}

                  {/* for text */}
                  {editableFields?.filter(data => data.id === 29).map((list, i) => {
                    return (
                      <Col md={4} key={i}>
                        <Form.Group>
                          <Form.Label>{list.name}</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            // className={message ? 'is-invalid' : null}
                            className='w-100'
                            name={list.type}
                            placeholder={list.placeholder}
                            value={oneFormDataEditable[list?.type]}
                            onChange={handleChangeForm}
                          />
                          <small className="text-danger">{""}</small>
                        </Form.Group>
                      </Col>
                    )
                  })}

              </div >
              <Form.Group>
                <div className='ml-5'>
                  {editableFields?.filter(data => data.id === 32).map(list => {
                    return (
                      <Form.Check
                        inline
                        label={list.name}
                        name={list.type}
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-${list.id}`}
                        key={list.id}
                        checked={oneFormDataEditable[list?.type]}
                        onClick={handleChecked}
                        value={!oneFormDataEditable[list?.type]}
                      />
                    )
                  })}
                </div>
              </Form.Group>
            </Tab >
            {/************************************** for styles  *****************************/}
            <Tab eventKey={2} title="Styles">
              <div className='d-flex flex-wrap'>
                {editableFields?.filter(data => data.id === 11).map((list, i) => {
                  return (
                    <Col md={4} key={i}>
                      <Form.Group>
                        <Form.Label>{list.name}</Form.Label>
                        <select id="selectlist_1" name={list.type} class="form-control" onChange={handleChangeForm} value={oneFormDataEditable[list?.type]}>
                          {list.options.map((optionList, i) => {
                            return (
                              <>
                                <option key={i} value={optionList}>{optionList}</option>
                              </>
                            )
                          })}
                        </select>

                      </Form.Group>
                    </Col>
                  )
                })}

                {/* for width */}
                {editableFields?.filter(data => data.id === 24).map((list, i) => {
                  const widthPercentage = ['100%', '50%', '25%', '12.5%']
                  return (
                    <Col md={4} key={list.id}>
                      <Form.Group>
                        <Form.Label>{list.name}</Form.Label>
                        <select id="selectlist_1" name={list.type} class="form-control" value={oneFormDataEditable[list?.type]} onChange={handleChangeForm}>
                          {list.options.map((optionList, i) => {
                            return (
                              <>
                                <option value={optionList}>{widthPercentage[i]}</option>
                              </>
                            )
                          })}
                        </select>

                      </Form.Group>
                    </Col>
                  )
                })}

                {editableFields?.filter(data => data.id === 31).map((list, i) => {
                  return (
                    <Col md={4} key={list.id}>
                      <Form.Group>
                        <Form.Label>{list.name}</Form.Label>
                        <select id="selectlist_1" name={list.type} class="form-control" value={oneFormDataEditable[list?.type]} onChange={handleChangeForm}>
                          {list.options.map((optionList, i) => {
                            return (
                              <>
                                <option value={optionList}>{optionList}</option>
                              </>
                            )
                          })}
                        </select>
                      </Form.Group>
                    </Col>
                  )
                })}

                {editableFields?.filter(data => data.id !== 1 && data.id !== 13 && data.id !== 18 && data.id !== 14 && data.id !== 15 && data.id !== 24 && data.id !== 31 && data.id !== 33 && data.id !== 29 && data.id !== 32 && data.id !== 26 && data.id !== 11 && data.id !== 35 && data.id !== 2 && data.id !== 3 && data.id !== 17 && data.id !== 19 && data.id !== 20 && data.id !== 23 && data.id !== 34 && data.id !== 4 && data.id !== 5 && data.id !== 7 && data.id !== 22).map((field, i) => {
                  // console.log(oneFormData[field.type])
                  return (
                    <Col md={4} key={i}>
                      <Form.Group>
                        <Form.Label>{field.name}</Form.Label>
                        <Form.Control
                          // className={message ? 'is-invalid' : null}
                          className='w-100'
                          required
                          type="text"
                          name={field.type}
                          placeholder={field.placeholder}
                          value={oneFormDataEditable[field?.type]}
                          onChange={handleChangeForm}
                        />
                        <small className="text-danger">{""}</small>
                      </Form.Group>
                    </Col>
                  )
                })
                }

                {/* for color  */}
                {editableFields?.filter(data => data.id === 26).map((field, i) => {
                  // console.log(oneFormData[field.type])
                  return (
                    <Col md={4} key={i}>
                      <Form.Group>
                        <Form.Label>{field.name}</Form.Label>
                        <Form.Control
                          // className={message ? 'is-invalid' : null}
                          className='w-100'
                          required
                          type="color"
                          name={field.type}
                          placeholder={field.placeholder}
                          value={oneFormDataEditable[field?.type]}
                          onChange={handleChangeForm}
                        />
                        <small className="text-danger">{""}</small>
                      </Form.Group>
                    </Col>
                  )
                })
                }


                {/* for gradient color  */}
                {editableFields?.filter(data => data.id === 33).map((field, i) => {
                  // console.log(oneFormData[field.type])
                  return (
                    <Col md={4} key={i}>
                      <Form.Group>
                        <Form.Label>{field.name}</Form.Label>
                        <div className='gradientBox'>
                          <div className='clearAndDisplay'>
                            <div className='displayGradient' style={{ background: `linear-gradient(${oneFormDataEditable[field?.colorPositionType]}, ${oneFormDataEditable[field?.color1Type]}, ${oneFormDataEditable[field?.color2Type]})` }}>
                            </div>
                            {/* <button type="button" className='clearGradientBtn' onClick={() => setOneFormDataEditable({
                              ...oneFormDataEditable, color1: 'initial',
                              color2: 'initial',
                              colorPosition: 'initial'
                            })}>Clear</button> */}
                          </div>
                          <div className='colorsPicker'>

                            <input type='color' class='color1' name='color1' value={oneFormDataEditable[field?.color1Type]} onChange={handleChangeForm}></input>
                            <input type='color' class='color2' name='color2' value={oneFormDataEditable[field?.color2Type]} onChange={handleChangeForm}></input>
                            <select name='colorPosition' className='form-control selectForGradient' onChange={handleChangeForm} value={oneFormDataEditable[field?.colorPositionType]}>
                              <option value='to right'>to right</option>
                              <option value='to right bottom'>to right bottom</option>
                              <option value='to right top'>to right top</option>
                              <option value='to left'>to left</option>
                              <option value='to left bottom'>to left bottom</option>
                              <option value='to left top'>to left top</option>
                              <option value='to bottom'>to bottom</option>
                              <option value='to top'>to top</option>
                            </select>
                          </div >

                        </div >
                      </Form.Group >

                    </Col >

                  )
                })
                }

              </div >
            </Tab>


            {/************************************** for validations  *****************************/}
            <Tab eventKey={3} title="Validations">
              <div className='d-flex flex-wrap'>
                {editableFields?.filter(data => data.id !== 1 && data.id !== 13 && data.id !== 18 && data.id !== 14 && data.id !== 15 && data.id !== 24 && data.id !== 31 && data.id !== 33 && data.id !== 29 && data.id !== 32 && data.id !== 26 && data.id !== 11 && data.id !== 35 && data.id !== 2 && data.id !== 3 && data.id !== 17 && data.id !== 19 && data.id !== 20 && data.id !== 23 && data.id !== 34 && data.id !== 8 && data.id !== 9 && data.id !== 12 && data.id !== 25 && data.id !== 27 && data.id !== 28 && data.id !== 30 && data.id !== 10).map((field, i) => {
                  // console.log(oneFormData[field.type])
                  return (
                    <Col md={4} key={i}>
                      <Form.Group>
                        <Form.Label>{field.name}</Form.Label>
                        <Form.Control
                          // className={message ? 'is-invalid' : null}
                          className='w-100'                                                                                           
                          required
                          type="text"
                          name={field.type}
                          placeholder={field.placeholder}
                          value={oneFormDataEditable[field?.type]}
                          onChange={handleChangeForm}
                        />
                        <small className="text-danger">{""}</small>
                      </Form.Group>
                    </Col>
                  )
                })
                }

              </div >
              <Form.Group>
                <div className='ml-5'>
                  {editableFields?.filter(data => data.id === 13 || data.id === 14 || data.id === 15).map(list => {
                    return (
                      <Form.Check
                        inline
                        label={list.name}
                        name={list.type}
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-${list.id}`}
                        key={list.id}
                        checked={oneFormDataEditable[list?.type]}
                        onClick={handleChecked}
                        value={!oneFormDataEditable[list?.type]}
                      />
                    )
                  })}
                </div>
              </Form.Group>
            </Tab>


            {/***********************************  for api tap *********************************/}
            <Tab eventKey={4} title="API">
              <Form.Group>
                <div className='ml-5'>
                  {editableFields?.filter(data => data.id === 35).map(list => {
                    return list.options.map((dataList, i) => {
                      return (
                        <Form.Check
                          inline
                          label={dataList}
                          name={list.type}
                          type={'radio'}
                          id={dataList}
                          key={i}
                          onChange={(e) => handleRadioChangeForApi(e)}
                          value={dataList}
                          checked={apiChoosenRadio === dataList ? true : false}
                        />
                      )
                    })

                  })}

                </div>
              </Form.Group>

              {apiChoosenRadio === "Static Values" && editableFields?.filter(data => data.id === 18).map((list, i) => {
                return (
                  <Col md={12} key={i}>
                    <Form.Group>
                      <Form.Label>{list.name}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        // className={message ? 'is-invalid' : null}
                        className='w-100'
                        required
                        name={list.type}
                        placeholder={list.placeholder}
                        value={oneFormDataEditable[list?.type].join(', ')}
                        onChange={handleFormOptions}
                      />
                      <small className="text-danger">{""}</small>
                    </Form.Group>
                  </Col>
                )
              })}

              {apiChoosenRadio === "API" &&
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className='formLabelClass mb-2'>API</Form.Label>
                    <div class="widthDropdown">
                      <select id="selectlist_1" name="apiSelection" onChange={handleApiOptionChange} data-alias="" class="form-control w-100" >
                        <option value="" selected={oneFormDataEditable.apiSelection === "" ? true : false}>Select Api</option>
                        {oneFormData.name === "Dropdown" ? apiselectlist.filter((item) => item.responseType === "array").map((dataOptions) => {
                          return (<>
                            <option value={dataOptions.name} selected={oneFormDataEditable.apiSelection === dataOptions.name ? true : false}>{dataOptions.name}</option>
                          </>)
                        }) :
                          apiselectlist.filter((item) => item.responseType === "object").map((dataOptions) => {
                            return (<>
                              <option value={dataOptions.name} selected={oneFormDataEditable.apiSelection === dataOptions.name ? true : false}>{dataOptions.name}</option>
                            </>)
                          })
                        }
                      </select>
                    </div>
                  </Form.Group>
                </Col>
              }
              {apiOption !== "" && oneFormData.name === "Dropdown" ?
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className='formLabelClass mb-2'>Display Name</Form.Label>
                    <div class="widthDropdown">
                      <select id="selectlist_1" name="apiDisplayName" data-alias="" class="form-control w-100" onChange={handleChangeForm} >
                        <option value="" selected={oneFormDataEditable.apiDisplayName === "" ? true : false}>Select Value</option>
                        {apiselectlist.filter(data => data.name === apiOption).map((dataOptions) => {
                          const responseValue = dataOptions["responseKey"];
                          const keys = responseValue.includes('.') ? responseValue.split(".") : ['response'];
                          let currentObj = dataOptions;

                          for (const key of keys) {
                            if (currentObj.hasOwnProperty(key)) {
                              currentObj = currentObj[key];
                            } else {
                              // Handle invalid path or missing keys as needed.
                              return undefined;
                            }
                          }
                          return currentObj.map(value => {
                            return (<>
                              <option value={value.key} selected={oneFormDataEditable.apiDisplayName === value.key ? true : false}>{value.key}</option>
                            </>)
                          })
                        })
                        }
                      </select>
                    </div>
                  </Form.Group>
                </Col> : <></>
              }

              {apiOption !== "" &&
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className='formLabelClass mb-2'>Value</Form.Label>
                    <div class="widthDropdown">
                      <select id="selectlist_1" name="apiValue" data-alias="" class="form-control w-100" onChange={handleChangeForm}>
                        <option value="" selected={oneFormDataEditable.apiValue === "" ? true : false}>Select Value</option>
                        {apiselectlist.filter(data => data.name === apiOption).map((dataOptions) => {
                          const responseValue = dataOptions["responseKey"];
                          const keys = responseValue.includes('.') ? responseValue.split(".") : ['response'];
                          let currentObj = dataOptions;

                          for (const key of keys) {
                            if (currentObj.hasOwnProperty(key)) {
                              currentObj = currentObj[key];
                            } else {
                              // Handle invalid path or missing keys as needed.
                              return undefined;
                            }
                          }
                          return currentObj.map(value => {
                            return (<>
                              <option value={value.key} selected={oneFormDataEditable.apiValue === value.key ? true : false}>{value.key}</option>
                            </>)
                          })
                        })
                        }
                      </select>
                    </div>
                  </Form.Group>
                </Col>
              }
            </Tab>
          </Tabs >
        </ModalHeader >
        {/* <ModalBody>


        </ModalBody> */}


        < ModalFooter >
          {/* <Link to="/forms/new?type=dynamic" className="navi-link"> */}
          < Button color="primary" onClick={handleFormSubmit} >
            Save
          </Button >
          {/* </Link> */}
          {' '}

          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter >
      </Modal >

    </>
  )
}

export default EditForm