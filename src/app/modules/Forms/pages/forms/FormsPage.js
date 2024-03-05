import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { EditForm } from './EditForm';
import { FormsList } from './FormsList';

export function FormsPage() {
  return (
    <>
      <Route path="/forms" exact component={FormsList} />
      <Route path="/forms/edit" exact component={EditForm} />
    </>
  );
}
