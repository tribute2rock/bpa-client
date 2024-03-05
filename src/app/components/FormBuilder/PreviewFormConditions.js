import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import EditForm from './EditForm';
import { v4 as uuidv4 } from 'uuid';
import { filteredEditableInput } from './EditableJson';
import _ from 'lodash'



function PreviewFormConditions({ setFormbuilder3Data, formData, setFormData, data, setRadioCheckedForHidden, radioCheckedForHidden, setCheckBoxCheckedForHidden, checkBoxCheckedForHidden }) {
  const [editableFields, setEditableFields] = useState([])
  const [modal, setModal] = useState(false);
  const [editedId, setEeditedId] = useState("");
  const [oneFormData, setOneFormdata] = useState(data);


  const history = useHistory()


  const handleCopy = (clickedItems) => {
    setFormData(() => ([...formData, { ...clickedItems, id: uuidv4() }]))
    setFormbuilder3Data(() => ([...formData, { ...clickedItems, id: uuidv4() }]))
  }


  const handleChangeRadio = (e, radioDataList) => {
    setOneFormdata({ ...oneFormData, checkedField: e.target.value })
    setRadioCheckedForHidden({ ...radioCheckedForHidden, [e.target.name]: e.target.value })
  }

  const handlecheckboxChange = (e) => {
    if (!checkBoxCheckedForHidden.includes(e.target.value)) {
      setCheckBoxCheckedForHidden([...checkBoxCheckedForHidden, e.target.value])
      setOneFormdata({ ...oneFormData, checkedField: [...checkBoxCheckedForHidden, e.target.value] })
    } else {
      setCheckBoxCheckedForHidden(checkBoxCheckedForHidden.filter((data) => data !== e.target.value))
      setOneFormdata({ ...oneFormData, checkedField: checkBoxCheckedForHidden?.filter((data) => data !== e.target.value) })
    }

  }
  const radioDatas = formData.filter((data) => {
    return data.name === 'Radio Button';
  }).map((data) => {
    return data.options;
  });
  const checkedDatas = formData.filter((data) => {
    return data.name === 'Checkbox';
  }).map((data) => {
    return data.options;
  });


  const radioFormData = _.flatten(radioDatas)
  const checkedFormData = _.flatten(checkedDatas)
  console.log(formData)


  return (
    <>
      <Col key={data.id}>
        <EditForm setFormbuilder3Data={setFormbuilder3Data} editedId={editedId} formData={formData} setFormData={setFormData} setOneFormdata={setOneFormdata} oneFormData={oneFormData} setEeditedId={setEeditedId} modal={modal} setModal={setModal} editableFields={editableFields} setEditableFields={setEditableFields} />
        <div className={data.width === '12' ? 'previewformConditionsOne' : data.width === '6' ? 'previewformConditionsTwo' : data.width === '3' ? 'previewformConditionsThree' : 'previewformConditionsFour'}>
          <Form>
            {/* FOR SECTION */}
            {data.name === "Section" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <div style={{
                  height: `${data.height}px`,
                  width: "100%",
                  backgroundColor: `${data.backgroundColor}`,
                  borderRadius: `${data.borderRadius}px`,
                  background: `linear-gradient(${data.colorPosition}, ${data.color1}, ${data.color2})`
                }}></div>
              </div>
            }
            {/* (data.hidden && radioFormData.includes(data.class)) &&  */}

            {/* FOR SPACER */}
            {data.name === "Spacer" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <div class="col-xs-12">
                  <div style={{ height: `${data.height}px`, padding: "5px" }} ></div>
                </div>
              </div>
            }

            {/* FOR HEADING */}
            {data.name === "Heading" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <h2 className='w-100' style={{ background: `linear-gradient(${data.colorPosition}, ${data.color1}, ${data.color2})`, textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }} >{data.text}</h2>
              </div>
            }


            {/* FOR PARAGRAPH */}
            {data.name === "Paragraph" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <p className='w-100'
                  style={{ background: `linear-gradient(${data.colorPosition}, ${data.color1}, ${data.color2})`, textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }}>{data.text}</p>
              </div>
            }

            {/* FOR SHORT TEXT */}
            {data.name === "Short Text" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <Form.Control
                    type={data.inputType}
                    name={data.inputName}
                    placeholder={data.placeHolder}
                    value={data.predefinedValue}
                    md={data.width}
                    className='w-100'
                    readOnly={data.readOnly}
                    required={data.required}
                    disabled={data.disabled}
                    style={{ borderRadius: `${data.borderRadius}px`, color: `${data.textColor}` }}
                    min={data.minLength}
                    max={data.maxLength}
                  />
                </Form.Group>
              </div>
            }

            {/* FOR LONG TEXT */}
            {data.name === "Long Text" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass mb-3" : "mb-3"}>
                  {data.labelTextName !== "" && <><Form.Label className='mb-2' style={{ minWidth: "max-content", color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <Form.Control
                    as="textarea"
                    rows={3}
                    type={data.inputType}
                    name={data.inputName}
                    placeholder={data.placeHolder}
                    value={data.predefinedValue}
                    readOnly={data.readOnly}
                    required={data.required}
                    disabled={data.disabled}
                    style={{ borderRadius: `${data.borderRadius}px`, color: `${data.textColor}` }}
                    min={data.minLength}
                    max={data.maxLength}
                  />
                </Form.Group>
              </div>}

            {/* FOR DATE */}
            {data.name === "Date" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    readOnly
                    // value={date}
                    // onChange={(e) => setDate(e.target.value)}
                    style={{ borderRadius: `${data.borderRadius}px`, color: `${data.textColor}` }}

                  />
                </Form.Group>
              </div>
            }

            {/* FOR NUMBER */}
            {data.name === "Number" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <Form.Control
                    // className={message ? 'is-invalid' : null}
                    className='w-100'
                    type="number"
                    name="name"
                    placeholder={data.name}
                    value=""
                    readOnly
                    style={{ borderRadius: `${data.borderRadius}px`, color: `${data.textColor}` }}
                    min={data.minLength}
                    max={data.maxLength}
                  // onChange={handleChangeForm}
                  />
                </Form.Group>
              </div>}


            {/* FOR Drop Down */}
            {data.name === "Dropdown" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <div class="widthDropdown">
                    <select id="selectlist_1" name="selectlist_1[]" readOnly data-alias="" class="form-control w-100" style={{ borderRadius: `${data.borderRadius}px`, color: `${data.textColor}` }}>
                      {data.options.map((dataOptions) => {
                        return (<>
                          <option value={dataOptions} selected>{dataOptions}</option>
                        </>)
                      })
                      }
                    </select>
                  </div>
                </Form.Group>
              </div>}


            {/* FOR Check box */}
            {data.name === "Checkbox" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <div key={`inline-${data.id}`} className="widthDropdown" readOnly>
                    {data.options.map((listOptions, i) => (
                      <Form.Check
                        inline
                        label={listOptions}
                        name={listOptions}
                        value={listOptions}
                        type={'checkbox'}
                        id={`inline-${'checkbox'}-${data.id + i}`}
                        key={i}
                        onChange={handlecheckboxChange}
                      />
                    ))}
                  </div>
                </Form.Group>
              </div>}

            {/* FOR Radio Button */}
            {data.name === "Radio Button" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <div key={`inline-${data.id}`} className="widthDropdown">
                    {data.options.map((listOptions, i) => (
                      <Form.Check
                        inline
                        label={listOptions}
                        name={`group-radio-${data.id}`}
                        type={'radio'}
                        id={`inline-${'rcheckbox'}-${data.id + i}`}
                        key={i}
                        onChange={(e) => handleChangeRadio(e, data)}
                        value={listOptions}
                        class="widthDropdown"
                      />
                    ))}
                  </div>
                </Form.Group>
              </div>}

            {/* FOR File Upload */}
            {data.name === "File uploader" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <div class="col-xs-12" readOnly>
                    <div class="form-group">
                      <input type="file" id="file_1" name="file_1[]" data-alias="" accept=".gif, .jpg, .png"></input>
                    </div>
                  </div>
                </Form.Group>
              </div>}

            {/* FOR Signature */}
            {data.name === "Signature" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortTextpreview' : 'inputShortTextpreview'}>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {/* <div class="col-xs-12"> */}
                  <div class="form-group" readOnly>
                    <label class="control-label" for="signature_1">Signature</label>
                    <div class="signature-pad">
                      <canvas id="signature_1" width="120" height="30" data-color="black" ></canvas>
                    </div>

                  </div>
                  <hr style={{ width: '5vw', border: '1px solid grey', margin: 0 }}></hr>
                  {/* </div> */}
                </Form.Group>
              </div>}

                          {/* FOR Link */}
            {data.name === "Link" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <a href={data.link} target='_blank'
                  style={{ textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }}
                >{data.text}</a>
              </div>}

                    {/* for Basic Operator */}
            {data.name === "Basic Operator" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div class="col-xs-12">
                  <div class="form-group">
                    <table class="table-matrix table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          {data.options.slice(0, -1).map((lists, i) => (
                            <>
                              <th class="">{lists}</th>
                              {/* <th class={data.options.slice(0, -1).length - 1 === i ? "lastoptionHidden" : ""} ></th> */}
                            </>
                          ))
                          }
                          {/* <th class=""></th> */}
                          {[data.options[data.options.length - 1]].map((lists, i) => (
                            <th class="" key={i}>{lists}</th>
                          ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            {/* <label className='d-flex align-items-center justify-content-center'>{data.labelTextName}</label> */}
                          </th>
                          {data.options.slice(0, -1).map((list, i) => (
                            <>
                              <td class="text-center" title={list}>
                                <div class="input">
                                  <Form.Group >
                                    <Form.Control
                                      type={'number'}
                                      name={"hello"}
                                      md={12}
                                      className='w-100'
                                    />
                                  </Form.Group>
                                </div>
                              </td>
                
                            </>
                          ))
                          }

                          {/* for total */}
                          {[data.options[data.options.length - 1]].map((list, i) => (
                            <td class="text-center" title={list}>
                              <div class="input">
                                <Form.Group >
                                  <Form.Control
                                    type={'number'}
                                    name={"hello"}
                                    md={12}
                                    className='w-100'
                                  />
                                </Form.Group>
                              </div>
                            </td>
                          ))
                          }
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}
          </Form>
        </div>
      </Col>
    </>
  )
}

export default PreviewFormConditions