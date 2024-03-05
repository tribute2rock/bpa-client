import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import EditForm from './EditForm';
import { v4 as uuidv4 } from 'uuid';
import { filteredEditableInput } from './EditableJson';
import _ from 'lodash'



function FormConditions({ setFormbuilder3Data, formbuilder3Data, formData, setFormData, data, setRadioCheckedForHidden, radioCheckedForHidden, setCheckBoxCheckedForHidden, checkBoxCheckedForHidden }) {
  const [editableFields, setEditableFields] = useState([])
  const [modal, setModal] = useState(false);
  const [editedId, setEeditedId] = useState("");
  const [oneFormData, setOneFormdata] = useState(data);
  const [dataValues, setDataValues] = useState({ 0: "+" });
  const [apiChoosenRadio, setApiChoosenRadio] = useState(data?.selection)



  const history = useHistory()

  const handleEdit = (id, name) => {
    // history.push(`/forms/new?type=dynamic/${id}`)
    setEditableFields(filteredEditableInput(name))
    setEeditedId(id)
    // const indexOfClickedFields = formData.findIndex(item=> item.id === id)
    // if(indexOfClickedFields !== -1){
    //   formData[indexOfClickedFields] = newData
    // }
    setModal(!modal)
  }


  const handleCopy = (clickedItems) => {
    setFormData(() => ([...formData, { ...clickedItems, id: uuidv4() }]))
    setFormbuilder3Data(() => ([...formData, { ...clickedItems, id: uuidv4() }]))
  }

  const handleDelete = (clickedItems) => {
    const id = clickedItems.id
    const removedClickedItems = formData.filter(item => item.id !== id)
    setFormData(removedClickedItems)
    setFormbuilder3Data(removedClickedItems)
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

  const handleCopySection = (clickedItems) => {
    const clickedIndex = formData.findIndex(data => clickedItems.id === data.id)
    const filteredData = formData.slice(clickedIndex + 1);
    const lastIndex = filteredData.findIndex(data => data.name === 'Section')
    if (lastIndex !== -1) {
      const filteredSection = filteredData.slice(0, lastIndex + 1);
      const filteredSectionData = filteredSection.map(data => ({ ...data, id: uuidv4() }));
      setFormData(() => ([...formData, ...filteredSectionData]))
      setFormbuilder3Data(() => ([...formData, ...filteredSectionData]))
      console.log(filteredSectionData)
    }


  }

  const handleChangeOperatorValue = (e, i) => {
    setDataValues({ ...dataValues, [i]: e.target.value })
    setOneFormdata({ ...oneFormData, selectedOperatorValues: Object.values({ ...dataValues, [i]: e.target.value }) })
    const indexOfClickedFields = formData.findIndex(item => item.id === oneFormData.id)
    if (indexOfClickedFields !== -1) {
      const newFormData = formData
      newFormData[indexOfClickedFields] = { ...oneFormData, selectedOperatorValues: Object.values({ ...dataValues, [i]: e.target.value }) }
      setFormData(() => [...newFormData])
      setFormbuilder3Data(() => [...newFormData])
    }

  }


  return (
    <>
      <Col key={data.id}>
        <EditForm setApiChoosenRadio={setApiChoosenRadio} apiChoosenRadio={apiChoosenRadio} setFormbuilder3Data={setFormbuilder3Data} editedId={editedId} formData={formData} setFormData={setFormData} setOneFormdata={setOneFormdata} oneFormData={oneFormData} setEeditedId={setEeditedId} modal={modal} setModal={setModal} editableFields={editableFields} setEditableFields={setEditableFields} />
        <div className={data.width === '12' ? 'formConditionsOne' : data.width === '6' ? 'formConditionsTwo' : data.width === '3' ? 'formConditionsThree' : 'formConditionsFour'}>
          <Form>
            {/* FOR SECTION */}
            {data.name === "Section" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className={data.width < 6 ? 'inputFunctions editForSmallWidth' : 'inputFunctions'}>
                  <div className='copy' onClick={() => handleCopySection(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
                <div class="col-xs-12">
                  <div style={{ height: `${data.height}px`, backgroundColor: "lightgrey", padding: "5px" }} >spacer</div>
                </div>
              </div>
            }

            {/* FOR HEADING */}
            {data.name === "Heading" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
                <h2 className='w-100' style={{ background: `linear-gradient(${data.colorPosition}, ${data.color1}, ${data.color2})`, textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }} >{data.text}</h2>
              </div>
            }


            {/* FOR PARAGRAPH */}
            {data.name === "Paragraph" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
                <p
                  className='w-100'
                  style={{ background: `linear-gradient(${data.colorPosition}, ${data.color1}, ${data.color2})`, textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }}>{data.text}</p>
              </div>
            }

            {/* FOR SHORT TEXT */}
            {data.name === "Short Text" &&
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div onClick={() => handleEdit(data.id, data.name)} className='edit'>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''}>edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>
                  </div>
                </div>
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
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
                <Form.Group className={data.labelPosition === "Inline" ? "formGroupClass" : ""}>
                  {data.labelTextName !== "" && <><Form.Label className='formLabelClass mb-2' style={{ color: `${data.labelTextColor}`, fontSize: `${data.labelFontSize}px` }}>{data.labelTextName}</Form.Label><span className={data.required ? 'required formSpanClass' : "formSpanClass"}></span></>}
                  <div key={`inline-${data.id}`} className="widthDropdown">
                    {data.options.map((listOptions, i) => (
                      <Form.Check
                        inline
                        label={listOptions}
                        name={`group-${data.id}`}
                        type={'radio'}
                        id={`inline-${'checkbox'}-${data.id + i}`}
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
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
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>
                <a href={data.link} target='_blank'
                  style={{ textAlign: `${data.textAlign}`, borderRadius: `${data.borderRadius}px`, backgroundColor: `${data.backgroundColor}`, padding: `${data.padding}px`, fontSize: `${data.fontSize}px`, padding: `${data.padding}px`, color: `${data.textColor}` }}
                >{data.text}</a>
              </div>}


            {/* for Matrix */}
            {data.name === "Matrix" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="form-group">
                    <table class="table-matrix table table-hover">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          {data.options.map((lists, i) => (
                            <th class="text-center" key={i}>{lists}</th>
                          ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>
                            <label className='d-flex align-items-center justify-content-center'>{data.labelTextName}</label>
                          </th>
                          {data.options.map((list, i) => (
                            <td class="text-center" title={list}>
                              <div class="input">
                                <Form.Group >
                                  <Form.Control
                                    type={'text'}
                                    name={"hello"}
                                    md={12}
                                    className='w-100'
                                  />
                                </Form.Group>
                              </div>
                            </td>
                          ))
                          }
                          <div className='adddeleteGroupBtn'>
                            <Button className='mr-1'>+</Button>
                            <Button>-</Button>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>}


            {/* for Basic Operator */}
            {data.name === "Basic Operator" &&
              <div md={12} className={data.hidden && radioFormData.includes(data.class) && !Object.values(radioCheckedForHidden).includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText' && data.hidden && checkedFormData.includes(data.class) && !checkBoxCheckedForHidden.includes(data.class) ? 'hiddenThis inputShortText' : 'inputShortText'}>
                <div className='inputFunctions'>
                  <div className='copy' onClick={() => handleCopy(data)}>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M7 2C7.46499 2 7.69748 2 7.88823 2.05111C8.40587 2.18981 8.81019 2.59413 8.94889 3.11177C9 3.30252 9 3.53501 9 4V8.6C9 9.44008 9 9.86012 8.83651 10.181C8.6927 10.4632 8.46323 10.6927 8.18099 10.8365C7.86012 11 7.44008 11 6.6 11H3.4C2.55992 11 2.13988 11 1.81901 10.8365C1.53677 10.6927 1.3073 10.4632 1.16349 10.181C1 9.86012 1 9.44008 1 8.6V4C1 3.53501 1 3.30252 1.05111 3.11177C1.18981 2.59413 1.59413 2.18981 2.11177 2.05111C2.30252 2 2.53501 2 3 2M3.8 3H6.2C6.48003 3 6.62004 3 6.727 2.9455C6.82108 2.89757 6.89757 2.82108 6.9455 2.727C7 2.62004 7 2.48003 7 2.2V1.8C7 1.51997 7 1.37996 6.9455 1.273C6.89757 1.17892 6.82108 1.10243 6.727 1.0545C6.62004 1 6.48003 1 6.2 1H3.8C3.51997 1 3.37996 1 3.273 1.0545C3.17892 1.10243 3.10243 1.17892 3.0545 1.273C3 1.37996 3 1.51997 3 1.8V2.2C3 2.48003 3 2.62004 3.0545 2.727C3.10243 2.82108 3.17892 2.89757 3.273 2.9455C3.37996 3 3.51997 3 3.8 3Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >copy</span>
                  </div>
                  <div className='edit' onClick={() => handleEdit(data.id, data.name)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.02558 1.94884H3.14698C2.39546 1.94884 2.01971 1.94884 1.73267 2.09509C1.48018 2.22374 1.2749 2.42902 1.14625 2.68151C1 2.96855 1 3.3443 1 4.09582V7.85302C1 8.60454 1 8.98029 1.14625 9.26733C1.2749 9.51982 1.48018 9.7251 1.73267 9.85375C2.01971 10 2.39546 10 3.14698 10H6.90419C7.6557 10 8.03145 10 8.31849 9.85375C8.57098 9.7251 8.77626 9.51982 8.90491 9.26733C9.05116 8.98029 9.05116 8.60454 9.05116 7.85302V5.97442M3.68371 7.31628H4.43271C4.65151 7.31628 4.76092 7.31628 4.86387 7.29156C4.95515 7.26965 5.04241 7.2335 5.12245 7.18446C5.21273 7.12913 5.29009 7.05177 5.4448 6.89706L9.72209 2.61977C10.0926 2.24922 10.0926 1.64845 9.72209 1.27791C9.35155 0.907364 8.75078 0.907364 8.38023 1.27791L4.10293 5.5552C3.94821 5.70991 3.87086 5.78727 3.81553 5.87755C3.76648 5.95759 3.73034 6.04485 3.70843 6.13613C3.68371 6.23909 3.68371 6.34849 3.68371 6.56729V7.31628Z" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >edit</span>

                  </div>
                  <div className='delete' onClick={() => handleDelete(data)}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                        <path d="M8.94444 3.4V2.92C8.94444 2.24794 8.94444 1.91191 8.81123 1.65521C8.69405 1.42942 8.50708 1.24584 8.2771 1.13079C8.01565 1 7.6734 1 6.98889 1H6.01111C5.3266 1 4.98435 1 4.7229 1.13079C4.49292 1.24584 4.30595 1.42942 4.18877 1.65521C4.05556 1.91191 4.05556 2.24794 4.05556 2.92V3.4M5.27778 6.7V9.7M7.72222 6.7V9.7M1 3.4H12M10.7778 3.4V10.12C10.7778 11.1281 10.7778 11.6321 10.578 12.0172C10.4022 12.3559 10.1217 12.6312 9.77676 12.8038C9.38459 13 8.87121 13 7.84444 13H5.15556C4.12879 13 3.61541 13 3.22324 12.8038C2.87828 12.6312 2.59781 12.3559 2.42204 12.0172C2.22222 11.6321 2.22222 11.1281 2.22222 10.12V3.4" stroke="#637381" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span className={data.width < 6 ? 'hideIconText' : ''} >delete</span>

                  </div>
                </div>

                <div class="col-xs-12">
                  <div class="form-group">
                    <table class="table-matrix table">
                      <thead>
                        <tr>
                          <th>&nbsp;</th>
                          {data.options.slice(0, -1).map((lists, i) => (
                            <>
                              <th class="">{lists}</th>
                              <th class={data.options.slice(0, -1).length - 1 === i ? "lastoptionHidden" : ""} ></th>
                            </>
                          ))
                          }
                          <th class=""></th>
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
                              <td class={data.options.slice(0, -1).length - 1 === i ? "text-center lastoptionHidden" : "text-center"} title={list}>
                                <div class="input">
                                  <Form.Group style={{ width: "5vw" }}>
                                    <div class="widthDropdown">
                                      <select name="selectlist_1[]" class="form-control w-100" value={data.selectedOperatorValues[i]} onChange={(e) => handleChangeOperatorValue(e, i)}>
                                        {data.operatorValues.map((dataOptions) => {
                                          return (<>
                                            <option value={dataOptions}>{dataOptions}</option>
                                          </>)
                                        })
                                        }
                                      </select>
                                    </div>
                                  </Form.Group>
                                </div>
                              </td>
                            </>
                          ))
                          }
                          <td class="text-center">
                            <div class="input">
                              =
                            </div>
                          </td>

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

export default FormConditions