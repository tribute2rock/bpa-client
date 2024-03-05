const editableFields = [
  {
    id: 1,
    name: 'Input Type',
    placeholder: 'Enter input type...',
    options: ['Text', 'Email', 'Password', 'AccountNumber'],
    type: 'inputType'
  },
  {
    id: 2,
    name: 'Input Name',
    placeholder: 'Enter input name...',
    type: 'inputName'

  },
  {
    id: 3,
    name: 'Place Holder',
    placeholder: 'Enter placeholder...',
    type: 'placeHolder'

  },
  {
    id: 4,
    name: 'Min-Length',
    placeholder: 'Enter minimum length...',
    type: 'minLength'

  },
  {
    id: 5,
    name: 'Max-Length',
    type: 'maxLength',
    placeholder: 'Enter maximum length...'
  },
  {
    id: 7,
    name: 'Help Text',
    type: 'helpText',
    placeholder: 'Enter help text...'
  },
  {
    id: 8,
    name: 'Border Radius',
    type: 'borderRadius',
    placeholder: 'Enter border radius...'
  },
  {
    id: 9,
    name: 'Label Text Color',
    type: 'labelTextColor',
    placeholder: 'Enter label text color...'
  },
  {
    id: 10,
    name: 'Label Text Name',
    type: 'labelTextName',
    placeholder: 'Enter label text name...'
  },
  {
    id: 11,
    name: 'Label Position',
    type: 'labelPosition',
    placeholder: 'Enter label position...',
    options: ['Top', 'Inline']
  },
  {
    id: 12,
    name: 'Label Font Size',
    type: 'labelFontSize',
    placeholder: 'Enter label font size...'
  },
  {
    id: 13,
    name: 'Required',
    type: 'required',
    placeholder: 'Enter required...'
  },
  {
    id: 14,
    name: 'Readonly',
    type: 'readOnly',
    placeholder: 'Enter readonly...'
  },
  {
    id: 15,
    name: 'Disabled',
    type: 'disabled',
    placeholder: 'Enter disabled...'
  },
  {
    id: 16,
    name: 'Multiple',
    type: 'multiple',
    placeholder: 'Enter multiple...'
  },
  {
    id: 17,
    name: 'Class',
    type: 'class',
    placeholder: 'Enter class...'
  },
  {
    id: 18,
    name: 'Options',
    type: 'options',
    placeholder: 'Enter options...'
  },
  {
    id: 19,
    name: 'Min Date',
    type: 'minDate',
    placeholder: 'Enter minimum date...'
  },
  {
    id: 20,
    name: 'Max Date',
    type: 'maxDate',
    placeholder: 'Enter maximum date...'
  },
  {
    id: 21,
    name: 'Default',
    type: 'default',
    placeholder: 'Enter default value...'
  },
  {
    id: 22,
    name: 'Pattern',
    type: 'pattern',
    placeholder: 'Enter pattern...'
  },
  {
    id: 23,
    name: 'Predefined Value',
    type: 'predefinedValue',
    placeholder: 'Enter predefined value...'
  },
  {
    id: 24,
    name: 'Width',
    type: 'width',
    placeholder: 'Enter width...',
    options: [12, 6, 3, 1],
  },
  {
    id: 25,
    name: 'Height',
    type: 'height',
    placeholder: 'Enter height...'
  },
  {
    id: 26,
    name: 'Background-Color',
    type: 'backgroundColor',
    placeholder: 'Enter Background-Color...'
  },
  {
    id: 27,
    name: 'Font Size',
    type: 'fontSize',
    placeholder: 'Enter Font Size...'
  },
  {
    id: 28,
    name: 'Text Color',
    type: 'textColor',
    placeholder: 'Enter Text Color...'
  },
  {
    id: 29,
    name: 'Text',
    type: 'text',
    placeholder: 'Enter Text...'
  },
  {
    id: 30,
    name: 'Padding',
    type: 'padding',
    placeholder: 'Enter padding...'
  },
  {
    id: 31,
    name: 'Text Align',
    type: 'textAlign',
    placeholder: 'Left',
    options: ['left', 'right', 'center']

  },
  {
    id: 32,
    name: 'Hidden',
    type: 'hidden',

  },
  {
    id: 33,
    name: 'Gradient Color',
    color1Type: 'color1',
    color2Type: 'color2',
    colorPositionType: 'colorPosition',
  },
  {
    id: 34,
    name: 'Link',
    type: 'link',
    placeholder: 'Enter your link...'
  },
  {
    id: 35,
    name: 'Selection',
    type: 'selection',
    options: ['API', 'Static Values']
  },
  {
    id: 36,
    name: 'Api Choosen',
    type: 'apichoosen',
    options: []
  }
];


const editableDataValue = [{
  id: 1,
  topic: 'Section',
  value: [
    17, 24, 25, 26, 32, 33
  ]
},
{
  id: 2,
  topic: 'Spacer',
  value: [
    17, 24, 25, 26, 32
  ]
},
{
  id: 3,
  topic: 'Heading',
  value: [
    28, 27, 26, 29, 30, 31, 8, 24, 32, 17, 33
  ]
},
{
  id: 4,
  topic: 'Short Text',
  value: [
    1, 24, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 17, 22, 23, 28, 13, 14, 15, 32, 35
  ]
},
{
  id: 5,
  topic: 'Long Text',
  value: [
    1, 24, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 17, 22, 23, 28, 13, 14, 15, 32, 35
  ]
},
{
  id: 6,
  topic: 'Date',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 19, 20, 21, 22, 23, 26, 28, 13, 14, 15, 32
  ]
},
{
  id: 7,
  topic: 'Number',
  value: [
    1, 24, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 17, 22, 23, 28, 13, 14, 15, 32, 35
  ]
},
{
  id: 8,
  topic: 'Dropdown',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32, 35
  ]
},
{
  id: 9,
  topic: 'Dynamic Dropdown',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 10,
  topic: 'Checkbox',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 11,
  topic: 'Checkbox List',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 12,
  topic: 'Radio Button',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 13,
  topic: 'Multiple Choices',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]

},
{
  id: 14,
  topic: 'File uploader',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 15,
  topic: 'Signature',
  value: [
    1, 24, 2, 7, 8, 9, 10, 11, 12, 17, 18, 13, 14, 15, 32
  ]
},
{
  id: 16,
  topic: 'Paragraph',
  value: [
    28, 27, 26, 29, 30, 31, 8, 24, 32, 17, 33
  ]
},
{
  id: 17,
  topic: 'Link',
  value: [
    8, 17, 24, 26, 27, 28, 29, 30, 31, 32, 34
  ]
},
{
  id: 18,
  topic: 'Matrix',
  value: [
    24, 2, 7, 9, 10, 12, 17, 28, 13, 14, 15, 32, 18
  ]
},
{
  id: 19,
  topic: 'Basic Operator',
  value: [
    24, 2, 7, 9, 10, 12, 17, 28, 13, 14, 15, 32, 18
  ]
}
]

export const filteredEditableInput = (fieldsName) => {
  const inputField = editableDataValue.find(fieldData => fieldData.topic === fieldsName).value;
  const filteredInputs = inputField.map(data => (
    editableFields.find(fields => data === fields.id)
  ))

  return filteredInputs;

}


export default editableDataValue;