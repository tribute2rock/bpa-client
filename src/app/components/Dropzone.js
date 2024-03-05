import React from 'react';
import { useDropzone } from 'react-dropzone';

import File from './File';

const Dropzone = props => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept:
      'image/*,application/pdf,.doc,.docx,application/msword,.txt,.text,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xlsx,.xls'
  });

  props.selectFiles(acceptedFiles);

  const files = acceptedFiles.map((file, index) => (
    <File
      fileKey={`key-accepted-file-${index}`}
      toolTipId={`accepted-file-${index}`}
      fileName={file.path}
      fileFullName={file.path}
      fileType={file.type}
      fileSize={file.size}
    />
  ));

  return (
    <>
      <aside>
        <div>{files}</div>
      </aside>
      <section className="dropzone dropzone-default dropzone-primary">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps({ name: 'files' })} />
          <p className="dropzone-msg-title">Drag 'n' drop some files here, or click to select files</p>
        </div>
      </section>
    </>
  );
};

export default Dropzone;
