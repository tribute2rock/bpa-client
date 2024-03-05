import React, { useEffect } from 'react';
import { ADMIN_USER, CLIENT_USER } from '../../../../config/values';
import $ from 'jquery';
import parse from 'html-react-parser';
import InnerHTML from 'dangerously-set-html-content';

const HTMLFormRender = props => {
  const type = props.type || null;
  const isEdit = props.isEdit || false;
  const memoValues = props.requestValues || [];
  const formData =
    props.formData
      .toString()
      // .replace(/&lt;/g, '<')
      .replace(/\\n/g, ' ')
      .replace(/\\/g, '') || '';
  const cssdata = props.css || '';
  const javascript = props.javascript || '';
  useEffect(() => {
    switch (type) {
      case ADMIN_USER:
        break;
        case CLIENT_USER:
        const el = document.getElementById('bank-segment');
        if (el) el.parentNode.removeChild(el);
        break;
        default:
          break;
    }
    memoValues.forEach(({ name, value }) => {
      const elements = document.getElementsByName(name);
      if (elements.length !== 0) {
        elements.forEach(element => {
          // element.value = JSON.parse(value);
          // element.checked = JSON.parse(value);
          switch (element.type) {
            case 'checkbox':
              if (value === 'true') {
                element.setAttribute('checked', true);
              } else {
                element.removeAttribute('checked');
              }
              break;
              case 'radio':
              if (JSON.stringify(element.value) === value) {
                element.setAttribute('checked', true);
              } else {
                // element.setAttribute('checked', false);
              }
              break;
              default:
              element.value = JSON.parse(value);
            }
        });
      }
    });

    // if (javascript !== null) {
      //   window.$ = $;
      // }
      // var script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.text = javascript;
      // document.head.appendChild(script);
      
      // var css = document.createElement("css");
      // //css.type = "text/javascript";
      // css.text = cssdata;
      // document.head.appendChild(css);
    }, [memoValues, isEdit, type]);
    console.log(javascript)
    return (
      <>
    <InnerHTML html={parse(formData)+javascript+cssdata}/>
      {/* <div
        dangerouslySetInnerHTML={{
          __html: parse(formData)
        }}
      /> */}
      {/* <div
        dangerouslySetInnerHTML={{
          __html: '<style>' + cssdata + '</style>'
        }}
      /> */}
    </>
  );
};

export default HTMLFormRender;
