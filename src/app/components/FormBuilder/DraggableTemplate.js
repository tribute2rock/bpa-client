import React from 'react'
import parse from 'html-react-parser';
import { useDrag, useDrop } from 'react-dnd';


function DraggableTemplate({ tab }) {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'div',
      id: tab.id,
      name: tab.name,
      width: 6
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });


  return (
    <>
      <div
        className={isDragging ? 'formInsertion lowOpacity' : 'formInsertion'}
        key={tab.id}
        ref={drag}
      >
        <div className='formData'>
          <div className='inputLogo'>
            {parse(tab.img)}
          </div>
          <div className='inputName'></div>
          {tab.name}
        </div>
      </div>
    </>
  )
}

export default DraggableTemplate