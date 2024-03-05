import React, { useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

const PDFPreview = props => {
  //   console.log(props, 'props');

  return (
    <div>
      <DocViewer documents={[{ uri: props.url }]} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default PDFPreview;
