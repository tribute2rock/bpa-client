import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import PreviewFormConditions from './PreviewFormConditions';

function PreviewModal({ modalPreviewSwitch, setModalPreviewSwitch, formbuilder3Data, setFormbuilder3Data }) {
  const [formData, setFormData] = useState([])
  const [radioCheckedForHidden, setRadioCheckedForHidden] = useState({});
  const [checkBoxCheckedForHidden, setCheckBoxCheckedForHidden] = useState([]);

  useEffect(() => {
    setFormData(formbuilder3Data)
    setRadioCheckedForHidden({})
    setCheckBoxCheckedForHidden([])
  }, [modalPreviewSwitch])

  return (
    <>
      <Modal
        show={modalPreviewSwitch}
        onHide={() => setModalPreviewSwitch(false)}
        aria-labelledby="example-custom-modal-styling-title"
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Preview Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='formsContainer'>
            {formbuilder3Data.filter(item => item.name !== 'Section').map((data) => {
              return <PreviewFormConditions setFormbuilder3Data={setFormbuilder3Data} formData={formData} setFormData={setFormData} data={data} radioCheckedForHidden={radioCheckedForHidden} setRadioCheckedForHidden={setRadioCheckedForHidden} checkBoxCheckedForHidden={checkBoxCheckedForHidden} setCheckBoxCheckedForHidden={setCheckBoxCheckedForHidden} />
            })
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PreviewModal;