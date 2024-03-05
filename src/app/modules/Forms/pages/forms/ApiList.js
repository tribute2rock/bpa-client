import React, { useState } from 'react'
import { apiselectlist } from '../../../../components/FormBuilder/api-selection-list';
import { Form, Tab, Tabs, Row, Col, Container, Button } from 'react-bootstrap';


function ApiList({ formbuilder3Data, setApiValuesList, apiValuesList, setApiValuesListInArray, apiValuesListInArray }) {
  const [apiSelectionList, setApiSelectionList] = useState([]);
  const [apiListAdd, setApiListAdd] = useState([0]);
  const [apiValuesListAdd, setApiValuesListAdd] = useState({ 0: [0] });
  const [fieldsPayloadAdd, setFieldsPayloadAdd] = useState({ 0: [0] });
  const [responseValue, setResponseValue] = useState({});
  const [fieldPayloadData, setFieldPayloadData] = useState({});

  const handleApiListChange = (e, mainindex) => {
    setApiValuesList({ ...apiValuesList, [e.target.name]: e.target.value })
    apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], [e.target.name]: e.target.value }
    apiSelectionList[mainindex] = e.target.value
  }
  const handleAddForApiValuesList = (mainindex) => {
    // setApiValuesListAdd([...apiValuesListAdd, apiValuesListAdd[apiValuesListAdd.length - 1] + 1])
    setApiValuesListAdd({ ...apiValuesListAdd, [mainindex]: [...apiValuesListAdd[mainindex], apiValuesListAdd[mainindex][apiValuesListAdd[mainindex].length - 1] + 1] })

  }
  const handleAddForApiList = (mainindex) => {
    setApiListAdd([...apiListAdd, apiListAdd[apiListAdd.length - 1] + 1])
    setFieldsPayloadAdd({ ...fieldsPayloadAdd, [mainindex + 1]: [0] })
    setApiValuesListAdd({ ...apiValuesListAdd, [mainindex + 1]: [0] })
  }

  const handleAddForApiFieldPayload = (mainindex) => {
    setFieldsPayloadAdd({ ...fieldsPayloadAdd, [mainindex]: [...fieldsPayloadAdd[mainindex], fieldsPayloadAdd[mainindex][fieldsPayloadAdd[mainindex].length - 1] + 1] })
    // fieldsPayloadAdd[index] = fieldsPayloadAdd[Object.values(fieldsPayloadAdd).length - 1] + 1;
  }
  const handleChangeForApiList = (e, mainindex) => {
    setApiValuesList({ ...apiValuesList, [e.target.name]: e.target.value })
    apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], [e.target.name]: e.target.value }
  }

  const handleDeleteForApiValuesList = (apiListIndex, mainindex) => {
    if (apiValuesListAdd[mainindex].length > 1) {
      const deletedData = apiValuesListAdd[mainindex]?.filter(data => {
        return data !== apiListIndex
      })
      setApiValuesListAdd({ ...apiValuesListAdd, [mainindex]: deletedData })

      if (apiValuesListInArray[mainindex] !== undefined) {
        if (apiValuesListInArray[mainindex].hasOwnProperty('field_value')) {
          const fieldsData = JSON.parse(apiValuesListInArray[mainindex]['field_value'])
          const deletedFieldValueData = fieldsData?.filter((data, i) => i !== apiListIndex)
          setApiValuesList({ ...apiValuesList, ['field_value']: JSON.stringify(deletedFieldValueData) })
          apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], ['field_value']: JSON.stringify(deletedFieldValueData) }
        }
      }
    }
  }
  const handleDeleteForApiFieldPayload = (apiListIndex, mainindex) => {
    if (fieldsPayloadAdd[mainindex].length > 1) {
      const deletedData = fieldsPayloadAdd[mainindex]?.filter(data => {
        return data !== apiListIndex
      })
      setFieldsPayloadAdd({ ...fieldsPayloadAdd, [mainindex]: deletedData })
      fieldsPayloadAdd[mainindex] = deletedData
      if (apiValuesListInArray[mainindex] !== undefined) {
        if (apiValuesListInArray[mainindex].hasOwnProperty('fields_payload')) {
          const fieldsData = JSON.parse(apiValuesListInArray[mainindex]['fields_payload'])
          const deletedData = fieldsData.filter((data, i) => i !== apiListIndex)
          setApiValuesList({ ...apiValuesList, ['fields_payload']: JSON.stringify(deletedData) })
          apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], ['fields_payload']: JSON.stringify(deletedData) }
        }
      }
    }
  }
  const handleDeleteForApiList = (mainindex) => {
    if (apiListAdd.length > 1) {
      const deletedData = apiListAdd.filter(data => {
        return data !== mainindex
      })
      setApiListAdd(deletedData)
      const dataFiltered = apiValuesListInArray.filter((data, i) => i !== mainindex)
      setApiValuesListInArray(dataFiltered)
    }
  }

  const handleChangeForResponseValue = (e, index, mainindex) => {
    const result = Object.entries({ ...responseValue[mainindex], [e.target.name + index]: e.target.value }).reduce((acc, [key, value]) => {
      const lastIndex = key.match(/\d+$/);
      const groupName = key.replace(/\d+$/, '');
      if (!lastIndex || isNaN(parseInt(lastIndex[0]))) {
        acc.push({ [key]: value });
      } else {
        const index = parseInt(lastIndex[0]);
        if (!acc[index]) {
          acc[index] = {};
        }
        acc[index][groupName] = value;
      }
      return acc;
    }, [])
    responseValue[mainindex] = { ...responseValue[mainindex], [e.target.name + index]: e.target.value }
    setApiValuesList({ ...apiValuesList, ['field_value']: JSON.stringify(result) })
    apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], ['field_value']: JSON.stringify(result) }

  }

  const handleChangeForFieldsPayload = (e, index, mainindex) => {
    const result = Object.entries({ ...fieldPayloadData[mainindex], [e.target.name + index]: e.target.value }).reduce((acc, [key, value]) => {
      const lastIndex = key.match(/\d+$/);
      const groupName = key.replace(/\d+$/, '');
      if (!lastIndex || isNaN(parseInt(lastIndex[0]))) {
        acc.push({ [key]: value });
      } else {
        const index = parseInt(lastIndex[0]);
        if (!acc[index]) {
          acc[index] = {};
        }
        acc[index][groupName] = value;
      }
      return acc;
    }, [])
    fieldPayloadData[mainindex] = { ...fieldPayloadData[mainindex], [e.target.name + index]: e.target.value }
    setApiValuesList({ ...apiValuesList, ['fields_payload']: JSON.stringify(result) })
    apiValuesListInArray[mainindex] = { ...apiValuesListInArray[mainindex], ['fields_payload']: JSON.stringify(result) }
  }


  const apiNameList = apiselectlist.map((dataOptions) => dataOptions.name)


  return (
    <>
      {apiListAdd?.map((mainindex) => {
        return (
          <>
            <div className='apilistcontainer'>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>API List</Form.Label>
                        <select id="selectlist_1" name="api" class="form-control w-100" onChange={(e) => handleApiListChange(e, mainindex)} >
                          <option value="" selected>Select API</option>
                          {apiNameList.map(apiDataList => {
                            return (
                              <option value={apiDataList}>{apiDataList}</option>
                            )
                          })}
                        </select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Trigger's</Form.Label>
                        <select id="selectlist_1" name="handletrigger" class="form-control w-100" onChange={(e) => handleChangeForApiList(e, mainindex)}>
                          <option value="" selected>Select Trigger</option>
                          <option value="onClick">onClick</option>
                          <option value="onChange">onChange</option>
                        </select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={9}>
                  <Row>
                    {fieldsPayloadAdd[mainindex]?.map((index, i) => {
                      return (
                        <>
                          <Col md={4}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Fields</Form.Label>
                              <select id="selectlist_1" name="fields" class="form-control w-100" onChange={(e) => handleChangeForFieldsPayload(e, index, mainindex)}>
                                <option value="" selected>Select Field</option>

                                {formbuilder3Data.filter(inputDatas => inputDatas.name !== 'Section' && inputDatas.name !== 'Spacer' && inputDatas.name !== 'Heading' && inputDatas.name !== 'Paragraph' && inputDatas.name !== 'Link').map(inputDataList => {
                                  return (
                                    <option value={inputDataList.inputName}>{inputDataList.inputName}</option>

                                  )
                                })}
                              </select>
                            </Form.Group>
                          </Col>

                          <Col md={4}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Payload</Form.Label>
                              <select id="selectlist_1" name="payload" class="form-control w-100" onChange={(e) => handleChangeForFieldsPayload(e, index, mainindex)}>
                                <option value="" selected>Select Payload</option>

                                {apiselectlist.filter(item => item.name === apiSelectionList[mainindex]).map(data => data.payload).map(apiDataList => {
                                  return apiDataList?.map(payloadData => {
                                    return (
                                      <option value={payloadData?.name}>{payloadData?.name}</option>
                                    )
                                  })
                                })}
                              </select>
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <div className='adddeleteGroupBtn'>
                              <div className='add-new-api-btn  mr-2 mt-5' onClick={() => handleAddForApiFieldPayload(mainindex)}>
                                <button >+</button>
                              </div>
                              <div className='delete-api-btn  mr-2 mt-5' onClick={() => handleDeleteForApiFieldPayload(index, mainindex)}>
                                <button >-</button>
                              </div>
                            </div>
                          </Col>
                        </>
                      )
                    })}

                  </Row>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <Row>
                    {apiValuesListAdd[mainindex]?.map((dataIndex, i) => {
                      return (
                        <><Col md={4}>
                          <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Response Fields</Form.Label>
                            <select id={'selectlist_' + i} name="field" class="form-control w-100" onChange={(e) => handleChangeForResponseValue(e, dataIndex, mainindex)}>
                              <option value="" selected>Select Field</option>

                              {formbuilder3Data.filter(inputDatas => inputDatas.name !== 'Section' && inputDatas.name !== 'Spacer' && inputDatas.name !== 'Heading' && inputDatas.name !== 'Paragraph' && inputDatas.name !== 'Link').map(inputDataList => {
                                return (
                                  <option value={inputDataList.inputName}>{inputDataList.inputName}</option>

                                )
                              })}
                            </select>
                          </Form.Group>
                        </Col>

                          <Col md={4}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Value</Form.Label>
                              <select id="selectlist_1" name="value" class="form-control w-100" onChange={(e) => handleChangeForResponseValue(e, dataIndex, mainindex)}>
                                <option value="" selected>Select Value</option>

                                {apiselectlist.filter(data => data.name === apiSelectionList[mainindex]).map((dataOptions) => {
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
                                      <option value={value.key}>{value.key}</option>
                                    </>)
                                  })
                                })}
                              </select>
                            </Form.Group>
                          </Col>
                          <Col md={2}>
                            <div className='adddeleteGroupBtn'>
                              <div className='add-new-api-btn  mr-2 mt-5' onClick={() => handleAddForApiValuesList(mainindex)}>
                                <button >+</button>
                              </div>
                              <div className='delete-api-btn  mr-2 mt-5' onClick={() => handleDeleteForApiValuesList(dataIndex, mainindex)}>
                                <button >-</button>
                              </div>
                            </div>
                          </Col>
                          {i == 0 && <Col md={2} >
                            <div className='delete-api-btn  mr-2 mt-8' onClick={() => handleDeleteForApiList(mainindex)}>
                              <button>Remove</button>
                            </div>
                          </Col>}
                        </>

                      )
                    })}

                  </Row>
                </Col>
              </Row>
            </div >
          </>
        )
      })}
      <Row>
        <Col md={12} >
          <div className='add-new-api-btn mr-2 mt-8' onClick={() => handleAddForApiList(apiListAdd[apiListAdd.length - 1])}>
            <button>Add New API</button>
          </div>
        </Col>
      </Row>

    </>
  )
}

export default ApiList