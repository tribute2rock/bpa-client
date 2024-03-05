const inputTabbar = [{
  id: 1,
  topic: 'template',
  name: 'Section',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#DDF5FF" />
  <path d="M8 13.5H17.3333M8 9H22M8 18H22" stroke="#97E0FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
  class: '',
  width: '12',
  height: '3',
  backgroundColor: 'rgba(160,160,160,0.3)',
  containerCssClass: '',
  textAlign: 'center',
  borderRadius: 0,
  hidden: false,
  color1: '',
  color2: '',
  colorPosition: 'to right'
},
{
  id: 2,
  topic: 'template',
  name: 'Spacer',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#C4F8F1"/>
  <path d="M11 16.9375L15 21L19 16.9375" fill="#C4F8F1"/>
  <path d="M11 12.0625L15 8L19 12.0625" fill="#C4F8F1"/>
  <path d="M11 16.9375L15 21L19 16.9375M11 12.0625L15 8L19 12.0625" stroke="#219688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  class: '',
  height: '65',
  containerCssClass: '',
  width: '12',
  hidden: false

},
{
  id: 3,
  topic: 'template',
  name: 'Heading',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#DE6666" fill-opacity="0.18"/>
  <path d="M9 10.25C9 9.55109 9 9.20163 9.11418 8.92597C9.26642 8.55843 9.55843 8.26642 9.92597 8.11418C10.2016 8 10.5511 8 11.25 8H18.75C19.4489 8 19.7984 8 20.074 8.11418C20.4416 8.26642 20.7336 8.55843 20.8858 8.92597C21 9.20163 21 9.55109 21 10.25M12 20H18M13.6875 8V20M16.3125 8V20" stroke="#DE6666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  textColor: "initial",
  fontSize: 22,
  backgroundColor: "initial",
  text: "Heading 1",
  textAlign: "left",
  padding: 0,
  width: '12',
  borderRadius: 0,
  hidden: false,
  class: '',
  color1: '',
  color2: '',
  colorPosition: 'to right',
},
{
  id: 4,
  topic: 'toolbox',
  name: 'Short Text',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#FFEDD5"/>
  <path d="M8 11.7083C8 11.5205 8.07463 11.3403 8.20747 11.2075C8.3403 11.0746 8.52047 11 8.70833 11H14.375C14.5629 11 14.743 11.0746 14.8759 11.2075C15.0087 11.3403 15.0833 11.5205 15.0833 11.7083V12.3154C15.0833 12.5032 15.0087 12.6834 14.8759 12.8162C14.743 12.9491 14.5629 13.0237 14.375 13.0237H8.70833C8.52047 13.0237 8.3403 12.9491 8.20747 12.8162C8.07463 12.6834 8 12.5032 8 12.3154V11.7083ZM17.107 11.7083C17.107 11.5205 17.1817 11.3403 17.3145 11.2075C17.4473 11.0746 17.6275 11 17.8154 11H21.4583C21.6462 11 21.8264 11.0746 21.9592 11.2075C22.092 11.3403 22.1667 11.5205 22.1667 11.7083V12.3154C22.1667 12.5032 22.092 12.6834 21.9592 12.8162C21.8264 12.9491 21.6462 13.0237 21.4583 13.0237H17.8154C17.6275 13.0237 17.4473 12.9491 17.3145 12.8162C17.1817 12.6834 17.107 12.5032 17.107 12.3154V11.7083ZM8 15.7558C8 15.5679 8.07463 15.3877 8.20747 15.2549C8.3403 15.122 8.52047 15.0474 8.70833 15.0474H10.3276C10.5154 15.0474 10.6956 15.122 10.8285 15.2549C10.9613 15.3877 11.0359 15.5679 11.0359 15.7558V16.3628C11.0359 16.5507 10.9613 16.7308 10.8285 16.8637C10.6956 16.9965 10.5154 17.0711 10.3276 17.0711H8.70833C8.52047 17.0711 8.3403 16.9965 8.20747 16.8637C8.07463 16.7308 8 16.5507 8 16.3628V15.7558ZM13.0596 15.7558C13.0596 15.5679 13.1343 15.3877 13.2671 15.2549C13.3999 15.122 13.5801 15.0474 13.768 15.0474H21.4583C21.8493 15.0474 22.1787 15.374 22.0448 15.7416C21.9024 16.1314 21.6435 16.4681 21.3033 16.7059C20.9631 16.9437 20.558 17.0712 20.143 17.0711H13.768C13.5801 17.0711 13.3999 16.9965 13.2671 16.8637C13.1343 16.7308 13.0596 16.5507 13.0596 16.3628V15.7558Z" fill="#FFBB2C"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  placeHolder: 'Placeholder',
  minLength: 0,
  maxLength: 100,
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  pattern: '',
  predefinedValue: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(50)",
  selection: "Static Values",
  apiSelection: "",
  apiValue: ""
},
{
  id: 5,
  topic: 'toolbox',
  name: 'Long Text',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#FFE1E8"/>
  <path d="M15.4057 17.7486C15.4057 17.5849 15.474 17.4279 15.5955 17.3122C15.717 17.1965 15.8819 17.1315 16.0537 17.1315H20.3116C20.6693 17.1315 20.9706 17.4153 20.85 17.7362C20.7228 18.0797 20.487 18.3772 20.1752 18.588C19.8634 18.7988 19.4907 18.9126 19.1083 18.9137H16.0537C15.8819 18.9137 15.717 18.8487 15.5955 18.733C15.474 18.6172 15.4057 18.4603 15.4057 18.2966V17.7486ZM8 17.7486C8 17.5849 8.06827 17.4279 8.18979 17.3122C8.31131 17.1965 8.47612 17.1315 8.64798 17.1315H12.9058C13.0777 17.1315 13.2425 17.1965 13.364 17.3122C13.4855 17.4279 13.5538 17.5849 13.5538 17.7486V18.2966C13.5538 18.4603 13.4855 18.6172 13.364 18.733C13.2425 18.8487 13.0777 18.9137 12.9058 18.9137H8.64798C8.47612 18.9137 8.31131 18.8487 8.18979 18.733C8.06827 18.6172 8 18.4603 8 18.2966V17.7486ZM12.6285 14.1829C12.6285 14.0192 12.6968 13.8622 12.8183 13.7465C12.9398 13.6307 13.1046 13.5657 13.2765 13.5657H20.3116C20.4834 13.5657 20.6483 13.6307 20.7698 13.7465C20.8913 13.8622 20.9596 14.0192 20.9596 14.1829V14.7315C20.9596 14.8951 20.8913 15.0521 20.7698 15.1678C20.6483 15.2836 20.4834 15.3486 20.3116 15.3486H13.2765C13.1046 15.3486 12.9398 15.2836 12.8183 15.1678C12.6968 15.0521 12.6285 14.8951 12.6285 14.7315V14.1829ZM8 14.1829C8 14.0192 8.06827 13.8622 8.18979 13.7465C8.31131 13.6307 8.47612 13.5657 8.64798 13.5657H10.1293C10.3011 13.5657 10.4659 13.6307 10.5874 13.7465C10.709 13.8622 10.7772 14.0192 10.7772 14.1829V14.7315C10.7772 14.8951 10.709 15.0521 10.5874 15.1678C10.4659 15.2836 10.3011 15.3486 10.1293 15.3486H8.64798C8.47612 15.3486 8.31131 15.2836 8.18979 15.1678C8.06827 15.0521 8 14.8951 8 14.7315V14.1829ZM17.257 10.6171C17.257 10.4535 17.3253 10.2965 17.4468 10.1808C17.5683 10.065 17.7331 10 17.905 10H20.3116C20.4834 10 20.6483 10.065 20.7698 10.1808C20.8913 10.2965 20.9596 10.4535 20.9596 10.6171V11.1657C20.9596 11.3294 20.8913 11.4864 20.7698 11.6021C20.6483 11.7178 20.4834 11.7829 20.3116 11.7829H17.905C17.7331 11.7829 17.5683 11.7178 17.4468 11.6021C17.3253 11.4864 17.257 11.3294 17.257 11.1657V10.6171ZM8 10.6171C8 10.4535 8.06827 10.2965 8.18979 10.1808C8.31131 10.065 8.47612 10 8.64798 10H14.7578C14.9296 10 15.0944 10.065 15.216 10.1808C15.3375 10.2965 15.4057 10.4535 15.4057 10.6171V11.1657C15.4057 11.3294 15.3375 11.4864 15.216 11.6021C15.0944 11.7178 14.9296 11.7829 14.7578 11.7829H8.64798C8.47612 11.7829 8.31131 11.7178 8.18979 11.6021C8.06827 11.4864 8 11.3294 8 11.1657V10.6171Z" fill="#D34053"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  placeHolder: 'Placeholder',
  minLength: 0,
  maxLength: 500,
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  pattern: '',
  predefinedValue: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(200)",
  selection: "Static Values",
  apiSelection: "",
  apiValue: ""

},
{
  id: 6,
  topic: 'toolbox',
  name: 'Date',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#FFE1E8"/>
  <path d="M12 15.5L13.5 17L18.5 12" stroke="#FD2254" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 14.5V18C19 18.2652 18.8946 18.5196 18.7071 18.7071C18.5196 18.8946 18.2652 19 18 19H11C10.7348 19 10.4804 18.8946 10.2929 18.7071C10.1054 18.5196 10 18.2652 10 18V11C10 10.7348 10.1054 10.4804 10.2929 10.2929C10.4804 10.1054 10.7348 10 11 10H16.5" stroke="#FD2254" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  inputType: 'date',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  minDate: '',
  maxDate: '',
  default: '',
  pattern: '',
  predefinedValue: '',
  backgroundColor: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(50)"

},
{
  id: 7,
  topic: 'toolbox',
  name: 'Number',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#ECF1FD"/>
  <path d="M10 11.75H20M10 15.5H20M13.75 8L12.5 19.25M17.5 8L16.25 19.25" stroke="#6F87BF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  placeHolder: 'Placeholder',
  minLength: 0,
  maxLength: 500,
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  pattern: '',
  predefinedValue: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(50)",
  selection: "Static Values",
  apiSelection: "",
  apiValue: ""

},
{
  id: 8,
  topic: 'toolbox',
  name: 'Dropdown',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#FEF08A" fill-opacity="0.21"/>
  <path d="M14.75 7L11 12.25H18.5L14.75 7ZM14.75 20.5L18.5 15.25H11L14.75 20.5Z" fill="#FFEA4D"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['first choice', 'second choice', 'third choice'],
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(50)",
  selection: "Static Values",
  apiSelection: "",
  apiDisplayName: "",
  apiValue: ""
},
{
  id: 9,
  topic: 'toolbox',
  name: 'Dynamic Dropdown',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#9A9A9A" fill-opacity="0.2"/>
  <path d="M14.75 7L11 12.25H18.5L14.75 7ZM14.75 20.5L18.5 15.25H11L14.75 20.5Z" fill="#011627"/>
</svg>`,
  width: '12',
  class: ''

},
{
  id: 10,
  topic: 'toolbox',
  name: 'Checkbox',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#FFE1E8"/>
  <path d="M13 13L14.5 14.5L19.5 9.5" stroke="#FD2254" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13.5V17C19 17.2652 18.8946 17.5196 18.7071 17.7071C18.5196 17.8946 18.2652 18 18 18H11C10.7348 18 10.4804 17.8946 10.2929 17.7071C10.1054 17.5196 10 17.2652 10 17V10C10 9.73478 10.1054 9.48043 10.2929 9.29289C10.4804 9.10536 10.7348 9 11 9H16.5" stroke="#FD2254" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['first choice', 'second choice', 'third choice'],
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  class: '',
  fieldstype: "VARCHAR(50)"


},
{
  id: 11,
  topic: 'toolbox',
  name: 'Checkbox List',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#F78C6C" fill-opacity="0.27"/>
  <path d="M13 13L14.5 14.5L19.5 9.5" stroke="#F78C6C" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 13L13 14.5L18 9.5" stroke="#F78C6C" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13.5V17C19 17.2652 18.8946 17.5196 18.7071 17.7071C18.5196 17.8946 18.2652 18 18 18H11C10.7348 18 10.4804 17.8946 10.2929 17.7071C10.1054 17.5196 10 17.2652 10 17V10C10 9.73478 10.1054 9.48043 10.2929 9.29289C10.4804 9.10536 10.7348 9 11 9H16.5" stroke="#F78C6C" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['first choice', 'second choice', 'third choice'],
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  checkedField: [],

},
{
  id: 12,
  topic: 'toolbox',
  name: 'Radio Button',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#C1FFE2"/>
  <path d="M14.5957 6C10.408 6 7 9.40796 7 13.5957C7 17.7835 10.408 21.1915 14.5957 21.1915C18.7835 21.1915 22.1915 17.7835 22.1915 13.5957C22.1915 9.40796 18.7835 6 14.5957 6ZM14.5957 19.0216C13.1572 19.0201 11.778 18.4479 10.7608 17.4307C9.74357 16.4135 9.17141 15.0343 9.16985 13.5957C9.17141 12.1572 9.74357 10.778 10.7608 9.76079C11.778 8.74357 13.1572 8.17141 14.5957 8.16985C16.0343 8.17141 17.4135 8.74357 18.4307 9.76079C19.4479 10.778 20.0201 12.1572 20.0216 13.5957C20.0201 15.0343 19.4479 16.4135 18.4307 17.4307C17.4135 18.4479 16.0343 19.0201 14.5957 19.0216Z" fill="#4BDE97"/>
  <path d="M14.5 10C12.6013 10 11 11.6013 11 13.5C11 15.3988 12.6013 17 14.5 17C16.3988 17 18 15.3988 18 13.5C18 11.6013 16.3988 10 14.5 10Z" fill="#4BDE97"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['first choice', 'second choice', 'third choice'],
  required: false,
  readOnly: false,
  disabled: false,
  checkedField: '',
  hidden: false,
  fieldstype: "VARCHAR(50)"


},
{
  id: 13,
  topic: 'toolbox',
  name: 'Multiple Choices',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#F2F4F3"/>
  <path d="M17.3846 10H11.8462C10.5609 10 9.32824 10.4376 8.41941 11.2166C7.51058 11.9956 7 13.0522 7 14.1538C7 15.2555 7.51058 16.3121 8.41941 17.0911C9.32824 17.8701 10.5609 18.3077 11.8462 18.3077H17.3846C18.021 18.3077 18.6512 18.2003 19.2392 17.9915C19.8271 17.7827 20.3614 17.4768 20.8114 17.0911C21.2614 16.7053 21.6183 16.2474 21.8619 15.7435C22.1054 15.2395 22.2308 14.6993 22.2308 14.1538C22.2308 13.6084 22.1054 13.0682 21.8619 12.5642C21.6183 12.0603 21.2614 11.6024 20.8114 11.2166C20.3614 10.8309 19.8271 10.5249 19.2392 10.3162C18.6512 10.1074 18.021 10 17.3846 10Z" stroke="#CFB9B9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M18.077 15.5383C18.4442 15.5383 18.7964 15.3924 19.0561 15.1327C19.3157 14.8731 19.4616 14.5209 19.4616 14.1537C19.4616 13.7864 19.3157 13.4343 19.0561 13.1746C18.7964 12.9149 18.4442 12.769 18.077 12.769C17.7098 12.769 17.3576 12.9149 17.0979 13.1746C16.8383 13.4343 16.6924 13.7864 16.6924 14.1537C16.6924 14.5209 16.8383 14.8731 17.0979 15.1327C17.3576 15.3924 17.7098 15.5383 18.077 15.5383Z" stroke="#CFB9B9" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.1537 15.5383C11.5209 15.5383 11.8731 15.3924 12.1327 15.1327C12.3924 14.8731 12.5383 14.5209 12.5383 14.1537C12.5383 13.7864 12.3924 13.4343 12.1327 13.1746C11.8731 12.9149 11.5209 12.769 11.1537 12.769C10.7864 12.769 10.4343 12.9149 10.1746 13.1746C9.91492 13.4343 9.76904 13.7864 9.76904 14.1537C9.76904 14.5209 9.91492 14.8731 10.1746 15.1327C10.4343 15.3924 10.7864 15.5383 11.1537 15.5383Z" stroke="#CFB9B9" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['first choice', 'second choice', 'third choice'],
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false

},
{
  id: 14,
  topic: 'toolbox',
  name: 'File uploader',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#DDD6FE"/>
  <path d="M19.7192 13.8311L15.1242 18.4261C14.5612 18.989 13.7978 19.3053 13.0017 19.3053C12.2056 19.3053 11.4421 18.989 10.8792 18.4261C10.3162 17.8632 10 17.0997 10 16.3036C10 15.5075 10.3162 14.744 10.8792 14.1811L15.4742 9.58611C15.8494 9.21083 16.3584 9 16.8892 9C17.4199 9 17.9289 9.21083 18.3042 9.58611C18.6795 9.96139 18.8903 10.4704 18.8903 11.0011C18.8903 11.5318 18.6795 12.0408 18.3042 12.4161L13.7042 17.0111C13.5165 17.1988 13.262 17.3042 12.9967 17.3042C12.7313 17.3042 12.4768 17.1988 12.2892 17.0111C12.1015 16.8235 11.9961 16.569 11.9961 16.3036C11.9961 16.0382 12.1015 15.7838 12.2892 15.5961L16.5342 11.3561" stroke="#9882FF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  inputType: 'text',
  inputName: 'inputName',
  containerCssClass: '',
  helpText: '',
  borderRadius: 0,
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelPosition: "Top",
  labelFontSize: 14,
  class: '',
  options: ['.jpg', '.png', '.pdf'],
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(50)"

},
{
  id: 15,
  topic: 'toolbox',
  name: 'Signature',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#DED8F8"/>
  <path d="M10.3251 16.5548C10.4098 16.3344 10.4522 16.2242 10.5076 16.1211C10.5567 16.0296 10.6134 15.9423 10.6771 15.8602C10.7489 15.7677 10.8324 15.6843 10.9993 15.5173L18.0023 8.51433C18.6881 7.82856 19.7999 7.82856 20.4857 8.51433C21.1714 9.2001 21.1714 10.3119 20.4857 10.9977L13.4827 18.0007C13.3157 18.1676 13.2323 18.2511 13.1398 18.3228C13.0577 18.3866 12.9704 18.4433 12.8789 18.4924C12.7758 18.5478 12.6656 18.5901 12.4452 18.6749L9 20L10.3251 16.5548Z" fill="#DED8F8"/>
  <path d="M10.2778 16.6778C10.3692 16.4401 10.4149 16.3212 10.4933 16.2668C10.5619 16.2192 10.6467 16.2012 10.7286 16.2168C10.8224 16.2348 10.9124 16.3248 11.0926 16.5049L12.4951 17.9075C12.6752 18.0876 12.7653 18.1776 12.7832 18.2714C12.7988 18.3533 12.7808 18.4381 12.7332 18.5067C12.6788 18.5851 12.5599 18.6308 12.3222 18.7222L9 20L10.2778 16.6778Z" fill="#DED8F8"/>
  <path d="M20.4857 19.6896H15.5189M9 20L12.4452 18.6749C12.6656 18.5901 12.7758 18.5478 12.8789 18.4924C12.9704 18.4433 13.0577 18.3866 13.1398 18.3228C13.2323 18.2511 13.3157 18.1676 13.4827 18.0007L20.4857 10.9977C21.1714 10.3119 21.1714 9.2001 20.4857 8.51433C19.7999 7.82856 18.6881 7.82856 18.0023 8.51433L10.9993 15.5173C10.8324 15.6843 10.7489 15.7677 10.6771 15.8602C10.6134 15.9423 10.5567 16.0296 10.5076 16.1211C10.4522 16.2242 10.4098 16.3344 10.3251 16.5548L9 20ZM9 20L10.2778 16.6778C10.3692 16.4401 10.4149 16.3212 10.4933 16.2668C10.5619 16.2192 10.6467 16.2012 10.7286 16.2168C10.8224 16.2348 10.9124 16.3248 11.0926 16.5049L12.4951 17.9075C12.6752 18.0876 12.7653 18.1776 12.7832 18.2714C12.7988 18.3533 12.7808 18.4381 12.7332 18.5067C12.6788 18.5851 12.5599 18.6308 12.3222 18.7222L9 20Z" stroke="#6F87BF" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  width: '12',
  class: '',

},
{
  id: 16,
  topic: 'template',
  name: 'Paragraph',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#C4F8F1"/>
  <path d="M23 12.875H16.3333M23 9.625H16.3333M23 16.125H16.3333M23 19.375H16.3333M10.5 21L10.5 8M10.5 21L8 18.5625M10.5 21L13 18.5625M10.5 8L8 10.4375M10.5 8L13 10.4375" stroke="#219688" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  textColor: "initial",
  fontSize: 14,
  backgroundColor: "initial",
  textAlign: "left",
  padding: 0,
  width: '12',
  text: "Edit paragraph here as your wish.",
  borderRadius: 0,
  hidden: false,
  class: '',
  color1: '',
  color2: '',
  colorPosition: 'to right'
},
// {
//   id: 17,
//   topic: 'toolbox',
//   name: 'Basic Operator',
//   img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
//   <rect width="29.1915" height="28" rx="14" fill="#DDD6FE"/>
//   <path d="M19.7192 13.8311L15.1242 18.4261C14.5612 18.989 13.7978 19.3053 13.0017 19.3053C12.2056 19.3053 11.4421 18.989 10.8792 18.4261C10.3162 17.8632 10 17.0997 10 16.3036C10 15.5075 10.3162 14.744 10.8792 14.1811L15.4742 9.58611C15.8494 9.21083 16.3584 9 16.8892 9C17.4199 9 17.9289 9.21083 18.3042 9.58611C18.6795 9.96139 18.8903 10.4704 18.8903 11.0011C18.8903 11.5318 18.6795 12.0408 18.3042 12.4161L13.7042 17.0111C13.5165 17.1988 13.262 17.3042 12.9967 17.3042C12.7313 17.3042 12.4768 17.1988 12.2892 17.0111C12.1015 16.8235 11.9961 16.569 11.9961 16.3036C11.9961 16.0382 12.1015 15.7838 12.2892 15.5961L16.5342 11.3561" stroke="#9882FF" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>`,
//   width: '12',
//   inputName: 'inputName',
//   containerCssClass: '',
//   helpText: '',
//   borderRadius: 0,
//   labelTextColor: 'initial',
//   labelTextName: 'Label Name',
//   labelPosition: "Top",
//   labelFontSize: 14,
//   class: '',
//   options: ['+', '-', '/'],
//   required: false,
//   readOnly: false,
//   disabled: false,
//   hidden: false,
//   fieldstype: "VARCHAR(50)"

// },
{
  id: 18,
  topic: 'toolbox',
  name: 'Link',
  img: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 30 28" fill="none">
  <rect width="29.1915" height="28" rx="14" fill="#ECF1FD"/>
  <path d="M12.9 8.05V7M10.1425 9.14246L9.4 8.4M10.1425 14.7L9.4 15.4425M15.7 9.14246L16.4425 8.4M9.05 11.9H8M12.55 11.55L15.4278 20.4944L17.45 18.4722L19.9778 21L22 18.9778L19.4722 16.45L21.4944 14.4278L12.55 11.55Z" stroke="#6F87BF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  width: '12',
  containerCssClass: '',
  borderRadius: 0,
  class: '',
  hidden: false,
  textColor: "",
  fontSize: 22,
  backgroundColor: "initial",
  text: "Link",
  textAlign: "left",
  padding: 0,
  link: ""
},
{
  id: 19,
  topic: 'toolbox',
  name: 'Matrix',
  img: ``,
  width: '12',
  inputName: 'inputName',
  helpText: '',
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelFontSize: 14,
  class: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(MAX)",
  options: ['Staff Name', 'Phone Number', 'Id Number'],
},
{
  id: 20,
  topic: 'toolbox',
  name: 'Basic Operator',
  img: ``,
  width: '12',
  inputName: 'inputName',
  helpText: '',
  labelTextColor: 'initial',
  labelTextName: 'Label Name',
  labelFontSize: 14,
  class: '',
  textColor: 'initial',
  required: false,
  readOnly: false,
  disabled: false,
  hidden: false,
  fieldstype: "VARCHAR(MAX)",
  options: ['Credit Number', 'Interest', 'Total'],
  operatorValues: ["+", "-", "*", "/"],
  selectedOperatorValues: ["+", "+", "+"]
}
]

export default inputTabbar;