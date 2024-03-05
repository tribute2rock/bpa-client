import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { LayoutSplashScreen } from '../../../../_metronic/layout';
// import { FormsPage } from './forms/FormsPage';
import { ControlledRoute } from '../../../components/ControlledRoute';
import permissions from '../../../../values/permission';
import { FormsList } from './forms/FormsList';
import { EditForm } from './forms/EditForm';
import AddForm from './forms/AddForm';

export default function formPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/forms" exact permission={permissions.ViewAllForms} component={FormsList} />
        <ControlledRoute path="/forms/new" permission={permissions.CreateForm} exact component={AddForm} />
        <ControlledRoute path="/forms/edit" permission={permissions.UpdateForm} exact component={EditForm} />
      </Switch>
    </Suspense>
  );
}
