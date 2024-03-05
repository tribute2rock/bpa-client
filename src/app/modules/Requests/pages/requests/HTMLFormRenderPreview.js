import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import InnerHTML from 'dangerously-set-html-content';

const HTMLFormRenderPreview = props => {
  const [data, setData] = useState({});
  const type = props.type || null;
  const isEdit = props.isEdit || false;
  const memoValues = props.requestValues || [];

  let formData =
    props?.formData
      .toString()
      .replace(/\\n/g, ' ')
      .replace(/\\/g, '') || '';
  if (props.printform) {
    formData = formData.replace(/col-sm-12/g, 'col-sm-6');
  }
  const cssdata = props.css || '';
  const javascript = props.javascript || '';

  useEffect(() => {
    const convertedValue = {};
    memoValues?.forEach(item => {
      convertedValue[item.name] = item.value ? JSON.parse(item.value) : null;
    });
    setData(convertedValue);
    if ('date_from' in convertedValue) {
      const validityPeriodElement = getElementByName('validity_period');
      if (validityPeriodElement) {
        if (validityPeriodElement.closest('.align-items-center')) {
          validityPeriodElement.closest('.align-items-center').style.display = 'none';
        }
      }
    } else {
      const dateFromElement = getElementByName('date_from');
      if (dateFromElement) {
        if (dateFromElement.closest('.row')) {
          dateFromElement.closest('.row').style.display = 'none';
        }
      }
      if (!('validity_period_date' in convertedValue)) {
        const element = getElementByName('validity_period_date');
        if (element) {
          if ('validity_date_type' in convertedValue) {
            element.type = 'text';
            element.value = convertedValue?.validity_date_type;
          }
        }
      }
    }

    if(('claim_validity_type') in convertedValue){
      if( convertedValue?.claim_validity_type==="Type One"){
        const claimValidityElement = getElementByName('claim_validity_period');
        if (claimValidityElement) {
          if (claimValidityElement.closest('.col-7')) {
            claimValidityElement.closest('.col-7').style.display = 'none';
          }
        }
      }
      if( convertedValue?.claim_validity_type==="Type Two"){
        const claimValidityElement = getElementByName('claim_validity');
        if (claimValidityElement) {
          if (claimValidityElement.closest('.col-5')) {
            claimValidityElement.closest('.col-5').style.display = 'none';
          }
        }
      }
    }

    if (!('expiry_date' in convertedValue)) {
      const expiryDateElement = getElementByName('expiry_date');
      if (expiryDateElement) {
        if (expiryDateElement.closest('.col-12')) {
          expiryDateElement.closest('.col-12').style.display = 'none';
        }
      }
    }

    if (!('claim_expiry_date' in convertedValue)) {
      const clainExpiryDate = getElementByName('claim_expiry_date');
      if (clainExpiryDate) {
        if (clainExpiryDate.closest('.col-12')) {
          clainExpiryDate.closest('.col-12').style.display = 'none';
        }
      }
    }

  }, [memoValues]);

  function getElementByName(elementName) {
    let elements = document.getElementsByName(elementName);
    if (elements.length > 0) {
      return elements[0];
    } else {
      return null;
    }
  }

  useEffect(() => {
    const counterGuaranteeForm = document.querySelector('.counter-guarantee-form');
    if (counterGuaranteeForm) {
      const firstChild = counterGuaranteeForm.firstElementChild;
      if (firstChild) {
        firstChild.classList.add('col-12');
      }
      if(!('favouring_ms'in data)){
         counterGuaranteeForm.style.display="none"
    }else{
      counterGuaranteeForm.removeAttribute('style')
    }
    }

    memoValues.forEach(({ name, value }) => {
      const elements = document.getElementsByName(name);
      if (elements.length !== 0) {
        elements.forEach(element => {
          const elementType = element.type;
          if (elementType === 'checkbox') {
            if (value === 'true' || value === true) {
              element.setAttribute('checked', true);
            } else {
              element.removeAttribute('checked');
              element.closest('.form-check').style.display = 'none';
            }
          } else if (elementType === 'radio') {
            if (JSON.stringify(element.value) === value || element.value === value) {
              element.setAttribute('checked', true);
            } else {
              element.closest('div').style.display = 'none';
            }
            element.style.display = 'none';
          } else if (elementType === 'file') {
            if (props.preview) {
              if (props.requestFiles && props.requestFiles[name].files.length > 0)
                if (`${name}` in props.requestFiles) {
                  let temp = name.replace('fileupload_', '');
                  if (document.getElementsByClassName(`${temp}_preview_p`).length > 0) {
                    document.getElementsByClassName(`${temp}_preview_p`)[0].textContent = document
                      .getElementById(`${temp}_preview`)
                      .getElementsByTagName('p')[0].innerHTML;
                  }
                }
            } else {
              let temp = name.replace('fileupload_', '');
              if (document.getElementsByClassName(`${temp}_preview_p`).length > 0) {
                document.getElementsByClassName(`${temp}_preview_p`)[0].textContent = JSON.parse(value).originalname;
              }
            }
          } else if (elementType === 'date') {
            if (value === '""') {
              element.closest('div').style.display = 'none';
            }
            element.setAttribute('style', ' -webkit-appearance: none;');
            element.type = 'text';
            element.value = value.replace(/"/g, '');
            element.value = new Date(element.value).toDateString().replace(/^\w+\s/, '');
          }else if(elementType === 'select-one'){
            if(props.preview){
              if (value === '""') {
                element.closest('row').style.display = 'none';
              }else if (value.startsWith('"') && value.endsWith('"')) {
                const   cleanedValue = value.substring(1, value.length - 1); // Remove surrounding quotes
                element.value = cleanedValue;
                }else{
                  element.value = value;
                }
        
            }else{
              element.value = JSON.parse(value);
              element.checked = JSON.parse(value);
            }
          
          } 
          else {
            if (props.preview) {
              element.innerText=value
              element.value = value;
              element.checked = value;
            } else {
              element.value = JSON.parse(value);
              element.checked = JSON.parse(value);
            }
          }
        });
      }
    });
  }, [memoValues, isEdit, type]);

  if (javascript && javascript.length > 0) {
    const htm = parse(formData) + javascript;
    return (
      <>
        <InnerHTML html={htm} />
      </>
    );
  } else {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: '<html><head><style>' + cssdata + '</style></head><body>' + parse(formData) + '</body> </html>'
          }}
        />
      </>
    );
  }
};

export default HTMLFormRenderPreview;
