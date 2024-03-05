import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import './style.css';
import parse from 'html-react-parser';
import $ from 'jquery';

function AddForm(props) {
  const getHtml = props.getHtml;
  const getCss = props.getCss;
  const getJs = props.getJs;
  let htmlData = props.data ? parse(props.data.html.slice(1, -1)) : null;
  if (typeof htmlData != 'string' && htmlData) {
    let temp = htmlData;
    htmlData = '';
    for (let i = 0; i < temp.length; i++) {
      htmlData = htmlData + temp[i];
    }
  }
  const [html, setHtml] = useState(htmlData || null);
  const [css, setCss] = useState(props.data?.css || null);
  const [js, setJs] = useState(props.data?.javascript || null);
  const [srcDoc, setSrcDoc] = useState();

  useEffect(() => {
    props.dataSet({ html, css, js });
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <head><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script></head>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      {!props.request ? (
        <div className="pane top-pane">
          <Editor language="xml" displayName="HTML" value={html || getHtml} onChange={setHtml} />
          <Editor language="css" displayName="CSS" value={css || getCss} onChange={setCss} />
          <Editor language="javascript" displayName="JS" value={js || getJs} onChange={setJs} />
        </div>
      ) : null}
      {/* <div className="frame">
        <iframe
          id="html-form"
          className="iframe"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin allow-modals"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div> */}
    </>
  );
}

export default AddForm;
