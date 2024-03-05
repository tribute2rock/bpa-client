const availableValidationRules = [
  {
    key: 'required',
  },
  {
    key: 'email',
    onlyOn: 'TextInput',
  },
  {
    key: 'account_number',
    title: 'Account Number',
    onlyOn: ['TextInput', 'NumberInput'],
  },
  {
    key: 'min',
    hasConstraint: true,
    constraint: 'number',
    description: 'Minimum range a number can be.',
    onlyOn: 'NumberInput',
  },
  {
    key: 'max',
    hasConstraint: true,
    constraint: 'number',
    description: 'Maximum range a number can be.',
    onlyOn: 'NumberInput',
  },
  {
    key: 'in',
    hasConstraint: true,
    description: 'A list of allowed values in comma separated list.',
    onlyOn: ['TextInput', 'NumberInput'],
  },
  {
    key: 'mime type',
    hasConstraint: true,
    description: 'A list of allowed mimetype in comma separated list.',
    onlyOn: 'FileUpload',
  },
  {
    key: 'max file size',
    hasConstraint: true,
    constraint: 'number',
    description: 'The maximum size of file that can be uploaded in KB.',
    onlyOn: 'FileUpload',
  },
  {
    key: 'in options api',
    hasConstraint: true,
    description: 'The api used for dynamic dropdown.',
    onlyOn: 'DynamicDropdown',
  },
];

export default availableValidationRules;
