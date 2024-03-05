import React, { useState, useRef, useEffect } from 'react';
import "./formBuilder.css";
import inputTabbar from './leftTabbar';
import DraggableTemplate from './DraggableTemplate';
import FormConditions from './FormConditions';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';



function FormBuilder3({formbuilder3Data, setFormbuilder3Data, editableFormData }) {
  const [formData, setFormData] = useState([])
  const [radioCheckedForHidden, setRadioCheckedForHidden] = useState({});
  const [checkBoxCheckedForHidden, setCheckBoxCheckedForHidden] = useState([]);

  // const [{ isOver }, drop] = useDrop({
  //   accept: 'div',
  //   drop: (item) => (addItem(item)),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver()
  //   })
  // });
  const handleDrag = (results) => {
    const { destination, source, type } = results;
    if (!destination) return;
    if (source.draggableId === destination.draggableId && source.index === destination.index) return;

    if (type === 'group') {
      const reOrderedData = [...formData]
      const [removedSourceIndex] = reOrderedData.splice(source.index, 1)
      reOrderedData.splice(destination.index, 0, removedSourceIndex)
      setFormData(reOrderedData)
      setFormbuilder3Data(reOrderedData)
    }
  }

  const handleClickDraggle = (tab) => {
    const { img, topic, ...others } = tab
    if (tab.hasOwnProperty('inputName')) {
      setFormData((prev) => ([...prev, { ...others, inputName: `FieldName${formData.length}`, id: uuidv4() }]))
      setFormbuilder3Data(() => ([...formData, { ...others, inputName: `FieldName${formData.length}`, id: uuidv4() }]))
    } else {
      setFormData((prev) => ([...prev, { ...others, id: uuidv4() }]))
      setFormbuilder3Data(() => ([...formData, { ...others, id: uuidv4() }]))
    }
  }

  useEffect(() => {
    setFormData([...editableFormData])
  }, [])


  return (
    <div className='main-cointainer'>
      {/* left side of the form builder */}
      <DragDropContext onDragEnd={handleDrag}>
        <div className='left' >
          {/* drop zone without data */}
          {formData.length === 0 && <div className='dropZone'>
            <h1>Form Dropzone</h1>
          </div>}
          <div className='allForms'>
            <Droppable droppableId='ROOT' type='group'>
              {(provided) => (
                <div className='formsContainer' {...provided.droppableProps} ref={provided.innerRef}>
                  {formData.map((data, i) => (
                    <Draggable draggableId={data.id} key={data.id} index={i}>
                      {(provided) => (
                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                          <FormConditions formbuilder3Data={formbuilder3Data} setFormbuilder3Data={setFormbuilder3Data} formData={formData} setFormData={setFormData} data={data} radioCheckedForHidden={radioCheckedForHidden} setRadioCheckedForHidden={setRadioCheckedForHidden} checkBoxCheckedForHidden={checkBoxCheckedForHidden} setCheckBoxCheckedForHidden={setCheckBoxCheckedForHidden} />
                        </div>
                      )}
                    </Draggable>
                  )
                  )}
                  {provided.placeholder}
                </div>
              )}

            </Droppable>
          </div>

        </div>
      </DragDropContext>
      {/* right side of the form builder */}
      {/* for Template */}
      <div className='right'>
        <div className='rightTemplates'>
          <div className='topicName'>Templates</div>
          {inputTabbar?.filter(tab => tab.topic === "template").map((tab) => {
            return (
              <div onClick={() => handleClickDraggle(tab)} key={tab.id}>
                <DraggableTemplate tab={tab} />
              </div>
            )
          })}
        </div>
        {/* For Tool Box */}
        <div className='rightTemplates'>
          <div className='topicName'>Tool Box</div>
          {inputTabbar?.filter(tab => tab.topic === "toolbox").map((tab) => {
            return (
              <div onClick={() => handleClickDraggle(tab)} key={tab.id}>
                <DraggableTemplate tab={tab} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FormBuilder3;
