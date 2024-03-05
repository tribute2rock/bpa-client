import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { EditSubForm } from './EditSubForm';
import SubFormList from './SubFormList';
export default function SubFormsPage() {
  return (
    <>
      <Route path="/sub-form" exact component={SubFormList} />
      <Route path="/sub-form/edit" exact component={EditSubForm} />
    </>
  );
}
