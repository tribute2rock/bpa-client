import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import InnerHTML from 'dangerously-set-html-content';

const HTMLFormRender = props => {
  const type = props.type || null;
  const isEdit = props.isEdit || false;
  const memoValues = props.requestValues || [];
  let formData =
    props.formData
      .toString()
      .replace(/\\n/g, ' ')
      .replace(/\\/g, '') || '';
  if (props.printform) {
    formData = formData.replace(/col-sm-12/g, 'col-sm-6');
  }
  const cssdata = props.css || '';
  const javascript = props.javascript || '';

  useEffect(() => {
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
            }
          } else if (elementType === 'radio') {
            if (JSON.stringify(element.value) === value || element.value === value) {
              element.setAttribute('checked', true);
            } else {
              // element.setAttribute('checked', false);
            }
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
          } else {
            if (props.preview) {
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

export default HTMLFormRender;
