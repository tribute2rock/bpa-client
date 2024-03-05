const defaultItems = [
  {
    key: 'Header',
    name: 'Header Text',
    icon: 'fa fa-heading',
    static: true,
    content: 'Placeholder Text...'
  },
  {
    key: 'Label',
    name: 'Label',
    static: true,
    icon: 'fa fa-font',
    content: 'Placeholder Text...'
  },
  {
    key: 'Paragraph',
    name: 'Paragraph',
    static: true,
    icon: 'fa fa-paragraph',
    content: 'Placeholder Text...'
  },
  {
    key: 'Dropdown',
    canHaveAnswer: true,
    name: 'Dropdown',
    icon: 'fa fa-caret-square-down',
    label: 'Placeholder Label',
    field_name: 'dropdown_',
    options: []
  },
  {
    key: 'DynamicDropdown',
    canHaveAnswer: true,
    name: 'Dynamic Dropdown',
    icon: 'far fa-caret-square-down',
    label: 'Placeholder Label',
    field_name: 'dynamic_dropdown_'
  },
  {
    key: 'Checkboxes',
    canHaveAnswer: true,
    name: 'Checkboxes',
    icon: 'fa fa-check-square',
    label: 'Placeholder Label',
    field_name: 'checkboxes_',
    options: []
  },
  {
    key: 'RadioButtons',
    canHaveAnswer: true,
    name: 'Multiple Choice',
    icon: 'fa fa-dot-circle',
    label: 'Placeholder Label',
    field_name: 'radiobuttons_',
    options: []
  },
  {
    key: 'TextInput',
    canHaveAnswer: true,
    name: 'Text Input',
    label: 'Placeholder Label',
    icon: 'fa fa-font',
    field_name: 'text_input_'
  },
  {
    key: 'PrefixedTextInput',
    canHaveAnswer: true,
    name: 'Prefixed Text Input',
    label: 'Placeholder Label',
    icon: 'fas fa-font',
    field_name: 'text_input_',
    shouldBeValidated: true,
    prefix: ''
  },
  {
    key: 'AutoPopulate',
    canHaveAnswer: true,
    name: 'Auto Populate',
    label: 'Placeholder Label',
    icon: 'fas fa-font',
    field_name: 'auto_populate_',
    canBeRequired: false,
    canHavePageBreakBefore: false,
    canEditFieldName: false
  },
  {
    key: 'NumberInput',
    canHaveAnswer: true,
    name: 'Number Input',
    label: 'Placeholder Label',
    icon: 'fa fa-plus',
    field_name: 'number_input_'
  },
  {
    key: 'TextArea',
    canHaveAnswer: true,
    name: 'Multi-line Input',
    label: 'Placeholder Label',
    icon: 'fa fa-text-height',
    field_name: 'text_area_'
  },
  {
    key: 'TwoColumnRow',
    canHaveAnswer: false,
    name: 'Two Column Row',
    label: '',
    icon: 'fas fa-columns',
    field_name: 'two_col_row_'
  },
  {
    key: 'ThreeColumnRow',
    canHaveAnswer: false,
    name: 'Three Column Row',
    label: '',
    icon: 'fas fa-columns',
    field_name: 'three_col_row_'
  },
  {
    key: 'FourColumnRow',
    canHaveAnswer: false,
    name: 'Four Column Row',
    label: '',
    icon: 'fas fa-columns',
    field_name: 'four_col_row_'
  },
  {
    key: 'DatePicker',
    canDefaultToday: true,
    canReadOnly: true,
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    showTimeSelect: false,
    showTimeSelectOnly: false,
    name: 'Date',
    icon: 'fa fa-calendar',
    label: 'Placeholder Label',
    field_name: 'date_picker_'
  },
  {
    key: 'Download',
    name: 'File Attachment',
    icon: 'fa fa-file',
    static: true,
    content: 'Placeholder file name ...',
    field_name: 'download_',
    file_path: '',
    _href: ''
  }
  // {
  //   key: 'Camera',
  //   name: 'Camera',
  //   icon: 'fa fa-camera',
  //   label: 'Placeholder Label',
  //   field_name: 'camera_'
  // },
  // {
  //   key: 'Table',
  //   name: 'Table',
  //   icon: 'fa fa-table',
  //   field_name: 'table_',
  //   label: 'Placceholder Label',
  //   options: [],
  //   rows: []
  // }
];

const customItemKeys = [
  'Header',
  // 'Label',
  'Paragraph',
  // 'LineBreak',
  'Dropdown',
  'DynamicDropdown',
  // 'Tags',
  'Checkboxes',
  'RadioButtons',
  'TextInput',
  'PrefixedTextInput',
  'AutoPopulate',
  'NumberInput',
  'TextArea',
  'TwoColumnRow',
  'ThreeColumnRow',
  'FourColumnRow',
  'DatePicker'
  // 'HyperLink',
  // 'Table'
];

const customItems = defaultItems.filter(item => (customItemKeys.includes(item.key) ? 1 : 0));

export default customItems;
