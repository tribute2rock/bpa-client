import { Card } from 'react-bootstrap';
import fileIcon from '../../util/icons';
import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PDFPreview from './PDFPreview/PDFPreview';

const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes';
  let k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const File1 = props => {
  const { className } = props;
  // Modal open state
  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  const [geturl, setUrl] = useState();

  const handleFilePreview = e => {
    e.preventDefault();

    let baseURL = process.env.REACT_APP_SERVER_URL;
    let url;

    if (props.fileRedirectUrl) {
      url = props.fileRedirectUrl;
    } else {
      url = baseURL + '/customer-uploads/:id/:type/:filename';
      url = url.replace(':filename', props.fileUrlName);
      url = url.replace(':type', props.fileDest);
      url = url.replace(':id', props.fileUrlId);
    }
    if (e.target.name == 'preview') {
      setUrl(url);
      setModal(!modal);
      return;
    } else if (e.target.name == 'download') {
      window.open(url, '_blank');
      return;
    } else {
      return;
    }
  };

  return (
    <>
      <div className="col-6">
        <Card className="mb-2">
          <Card.Body className="p-2">
            <div className="d-block clearfix w-100">
              <img className="float-left mr-3 mb-2" src={fileIcon(props.fileType)} alt="" height="70px" />
              <div>
                {props.fileUrlName} <small>({formatBytes(props.fileSize)})</small>
                <hr className="m-0 mt-2" />
                <button
                  className="btn btn-sm p-2 pt-1 pb-1"
                  size="sm"
                  name="preview"
                  onClick={props.fileUrlId ? handleFilePreview : null}
                >
                  Preview
                </button>
                <button
                  className="btn btn-sm p-2 pt-1 pb-1"
                  size="sm"
                  name="download"
                  onClick={props.fileUrlId ? handleFilePreview : null}
                >
                  Download
                </button>
                <Modal
                  className="preview-modal"
                  size="lg"
                  isOpen={modal}
                  toggle={toggle}
                  modalTransition={{ timeout: 2000 }}
                >
                  {/* <ModalHeader toggle={toggle}>{props.fileUrlName}</ModalHeader> */}
                  <ModalBody>
                    {/* <img className="img-fluid" src={geturl ? geturl : null} /> */}
                    <PDFPreview url={geturl ? geturl : null} />;
                  </ModalBody>
                </Modal>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default File1;
