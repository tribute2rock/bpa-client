import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import './style.css';
import parse from 'html-react-parser';

function AddForm(props) {
  const getHtml = props.getHtml;
  const htmlData = props.data ? parse(props.data.html.slice(1, -1)) : null;
  const [html, setHtml] = useState(htmlData || null);
  const [srcDoc, setSrcDoc] = useState();

  useEffect(() => {
    props.dataSet({ html });
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html]);

  return (
    <>
      <div className="pane top-pane">
        <Editor language="xml" displayName="Template" value={html || getHtml} onChange={setHtml} />
      </div>
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
