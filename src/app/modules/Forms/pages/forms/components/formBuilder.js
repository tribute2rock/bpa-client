import React, { useState } from 'react';
import { ReactFormBuilder } from 'dynamic-formbuilder-react';
import autoPopulateItems from './autoPopulateItems';
import availableValidationRules from './validationRules';
import toolbarItems from './toolbarItems';

const FormBuilder2 = props => {
  return (
    <>
      <ReactFormBuilder
        onLoad={props.onLoad}
        onPost={props.onPost}
        autoPopulateItems={autoPopulateItems}
        availableValidationRules={availableValidationRules}
      />
    </>
  );
};

export default FormBuilder2;
